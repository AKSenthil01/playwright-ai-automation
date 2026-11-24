import { test, expect } from '@playwright/test';
import { ProductApi } from '../../api/ProductApi';

test('Verify products list API', async ({ request }) => {
  const productApi = new ProductApi(request);

  const response = await productApi.getProducts();

  console.log('HTTP Status:', response.status());

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.responseCode).toBe(200);
  expect(responseBody.products).toBeDefined();
  expect(responseBody.products.length).toBeGreaterThan(0);

  console.log('Total products:', responseBody.products.length);
  console.log('Products API executed successfully');
});