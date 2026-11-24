
import { test, expect } from '../fixtures/baseTest';
import { ProductsPage } from '../../pages/ProductsPage';

test('Verify products listing page', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await page.goto('/products', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(productsPage.allProductsHeading).toBeVisible();

  console.log('Products listing page loaded successfully');
});
