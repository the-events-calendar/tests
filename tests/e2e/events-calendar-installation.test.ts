/**
 * The Events Calendar Installation Test
 * 
 * This test verifies that The Events Calendar plugin can be installed,
 * activated, and basic functionality works as expected.
 * 
 * @since TBD
 */

import { test, expect } from '@playwright/test';

test.describe('The Events Calendar - Installation & Basic Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to WordPress admin
    await page.goto('/wp-admin/');
    
    // Login as admin
    await page.fill('#user_login', 'admin');
    await page.fill('#user_pass', 'admin123');
    await page.click('#wp-submit');
    
    // Wait for admin dashboard to load
    await expect(page.locator('#adminmenumain')).toBeVisible();
  });

  test('should have The Events Calendar plugin installed and activated', async ({ page }) => {
    // Navigate to plugins page
    await page.goto('/wp-admin/plugins.php');
    
    // Check if The Events Calendar is listed
    const tecPluginRow = page.locator('tr[data-slug="the-events-calendar"]');
    await expect(tecPluginRow).toBeVisible();
    
    // Check if plugin is active
    const activeText = tecPluginRow.locator('.plugin-title strong');
    await expect(activeText).toContainText('The Events Calendar');
    
    // Verify plugin is active (should not have "Activate" link)
    const activateLink = tecPluginRow.locator('a[href*="action=activate"]');
    await expect(activateLink).not.toBeVisible();
  });

  test('should display Events menu in admin', async ({ page }) => {
    // Check if Events menu item exists in admin menu
    const eventsMenuItem = page.locator('#adminmenu a[href*="edit.php?post_type=tribe_events"]');
    await expect(eventsMenuItem).toBeVisible();
    await expect(eventsMenuItem).toContainText('Events');
  });

  test('should be able to create a new event', async ({ page }) => {
    // Navigate to Add New Event page
    await page.goto('/wp-admin/post-new.php?post_type=tribe_events');
    
    // Wait for the page to load
    await expect(page.locator('#title')).toBeVisible();
    
    // Fill in event details
    const eventTitle = `Test Event ${Date.now()}`;
    await page.fill('#title', eventTitle);
    
    // Fill in event content
    await page.click('#content-html'); // Switch to HTML tab
    await page.fill('#content', 'This is a test event created by our automated test.');
    
    // Set event date (using tribe-events date picker)
    const eventDateField = page.locator('#tribe-events-date-start');
    if (await eventDateField.isVisible()) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD format
      await eventDateField.fill(tomorrowStr);
    }
    
    // Publish the event
    await page.click('#publish');
    
    // Wait for success message
    await expect(page.locator('#message')).toContainText('Event published');
    
    // Verify the event was created
    await expect(page.locator('#title')).toHaveValue(eventTitle);
  });

  test('should display events calendar on frontend', async ({ page }) => {
    // Navigate to events page on frontend
    await page.goto('/events/');
    
    // Check if events calendar is displayed
    await expect(page.locator('.tribe-events-calendar')).toBeVisible();
    
    // Check for calendar navigation
    const calendarNav = page.locator('.tribe-events-calendar-nav');
    await expect(calendarNav).toBeVisible();
    
    // Check for month view by default
    const monthView = page.locator('.tribe-events-calendar-month');
    await expect(monthView).toBeVisible();
  });

  test('should display events list view', async ({ page }) => {
    // Navigate to events list view
    await page.goto('/events/list/');
    
    // Check if events list container is displayed
    await expect(page.locator('.tribe-events-list')).toBeVisible();
    
    // Check for list view navigation
    const listNav = page.locator('.tribe-events-nav-pagination');
    await expect(listNav).toBeVisible();
  });

  test('should have working event search functionality', async ({ page }) => {
    // Navigate to events page
    await page.goto('/events/');
    
    // Look for search form
    const searchForm = page.locator('.tribe-events-search');
    if (await searchForm.isVisible()) {
      const searchInput = searchForm.locator('input[type="text"]');
      await expect(searchInput).toBeVisible();
      
      // Try searching for a term
      await searchInput.fill('test');
      await searchForm.locator('input[type="submit"]').click();
      
      // Verify search results page loads
      await expect(page.url()).toContain('events');
      await expect(page.locator('.tribe-events-calendar, .tribe-events-list')).toBeVisible();
    }
  });

  test('should have proper plugin settings page', async ({ page }) => {
    // Navigate to Events settings
    await page.goto('/wp-admin/edit.php?post_type=tribe_events&page=tribe-common');
    
    // Check if settings page loads
    await expect(page.locator('.tribe-settings-form')).toBeVisible();
    
    // Check for general settings tab
    const generalTab = page.locator('.tribe-settings-tab-general');
    await expect(generalTab).toBeVisible();
  });
}); 