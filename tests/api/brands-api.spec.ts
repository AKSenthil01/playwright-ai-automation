import { test, expect } from '@playwright/test';
import { ProductApi } from '../../api/ProductApi';

test('Verify brands list API', async ({ request }) => {
  const productApi = new ProductApi(request);

  const response = await productApi.getBrands();

  console.log('HTTP Status:', response.status());

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.responseCode).toBe(200);
  expect(responseBody.brands).toBeDefined();
  expect(responseBody.brands.length).toBeGreaterThan(0);

  console.log('Total brands:', responseBody.brands.length);
  console.log('Brands API executed successfully');
});