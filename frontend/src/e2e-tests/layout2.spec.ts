import { test, expect } from '@playwright/test';

test.describe('footer visibility on scroll', () => {
  test('with full navigation', async ({ page }) => {
    await page.goto('/test/blank?fullNav=true');
    const footer = page.locator('footer');
    await expect(footer).not.toBeInViewport();
    await page.evaluate(() => window.scrollBy(0, 1));
    await expect(footer).toBeInViewport({ timeout: 100 });
  });

  test('without full navigation', async ({ page }) => {
    await page.goto('/test/blank?fullNav=false');
    const footer = page.locator('footer');
    await expect(footer).not.toBeInViewport();
    await page.evaluate(() => window.scrollBy(0, 1));
    await expect(footer).not.toBeInViewport();
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await expect(footer).toBeInViewport({ timeout: 100 });
  });
});
