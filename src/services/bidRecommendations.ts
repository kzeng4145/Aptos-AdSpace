import { generateText } from 'ai';

type OpenAIProvider = any; // Type from Echo SDK

export async function getBidRecommendation(
  slotData: {
    creatorName: string;
    platform: string;
    followers: number;
    engagement: number;
    slotType: string;
    duration: number;
  },
  historicalBids: Array<{ price: number; won: boolean }>,
  openaiProvider: OpenAIProvider
) {
  const prompt = `
Recommend an optimal bid for this ad slot:

Slot Details:
- Creator: ${slotData.creatorName}
- Platform: ${slotData.platform}
- Followers: ${slotData.followers}
- Engagement: ${slotData.engagement}%
- Slot Type: ${slotData.slotType}
- Duration: ${slotData.duration} seconds

Historical Bids:
${historicalBids.map((b, i) => `${i + 1}. $${b.price} - ${b.won ? 'Won' : 'Lost'}`).join('\n')}

Provide:
1. Recommended bid amount (min, optimal, max)
2. Win probability at each price point
3. Justification for recommendation
`;

  const { text, usage } = await generateText({
    model: openaiProvider('gpt-4o'),
    prompt,
  });

  return {
    recommendation: text,
    tokensUsed: usage?.totalTokens || 0
  };
}
