import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully and display hero section', async ({ page }) => {
    await page.goto('/');

    // Check main title & branding
    await expect(page.locator('h1')).toContainText('Yathish Shettigar');
    await expect(page.getByText('Senior UX Engineer')).toBeVisible();

    // Check primary CTAs
    const workButton = page.getByRole('link', { name: 'View Selected Work' });
    await expect(workButton).toBeVisible();

    const contactButton = page.getByRole('link', { name: "Let's Talk" }).first();
    await expect(contactButton).toBeVisible();
  });

  test('should navigate to projects section when clicking Work CTA', async ({ page }) => {
    await page.goto('/');
    const workLink = page.getByRole('link', { name: 'View Selected Work' });
    await workLink.click();
    await expect(page.locator('#projects')).toBeVisible();
  });

  test('should navigate via desktop navbar links', async ({ page }) => {
    await page.goto('/');
    const projectsNav = page.getByRole('link', { name: 'Work', exact: true }).first();
    await projectsNav.click();
    await expect(page).toHaveURL(/\/projects/);
  });
});
