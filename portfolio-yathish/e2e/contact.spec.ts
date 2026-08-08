import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should display validation errors when submitting empty form', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText('Name must be at least 2 characters')).toBeVisible();
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  });

  test('should fill out and submit form successfully', async ({ page }) => {
    await page.goto('/contact');

    await page.fill('#name', 'Test Recruiter');
    await page.fill('#email', 'recruiter@example.com');
    await page.fill('#subject', 'Senior UX Engineer Role');
    await page.fill('#message', 'Hello Yathish, we would love to discuss a opportunity with our product team.');

    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect(page.getByRole('alert')).toContainText('Thank you!');
  });
});
