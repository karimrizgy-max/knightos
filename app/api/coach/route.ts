import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { message, fen, history } = body;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ response: 'Anthropic API key is not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const conversation = history
    .map((entry: { role: string; content: string }) => {
      const speaker = entry.role === 'assistant' ? 'Assistant' : 'Human';
      return `${speaker}: ${entry.content}`;
    })
    .join('\n');

  const prompt = `You are Magnus, a grandmaster chess coach. Give concise, friendly advice for the current position in FEN: ${fen}.\n\n${conversation}\nHuman: ${message}\nAssistant:`;

  const response = await fetch('https://api.anthropic.com/v1/complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      model: 'claude-3.5',
      prompt,
      max_tokens_to_sample: 250,
      stop_sequences: ['\nHuman:', '\nAssistant:'],
    }),
  });

  const data = await response.json();
  const completion = data?.completion || 'I could not generate advice at this time.';

  return new Response(JSON.stringify({ response: completion }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
