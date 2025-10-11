import { useState, useCallback } from 'react';

export function useAIUsageTracking() {
  const [totalTokensUsed, setTotalTokensUsed] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const trackUsage = useCallback((tokens: number, costPerToken: number = 0.00002) => {
    setTotalTokensUsed(prev => prev + tokens);
    setTotalCost(prev => prev + (tokens * costPerToken));
  }, []);

  return { totalTokensUsed, totalCost, trackUsage };
}