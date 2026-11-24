import { APIRequestContext } from '@playwright/test';

export class ProductApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getProducts() {
    return await this.request.get(
      'https://automationexercise.com/api/productsList'
    );
  }

  async getBrands() {
    return await this.request.get(
      'https://automationexercise.com/api/brandsList'
    );
  }

  async searchProducts(productName: string) {
    return await this.request.post(
      'https://automationexercise.com/api/searchProduct',
      {
        form: {
          search_product: productName
        }
      }
    );
  }
}