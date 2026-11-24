
import { test, expect } from '../fixtures/baseTest';
import { HomePage } from '../../pages/HomePage';

test('Verify Automation Exercise home page', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigateToHomePage();

  await expect(page).toHaveTitle('Automation Exercise');
  await expect(homePage.homeLink).toBeVisible();

  console.log('Page Title:', await homePage.getPageTitle());
  console.log('Home page loaded successfully');
});
