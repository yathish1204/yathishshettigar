import { test, expect } from '@playwright/test';

test.describe('Projects & Case Studies', () => {
  test('should render projects listing page', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.locator('h2')).toContainText('Featured Projects');
    const projectCards = page.locator('article');
    await expect(projectCards.first()).toBeVisible();
  });

  test('should load valid project detail page by slug', async ({ page }) => {
    await page.goto('/projects/us-fex');
    await expect(page.locator('h1')).toContainText('US-FEX');
    await expect(page.getByText('Lead UX Engineer')).toBeVisible();
  });

  test('should return 404 for non-existent project slug', async ({ page }) => {
    const response = await page.goto('/projects/non-existent-slug-xyz');
    expect(response?.status()).toBe(404);
    await expect(page.getByText('Page Not Found')).toBeVisible();
  });
});
