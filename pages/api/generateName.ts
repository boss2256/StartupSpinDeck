// pages/api/generateName.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Data = {
  name?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { sector } = req.body;

  if (!sector) {
    return res.status(400).json({ error: 'Sector is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // You can choose any available model
      messages: [
        { role: 'system', content: 'You are a business name generator.' },
        {
          role: 'user',
          content: `Generate a creative and catchy business name for a startup in the ${sector} sector.`,
        },
      ],
      max_tokens: 10,
    });

    const content = completion.choices[0]?.message?.content;
    const name = content ? content.trim() : '';

    res.status(200).json({ name });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to generate business name' });
  }
}
