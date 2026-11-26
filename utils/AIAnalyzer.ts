export class AIAnalyzer {
  private static readonly OLLAMA_URL =
    process.env.OLLAMA_URL ??
    'http://localhost:11434/api/generate';

  private static readonly MODEL = 'qwen2.5:3b';

  static async analyzeFailure(
    testName: string,
    errorMessage: string
  ): Promise<string> {
    const prompt = `
You are a Senior QA Automation Engineer.

Analyze the following Playwright test failure.

Test Name:
${testName}

Error Details:
${errorMessage}

Provide your analysis using these sections:

1. Probable Root Cause
2. Why the Failure Occurred
3. Suggested Investigation Steps
4. Recommended Fix

Important:
- Base your analysis on the supplied error.
- Do not assume facts that are not provided.
- Clearly distinguish confirmed facts from possible causes.
- Keep the response concise.
`;

    try {
      const response = await fetch(this.OLLAMA_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.MODEL,
          prompt,
          stream: false,
          options: {
            temperature: 0.2,
            num_predict: 250
          }
        }),
        signal: AbortSignal.timeout(60000)
      });

      if (!response.ok) {
        throw new Error(`Ollama HTTP error: ${response.status}`);
      }

      const result = await response.json() as {
        response: string;
      };

      return result.response.trim();

    } catch (error) {
      console.error('AI analysis unavailable:', error);

      return 'AI analysis could not be completed. Check whether Ollama is running.';
    }
  }
}