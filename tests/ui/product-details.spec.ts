
import { test, expect } from '../fixtures/baseTest';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';

test('Verify product details page', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const productDetailsPage = new ProductDetailsPage(page);

  // Navigate to application
  await page.goto('/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // Navigate to products page
  await productsPage.navigateToProducts();

  // Open first product
  await productsPage.openFirstProduct();

  // Verify product details page
  await expect(page).toHaveURL(/product_details/);
  await expect(productDetailsPage.productInformation).toBeVisible();
  await expect(productDetailsPage.productName).toBeVisible();

  console.log(
    'Product Name:',
    await productDetailsPage.productName.textContent()
  );

  console.log('Product details page loaded successfully');
});
