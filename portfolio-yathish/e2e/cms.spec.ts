import { test, expect } from '@playwright/test';

test.describe('End-to-End CMS Admin & Publishing Flow', () => {
  const testSlug = `e2e-cms-test-project-${Date.now()}`;
  const testTitle = 'E2E Fullstack Integration Case Study';

  test('Complete Admin CMS workflow: Login -> Draft -> Preview -> Publish -> Archive -> Delete', async ({ page }) => {
    // 1. Login
    await page.goto('/admin/login');
    await page.fill('#admin-username', 'admin');
    await page.fill('#admin-password', 'admin123');
    await page.getByRole('button', { name: 'Sign In to Admin' }).click();

    // Verify redirected to /admin
    await expect(page).toHaveURL(/\/admin/);
    await expect(page.locator('h1')).toContainText('CMS Management Dashboard');

    // 2. Open Project Creation Form
    await page.goto('/admin/projects/new');
    await expect(page.locator('h1')).toContainText('Create New Project');

    // 3. Fill Out Project Form
    await page.fill('input[name="title"]', testTitle);
    await page.fill('input[name="slug"]', testSlug);
    await page.fill('textarea[name="shortDescription"]', 'Short description for end-to-end CMS integration test.');
    await page.fill('textarea[name="description"]', 'Detailed description for testing draft, preview, publish, and revalidation workflows.');
    await page.fill('input[name="role"]', 'Senior Fullstack Engineer');

    // 4. Save as Draft
    await page.getByRole('button', { name: 'Save Draft' }).click();
    await expect(page).toHaveURL(/\/admin\/projects/);
    await expect(page.getByText(testTitle)).toBeVisible();

    // 5. Verify Draft project is NOT visible on public pages
    const publicProjRes = await page.goto(`/projects/${testSlug}`);
    expect(publicProjRes?.status()).toBe(404);

    // 6. Navigate to Admin Edit & Publish Project
    await page.goto('/admin/projects');
    const editLink = page.locator('tr', { hasText: testTitle }).getByRole('link', { name: 'Edit' });
    await editLink.click();

    await expect(page.locator('h1')).toContainText('Edit Project');

    // 7. Publish Project
    await page.getByRole('button', { name: 'Publish Updates' }).click();
    await expect(page.getByRole('alert')).toContainText('Project updated successfully!');

    // 8. Verify Project is now visible publicly
    await page.goto('/projects');
    await expect(page.getByText(testTitle)).toBeVisible();

    await page.goto(`/projects/${testSlug}`);
    await expect(page.locator('h1')).toContainText(testTitle);

    // 9. Cleanup: Archive & Delete Project
    await page.goto('/admin/projects');
    const deleteBtn = page.locator('tr', { hasText: testTitle }).getByRole('button', { name: 'Delete' });

    page.on('dialog', (dialog) => dialog.accept());
    await deleteBtn.click();
  });
});
