
import { test, expect } from '../fixtures/baseTest';
import { ProductsPage } from '../../pages/ProductsPage';

test('Verify product search functionality', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  // Navigate to application
  await page.goto('/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // Navigate to products page
  await productsPage.navigateToProducts();

  // Wait until the inline search JavaScript is registered
  await page.waitForFunction(() => {
    const button = document.querySelector('#submit_search');
    const w = window as any;

    if (!button || !w.jQuery) {
      return false;
    }

    const events = w.jQuery._data(button, 'events');

    return events?.click?.length > 0;
  }, null, { timeout: 15000 });

  // Enter product name and search
  await productsPage.searchProduct('top');

  // Verify search results
  await expect(page).toHaveURL(/\/products\?search=top/);
  await expect(productsPage.searchedProductsHeading).toBeVisible();

  console.log('Product search completed successfully');
});
