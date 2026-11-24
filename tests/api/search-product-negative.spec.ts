// import { test, expect } from '@playwright/test';
import { test, expect } from '../fixtures/baseTest';

test('Verify product search API without search parameter', async ({ request }) => {
  const response = await request.post(
    'https://automationexercise.com/api/searchProduct'
  );

  console.log('HTTP Status:', response.status());

  // The API may return HTTP 200 with an application-level error.
  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log('Application Response Code:', responseBody.responseCode);
  console.log('Error Message:', responseBody.message);
  // expect(responseBody.responseCode).toBe(999);
  expect(responseBody.responseCode).toBe(400);
  expect(responseBody.message).toContain('search_product parameter is missing');

  console.log('Negative API test executed successfully');
});