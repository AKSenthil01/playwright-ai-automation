
import { test as base, expect } from '@playwright/test';
import { AIAnalyzer } from '../../utils/AIAnalyzer';

export const test = base.extend<{
  aiFailureAnalysis: void;
}>({

  // Block known advertising network requests.
  page: async ({ page }, use) => {

    await page.route(
      /^https?:\/\/([^/]+\.)?(googlesyndication\.com|doubleclick\.net|googletagservices\.com)(\/|$)/,
      route => route.abort()
    );

    await use(page);
  },

  // Automatically analyze unexpected test failures.
  aiFailureAnalysis: [
    async ({}, use, testInfo) => {

      await use();

      if (testInfo.status !== testInfo.expectedStatus) {

        // Do not invoke local Ollama inside GitHub Actions.
        if (process.env.CI) {
          console.log(
            'Skipping local Ollama failure analysis in CI environment.'
          );
          return;
        }

        const errorMessage =
          testInfo.error?.message ?? 'No error details available';

        console.log('\nGenerating AI failure analysis...');

        const analysis = await AIAnalyzer.analyzeFailure(
          testInfo.title,
          errorMessage
        );

        await testInfo.attach('AI Failure Analysis', {
          body: Buffer.from(analysis, 'utf-8'),
          contentType: 'text/plain'
        });

        console.log('AI failure analysis attached to test report.');
      }
    },
    { auto: true }
  ]

});

export { expect };
