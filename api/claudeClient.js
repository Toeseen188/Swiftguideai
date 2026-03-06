import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.ANTHROPIC_API_KEY;

let client = null;
if (apiKey) {
  client = new Anthropic({ apiKey });
}

export async function generateRoutesWithClaude(prompt) {
  if (!client) {
    const error = new Error('Claude API key not configured');
    error.code = 'NO_API_KEY';
    throw error;
  }

  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1200,
    temperature: 0.4,
    system:
      'You are SwiftGuide, a calm and precise AI emergency evacuation assistant. Your job is to generate clear, life-saving evacuation routes for citizens in distress. Always respond in simple, calm language. Never use technical jargon. A frightened person must be able to follow your instructions.',
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  const contentBlock = response?.content?.[0];
  const text = contentBlock?.type === 'text' ? contentBlock.text : '';

  if (!text) {
    throw new Error('Claude returned an empty response');
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    throw new Error('Claude response was not valid JSON');
  }

  if (!parsed || !Array.isArray(parsed.routes)) {
    throw new Error('Claude JSON missing routes array');
  }

  return parsed;
}

