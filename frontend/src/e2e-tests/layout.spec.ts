import { test, expect } from '@playwright/test';

test('footer visibility on scroll', async ({ page }) => {
  await page.goto('/test-layout');
  const footer = page.locator('footer');
  await expect(footer).not.toBeInViewport();
  await page.evaluate(() => window.scrollBy(0, 1));
  await expect(footer).toBeInViewport({ timeout: 100 });
});
