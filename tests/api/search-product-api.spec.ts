import { test, expect } from '@playwright/test';
import { ProductApi } from '../../api/ProductApi';

test('Verify product search API', async ({ request }) => {
  const productApi = new ProductApi(request);

  const response = await productApi.searchProducts('top');

  console.log('HTTP Status:', response.status());

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.responseCode).toBe(200);
  expect(responseBody.products).toBeDefined();
  expect(responseBody.products.length).toBeGreaterThan(0);

  console.log('Matching products:', responseBody.products.length);
  console.log('Product search API executed successfully');
});