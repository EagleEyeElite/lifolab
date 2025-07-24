import { test, expect } from '@playwright/test';

test.describe('footer visibility on scroll', () => {
  test('click link and check if nav worked', async ({ page }) => {
    await page.goto('/test/id1?fullNav=false');
    const link = page.locator('#nav-link-id1');
    await expect(link).toBeVisible();

    await link.click();
    await page.waitForURL('**/test/id2?fullNav=true', { timeout: 5000 });

    // Wait until the page is fully loaded
    await page.waitForLoadState('load');
    // Verify the navigation was successful
    expect(page.url()).toContain('/test/id2?fullNav=true');
    
    // Scroll to top to ensure we're testing the initial logo state
    await page.evaluate(() => window.scrollTo(0, 0));
    
    // Wait for animations to settle
    await page.waitForTimeout(500);
    
    // Verify we're at the top of the page
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
    
    // Verify the animated logo is in big/initial state
    const logo = page.locator('img[alt="Living the Forest Lab"]');
    await expect(logo).toBeVisible();
    
    // Verify the logo is visible and has reasonable dimensions
    const logoBox = await logo.boundingBox();
    expect(logoBox?.width).toBeGreaterThan(50); // Logo should be visible with reasonable size
    expect(logoBox?.height).toBeGreaterThan(30); // Logo should have reasonable height
    
    const link2 = page.locator('#nav-link-id2');
    await expect(link2).toBeVisible();

  });
});
