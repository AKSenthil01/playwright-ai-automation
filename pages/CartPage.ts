import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTable = page.locator('#cart_info');
  }

  async navigateToCart(): Promise<void> {
    await this.page.goto('/view_cart');
  }
}