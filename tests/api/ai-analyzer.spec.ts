import { test, expect } from '@playwright/test';
import { AIAnalyzer } from '../../utils/AIAnalyzer';

test('Verify AI analyzes Playwright test failure', async () => {
    test.setTimeout(90000);
  const testName = 'Verify product search functionality';

  const errorMessage = `
TimeoutError: locator.fill: Test timeout of 30000ms exceeded.

Call log:
- waiting for locator('#search_product')
- element was not available for interaction.
`;

  console.log('\nSending failure details to local Ollama...');

  const analysis = await AIAnalyzer.analyzeFailure(
    testName,
    errorMessage
  );

  console.log('\n========== AI FAILURE ANALYSIS ==========\n');
  console.log(analysis);
  console.log('\n=========================================\n');

  expect(analysis.length).toBeGreaterThan(0);
  expect(analysis).not.toContain('AI analysis could not be completed');
});