
import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly homeLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: 'Home' });
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto('/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async isHomeLinkVisible(): Promise<boolean> {
    return await this.homeLink.isVisible();
  }
}
