import { test, expect, Page, Locator, devices } from '@playwright/test';

enum AnimationMode {
  StartBig = "startBig",
  StartSmall = "startSmall",
  DontAnimate = "dontAnimate",
}

// Helper functions
async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForTimeout(500);
}

async function navigateToTestPage(page: Page, mode: AnimationMode): Promise<void> {
  await page.goto(`/test/blank?animationMode=${mode}`);
  await waitForPageLoad(page);
}

async function getFooter(page: Page): Promise<Locator> {
  return page.locator('footer');
}

async function getLogo(page: Page): Promise<Locator> {
  return page.locator('img[alt="Living the Forest Lab"]');
}

async function expectFooterNotVisible(page: Page): Promise<void> {
  const footer = await getFooter(page);
  await expect(footer).not.toBeInViewport();
}

async function expectFooterVisible(page: Page): Promise<void> {
  const footer = await getFooter(page);
  await expect(footer).toBeInViewport({ timeout: 100 });
}

async function scrollMinimal(page: Page): Promise<void> {
  await page.evaluate(() => window.scrollBy(0, 1));
}

async function scrollToTop(page: Page): Promise<void> {
  await page.evaluate(() => window.scrollTo(0, 0));
  await waitForPageLoad(page);
}

async function expectLogoCentered(page: Page): Promise<void> {
  const logo = await getLogo(page);
  const logoBox = await logo.boundingBox();
  const viewport = page.viewportSize();

  const centerX = viewport!.width / 2;
  const logoX = logoBox!.x + logoBox!.width / 2;
  expect(logoX).toEqual(centerX);

  const centerY = viewport!.height / 2;
  const logoY = logoBox!.y + logoBox!.height / 2;
  expect(logoY).toEqual(centerY);
}

async function expectScrollPosition(page: Page, expectedY: number): Promise<void> {
  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBe(expectedY);
}

async function getLogoDimensions(page: Page): Promise<{ width: number; height: number; x: number; y: number }> {
  const logo = await getLogo(page);
  const box = await logo.boundingBox();
  if (!box) throw new Error('Logo not found');
  return { width: box.width, height: box.height, x: box.x, y: box.y };
}


test.describe('logo animation mode tests', () => {
  test('dontAnimate mode - footer appears after minimal scroll', async ({ page }) => {
    await navigateToTestPage(page, AnimationMode.DontAnimate);

    await expectFooterNotVisible(page);
    await scrollMinimal(page);
    await expectFooterVisible(page);
  });

  test('startSmall mode - auto-scrolled with footer below', async ({ page }) => {
    await navigateToTestPage(page, AnimationMode.StartSmall);

    await expectFooterNotVisible(page);
    // Calculate expected scroll position based on new container height: 100vh - navbar - spacing-match-logo-scroll-offset
    const expectedScrollY = await page.evaluate(() => {
      const vh = window.innerHeight;
      const navbarHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--spacing-navbar')) * 16; // 5rem * 16px
      const spacingAB = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--spacing-match-logo-scroll-offset')) * 16; // 10rem * 16px
      return vh - navbarHeight - spacingAB;
    });
    await expectScrollPosition(page, expectedScrollY);
    const logo = await getLogo(page);
    await expect(logo).toBeVisible();

    await scrollMinimal(page);
    await expectFooterVisible(page);
  });

  test('startBig mode - logo centered at start, footer appears after reduced scroll', async ({ page }) => {
    await navigateToTestPage(page, AnimationMode.StartBig);
    await scrollToTop(page);

    await expectFooterNotVisible(page);
    await expectScrollPosition(page, 0);
    const logo = await getLogo(page);
    await expect(logo).toBeVisible();
    await expectLogoCentered(page);

    await scrollMinimal(page);
    await expectFooterNotVisible(page);
    
    // Scroll by the reduced container height (100vh - navbar - spacing-match-logo-scroll-offset)
    await page.evaluate(() => {
      const vh = window.innerHeight;
      const navbarHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--spacing-navbar')) * 16;
      const spacingAB = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--spacing-match-logo-scroll-offset')) * 16;
      const scrollDistance = vh - navbarHeight - spacingAB;
      window.scrollBy(0, scrollDistance);
    });
    await waitForPageLoad(page);
    await expectFooterVisible(page);
  });

  test('logo doesnt get big during client navigation, but after click/scroll', async ({ page }) => {
    // Start in dontAnimate mode to get stable initial state
    await navigateToTestPage(page, AnimationMode.DontAnimate);
    const logo = await getLogo(page);
    await expect(logo).toBeVisible();
    const initialBox = await logo.boundingBox();
    expect(initialBox).not.toBeNull();

    // Navigate to startSmall mode
    await page.evaluate(() => {
      (window as any).next.router.push('/test/blank?animationMode=startSmall');
    });
    await waitForPageLoad(page);

    // Verify centered and larger
    const centerBox = await logo.boundingBox();
    expect(centerBox).toEqual(initialBox);

    // Scroll to the top to make the logo big
    await scrollToTop(page);
    await waitForPageLoad(page);
    await waitForPageLoad(page);

    const finalBox = await logo.boundingBox();
    expect(finalBox).not.toBeNull();
    expect(finalBox!.width).toBeGreaterThan(initialBox!.width);
    expect(finalBox!.height).toBeGreaterThan(initialBox!.height);
    await expectLogoCentered(page);
  });

  test('logo stays stable when mobile address bar hides/shows', async ({ browser }) => {
    const page = await browser.newPage(devices['iPhone SE']);

    await navigateToTestPage(page, AnimationMode.StartBig);
    const initialDimensions = await getLogoDimensions(page);

    // Simulate address bar hiding (increases viewport height)
    await page.evaluate(() => {
      Object.defineProperty(window, 'innerHeight', {
        value: window.innerHeight + 60,
        configurable: true
      });
      window.dispatchEvent(new Event('resize'));
    });

    await page.waitForTimeout(500);
    const hiddenDimensions = await getLogoDimensions(page);
    expect(hiddenDimensions).toEqual(initialDimensions);

    // Simulate address bar showing (restore original height)
    await page.evaluate(() => {
      Object.defineProperty(window, 'innerHeight', {
        value: window.innerHeight - 60,
        configurable: true
      });
      window.dispatchEvent(new Event('resize'));
    });

    await page.waitForTimeout(500);
    const finalDimensions = await getLogoDimensions(page);
    expect(finalDimensions).toEqual(initialDimensions);
  });

  test('logo navigation from non-root routes', async ({ page }) => {
    // Start on a non-root route (uses DontAnimate mode)
    await page.goto('/people');
    await waitForPageLoad(page);

    const logo = await getLogo(page);
    await expect(logo).toBeVisible();

    // Click logo to navigate back to root
    await logo.click();
    await waitForPageLoad(page);

    // Verify we're on the root route
    expect(page.url()).toMatch(/\/$|\/$/);
  });

  test('logo three-step click behavior on root page', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const logo = await getLogo(page);
    await expect(logo).toBeVisible();

    // Step 1: Start with big logo, scroll down to make it small
    const containerHeight = await page.evaluate(() => {
      const vh = window.innerHeight;
      const navbarHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--spacing-navbar')) * 16;
      const spacingAB = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--spacing-match-logo-scroll-offset')) * 16;
      return vh - navbarHeight - spacingAB;
    });
    
    // Scroll past the description (beyond containerHeight)
    await page.evaluate((height) => {
      window.scrollTo({ top: height + 100 });
    }, containerHeight);
    await waitForPageLoad(page);

    // Step 2: Click logo - should scroll to edge (show description, logo still small)
    await logo.click();
    await waitForPageLoad(page);
    
    let scrollY = await page.evaluate(() => window.scrollY);
    expect(Math.abs(scrollY - containerHeight)).toBeLessThan(10);

    // Step 3: Click logo again - should scroll to top (logo becomes big)
    await logo.click();
    await waitForPageLoad(page);
    
    scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });
});
