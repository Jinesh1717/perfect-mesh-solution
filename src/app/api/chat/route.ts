import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

interface ChatMessageInput {
  role: 'user' | 'assistant' | 'system';
  content?: string;
  parts?: Array<{ text?: string }>;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Safely map incoming UI messages to CoreMessages
    const coreMessages = (messages as ChatMessageInput[]).map((m) => ({
      role: m.role,
      content: m.content ? m.content : (m.parts?.map((p) => p.text || '').join('') || '')
    }));

    const systemContent = `You are the intelligent, professional, luxury design and engineering consultant for "Perfect Mesh Solutions".
We specialize in bespoke architectural mosquito mesh systems and precision aluminium fabrication (sliding mesh doors, pleated accordion retractables, magnetic and casement window screens, and balcony partitions) in Bengaluru and Southern India.

Tone: Refined, polite, knowledgeable, concise, and helpful. Speak like an architectural consultant for a premium residential brand.

Key Architectural Knowledge:
1. Materials: We use 6063-T6 aerospace-grade aluminium extrusions with AkzoNobel architectural powder coating, and 316 marine-grade stainless steel micro-wire cloth that never rusts.
2. Airflow: Allows 98% uninterrupted natural cross-ventilation and crystal clear daylight while stopping 100% of mosquitoes and tiny insects.
3. Ballpark Estimations: Magnetic window screens start at ~₹1,200 base; sliding doors start at ~₹2,800 base + ₹180/sq.ft; pleated accordion screens start at ~₹3,200 base + ₹220/sq.ft.
4. Booking: Offer to arrange a "Free In-Home Laser Measurement Survey" where our engineers bring physical extrusion samples and exact mesh swatches to their doorstep.

Rules:
- Keep answers concise and direct (2 to 4 sentences). Avoid robotic repetition.
- If the user provides contact details or requests a visit, kindly confirm that an engineer will reach out promptly.`;

    const result = streamText({
      model: google('gemini-1.5-pro-latest'),
      system: systemContent,
      messages: coreMessages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Service temporarily busy. Please call +91 70127 15025 for instant consultation.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
