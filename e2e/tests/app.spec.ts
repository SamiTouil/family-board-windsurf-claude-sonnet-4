import { test, expect } from '@playwright/test';

test.describe('Family Board App', () => {
  test('should display the app title', async ({ page }) => {
    await page.goto('/');
    
    // Check if the app title is displayed
    await expect(page.locator('h1')).toContainText('Family Board');
    
    // Check if the welcome message is displayed
    await expect(page.locator('h2')).toContainText('Welcome to Family Board');
    
    // Check if the app description is displayed
    await expect(page.locator('p')).toContainText('Family Task Planner');
  });

  test('should have correct page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Family Board');
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');
    
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('main .container').first()).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('main .container').first()).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });
});
