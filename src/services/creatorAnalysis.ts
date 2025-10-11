import { generateText } from 'ai';

type OpenAIProvider = any; // Type from Echo SDK

export async function analyzeCreator(
  creatorData: {
    name: string;
    platform: string;
    followers: number;
    engagement: number;
    niche: string;
  },
  openaiProvider: OpenAIProvider
) {
  const prompt = `
Analyze this creator for advertising potential:
- Name: ${creatorData.name}
- Platform: ${creatorData.platform}
- Followers: ${creatorData.followers}
- Engagement Rate: ${creatorData.engagement}%
- Niche: ${creatorData.niche}

Provide:
1. Audience demographics estimation
2. Best ad categories for this creator
3. Estimated ad value range
4. Campaign recommendations
`;

  const { text, usage } = await generateText({
    model: openaiProvider('gpt-4o'),
    prompt,
  });

  // Usage is automatically tracked and billed through Echo
  console.log('Tokens used:', usage);

  return {
    analysis: text,
    tokensUsed: usage?.totalTokens || 0
  };
}
