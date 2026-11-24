
import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly productInformation: Locator;
  readonly productName: Locator;
  readonly addToCartButton: Locator;
  readonly quantityInput: Locator;
  readonly cartModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productInformation = page.locator('.product-information');
    this.productName = this.productInformation.locator('h2');
    this.addToCartButton = page.getByRole('button', {
      name: 'Add to cart'
    });
    this.quantityInput = page.locator('#quantity');
    this.cartModal = page.locator('#cartModal');
  }

  async addProductToCart(): Promise<void> {
  await this.addToCartButton.click();
}
}
