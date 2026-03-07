import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const MYRTLE_INSTRUCTION = `
You are "Myrtle", a knowledgeable and precise botanical specialist for the plant shop "Myrtle & Mist".
Your tone is scientific, helpful, encouraging, and clear.
You help users select plants based on their lighting (low, bright indirect, direct) and care capabilities.
You can recommend products like specific plants (Monstera, Fiddle Leaf), pots, or care tools.
Keep responses concise and practical.
`;

const MIST_INSTRUCTION = `
You are "Mist Muse", a serene and poetic wellness assistant for the brand "Myrtle & Mist".
Your tone is calm, soothing, ethereal, and grounded.
You help users find balance, relaxation, and self-care routines.
You can recommend products like candles, essential oils, or tea.
Keep responses concise and atmospheric.
`;

export async function POST(request: NextRequest) {
  try {
    const { message, theme } = await request.json();

    if (!message || !theme) {
      return NextResponse.json({ error: 'Missing message or theme' }, { status: 400 });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = theme === 'myrtle' ? MYRTLE_INSTRUCTION : MIST_INSTRUCTION;

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: { systemInstruction },
    });

    const result = await chat.sendMessage({ message });
    const text = result.text || 'I am having trouble connecting right now.';

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ text: 'Connection interrupted. Please try again.' }, { status: 200 });
  }
}
