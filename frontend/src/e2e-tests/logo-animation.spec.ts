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

async function scrollFullScreen(page: Page): Promise<void> {
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
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
    const screenHeight = await page.evaluate(() => window.innerHeight);
    await expectScrollPosition(page, screenHeight);
    const logo = await getLogo(page);
    await expect(logo).toBeVisible();

    await scrollMinimal(page);
    await expectFooterVisible(page);
  });

  test('startBig mode - logo centered at start, footer appears after full screen scroll', async ({ page }) => {
    await navigateToTestPage(page, AnimationMode.StartBig);
    await scrollToTop(page);

    await expectFooterNotVisible(page);
    await expectScrollPosition(page, 0);
    const logo = await getLogo(page);
    await expect(logo).toBeVisible();
    await expectLogoCentered(page);

    await scrollMinimal(page);
    await expectFooterNotVisible(page);
    await scrollFullScreen(page);
    await expectFooterVisible(page);
  });

  test('logo animation from top-left to center-big and back', async ({ page }) => {
    // Get initial position
    await page.goto('/test/blank');
    const logo = await getLogo(page);
    await expect(logo).toBeVisible();
    const initialBox = await logo.boundingBox();
    expect(initialBox).not.toBeNull();

    // Navigate to startBig mode
    await page.evaluate(() => {
      (window as any).next.router.push('/test/blank?animationMode=startBig');
    });
    await waitForPageLoad(page);

    // Verify centered and larger
    const centerBox = await logo.boundingBox();
    expect(centerBox).not.toBeNull();
    expect(centerBox!.width).toBeGreaterThan(initialBox!.width);
    expect(centerBox!.height).toBeGreaterThan(initialBox!.height);
    await expectLogoCentered(page);

    // Scroll and verify return to original position
    await scrollFullScreen(page);
    await waitForPageLoad(page);

    const finalBox = await logo.boundingBox();
    expect(finalBox).toEqual(initialBox);
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
});
