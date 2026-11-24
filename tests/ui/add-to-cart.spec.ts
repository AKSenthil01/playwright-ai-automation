
import { test, expect } from '../fixtures/baseTest';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';
import { CartPage } from '../../pages/CartPage';

test('Verify product can be added to cart', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const productDetailsPage = new ProductDetailsPage(page);
  const cartPage = new CartPage(page);

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
  await expect(productDetailsPage.productName).toBeVisible();

  // Wait until jQuery is available
  await page.waitForFunction(
    () => typeof (window as any).jQuery === 'function',
    null,
    { timeout: 15000 }
  );

  // Wait until Add to Cart click handler is registered
  await page.waitForFunction(() => {
    const w = window as any;
    const button = document.querySelector('.cart');

    if (!w.jQuery || !button) {
      return false;
    }

    const events = w.jQuery._data(button, 'events');

    return events?.click?.length > 0;
  }, null, { timeout: 15000 });

  // Add product to cart
  await productDetailsPage.addProductToCart();

  // Wait for AJAX success confirmation
  await expect(page.locator('#cartModal')).toBeVisible({
    timeout: 15000
  });

  // Navigate to cart only after successful addition
  await cartPage.navigateToCart();

  // Verify product is available in cart
  await expect(cartPage.cartTable).toBeVisible();
  await expect(cartPage.cartTable).toContainText('Blue Top');

  console.log('Product successfully added to cart.');
});
