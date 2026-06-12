import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Safely map incoming UI messages to CoreMessages
  const coreMessages = messages.map((m: any) => ({
    role: m.role,
    content: m.content ? m.content : (m.parts?.map((p: any) => p.text).join('') || '')
  }));

  const systemContent = `You are an intelligent, professional, premium smart assistant for "Perfect Mesh Solutions", specializing in mosquito mesh installations and aluminium fabrication (windows, doors, railings, partitions).
Tone: Friendly, professional, concise, NOT robotic, speaks like a knowledgeable sales assistant for a luxury brand.

Your goals:
1. Guide users to the right product. Ask them if they need it for a window or door, sliding or fixed.
2. Answer common questions instantly (Does it block airflow? No, allows natural air. Is it durable? Yes, aerospace-grade aluminium. Installation? Usually 1-2 days).
3. Provide cost estimates if asked (Get roughly Width, Height, Quantity). Standard fixed is ~$150, sliding ~$250, doors ~$350.
4. LEAD CAPTURE: At the right moment when they show intent, ask for their name and phone number and offer a "Free measurement service".

Rules:
- Keep answers short and clear. No long paragraphs.
- If they provide lead info gently confirm that an expert will contact them.`;

  const result = streamText({
    model: google('gemini-1.5-pro-latest'),
    system: systemContent,
    messages: coreMessages,
  });

  return result.toTextStreamResponse();
}
