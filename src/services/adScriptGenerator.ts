import { generateText } from 'ai';

type OpenAIProvider = any; // Type from Echo SDK

export async function generateAdScript(
  briefing: {
    product: string;
    targetAudience: string;
    keyMessage: string;
    duration: number; // in seconds
    creatorStyle: string;
  },
  openaiProvider: OpenAIProvider
) {
  const prompt = `
Create an ad script for:
- Product/Service: ${briefing.product}
- Target Audience: ${briefing.targetAudience}
- Key Message: ${briefing.keyMessage}
- Duration: ${briefing.duration} seconds
- Creator Style: ${briefing.creatorStyle}

Generate a natural, engaging script that fits the creator's style and platform.
`;

  const { text, usage } = await generateText({
    model: openaiProvider('gpt-4o'),
    prompt,
  });

  return {
    script: text,
    tokensUsed: usage?.totalTokens || 0
  };
}
