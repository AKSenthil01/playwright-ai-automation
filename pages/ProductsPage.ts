
import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productsLink: Locator;
  readonly allProductsHeading: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;
  readonly firstViewProductLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.allProductsHeading = page.getByRole('heading', {
      name: 'All Products'
    });
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeading = page.getByRole('heading', {
      name: 'Searched Products'
    });
    this.firstViewProductLink = page.locator('a[href*="product_details"]').first();
  }

  async navigateToProducts(): Promise<void> {
    await this.productsLink.click();
  }

  async isAllProductsHeadingVisible(): Promise<boolean> {
    return await this.allProductsHeading.isVisible();
  }

  async openFirstProduct(): Promise<void> {
  await this.firstViewProductLink.scrollIntoViewIfNeeded();

  await this.firstViewProductLink.click({
    timeout: 15000
  });
}
  async searchProduct(productName: string): Promise<void> {
  await this.searchInput.waitFor({ state: 'visible' });
  await this.searchInput.fill(productName);
  await this.searchButton.click();
}
}
