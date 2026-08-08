import { test, expect } from '@playwright/test';

test.describe('Responsive Viewports', () => {
  test('mobile viewport 375px should render clean layout without overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    await expect(page.locator('h1')).toBeVisible();

    // Verify mobile hamburger menu exists
    const menuButton = page.getByRole('button', { name: 'Toggle navigation menu' });
    await expect(menuButton).toBeVisible();

    // Check no horizontal scroll overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });
});
