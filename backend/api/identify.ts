import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getOpenAIClient } from '../src/openaiClient';
import { DEFAULT_SYSTEM_PROMPT } from '../src/prompt';
import { OPENAI_IDENTIFY_SCHEMA, identifyResultSchema } from '../src/identifySchema';

// Vercel serverless configuration
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { imageBase64 } = req.body;
    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid imageBase64 in request body' });
    }

    const openai = getOpenAIClient();
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const systemPrompt = process.env.OPENAI_SYSTEM_PROMPT || DEFAULT_SYSTEM_PROMPT;
    const timeoutMs = parseInt(process.env.OPENAI_TIMEOUT_MS || '15000', 10);

    const completion = await openai.chat.completions.create(
      {
        model,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                  detail: 'low',
                },
              },
            ],
          },
        ],
        response_format: {
          type: 'json_schema',
          json_schema: OPENAI_IDENTIFY_SCHEMA,
        },
      },
      { timeout: timeoutMs }
    );

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    const parsedResult = JSON.parse(content);
    
    // Validate the result against our Zod schema just to be safe
    const validatedResult = identifyResultSchema.parse(parsedResult);

    return res.status(200).json(validatedResult);
  } catch (error: any) {
    console.error('Identify error:', error);
    const statusCode = error?.status || 500;
    const message = error?.message || 'Internal Server Error';
    return res.status(statusCode).json({ error: message });
  }
}
