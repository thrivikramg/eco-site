import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Prompt } from '@/models/prompt';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const prompt = body.prompt;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
  }

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await res.json();
    const reply = data.choices[0]?.message?.content || 'No reply generated.';

    await connectToDatabase();
    await Prompt.create({ prompt, reply });

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
