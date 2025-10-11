import { NextRequest, NextResponse } from 'next/server';
import { EchoClient } from '@merit-systems/echo-typescript-sdk';
import { generateText } from 'ai';

const echo = new EchoClient({
  apiKey: process.env.ECHO_API_KEY!,
  appId: process.env.NEXT_PUBLIC_ECHO_APP_ID!
});

export async function POST(req: NextRequest) {
  try {
    const { creatorIds, userId } = await req.json();
    
    // Get Echo-authenticated provider for this user
    const { openai } = echo.getModelProviders(userId);
    
    const analyses = [];
    
    for (const creatorId of creatorIds) {
      const { text } = await generateText({
        model: openai('gpt-4o-mini'), // Using mini for batch processing
        prompt: `Quick analysis for creator ${creatorId}`,
      });
      
      analyses.push({ creatorId, analysis: text });
    }
    
    return NextResponse.json({ analyses });
  } catch (error) {
    console.error('Batch analysis failed:', error);
    return NextResponse.json(
      { error: 'Batch analysis failed' },
      { status: 500 }
    );
  }
}
