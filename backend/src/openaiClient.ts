import OpenAI from 'openai';

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey || apiKey === 'sk-proj-REPLACE_ME') {
    throw new Error('OPENAI_API_KEY is not configured or is set to the default placeholder. Please set it in backend/.env');
  }

  return new OpenAI({
    apiKey,
  });
}
