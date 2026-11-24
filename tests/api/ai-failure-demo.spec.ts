
import { test, expect } from '../fixtures/baseTest';

test('DEMO: Verify AI analyzes an intentional test failure', async () => {

  // Run this test only when demo mode is explicitly enabled.
  test.skip(
    process.env.DEMO_AI_FAILURE !== '1',
    'Enable DEMO_AI_FAILURE=1 to execute this demonstration'
  );

  // Allow sufficient time for local Ollama analysis.
  test.setTimeout(90000);

  console.log('\nExecuting intentional failure for AI demonstration...');

  // Deliberately failing assertion.
  expect(200).toBe(201);

});
