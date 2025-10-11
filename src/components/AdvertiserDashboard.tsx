'use client';

import { useState } from 'react';
import { isSignedIn } from "@/echo";

export function AdvertiserDashboard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  if (!isSignedIn()) {
    return (
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">AI-Powered Advertiser Tools</h2>
        <p className="text-gray-400">Please sign in to access AI tools.</p>
      </div>
    );
  }

  const handleAnalyzeCreator = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/completion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: 'Analyze this creator for advertising potential: JohnDoe, YouTube, 500K followers, 4.2% engagement, Tech Reviews niche. Provide audience demographics, best ad categories, estimated ad value range, and campaign recommendations.'
            }
          ]
        })
      });
      
      const reader = response.body?.getReader();
      let result = '';
      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        result += new TextDecoder().decode(value);
      }
      
      setResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      setResult('Analysis failed. Please check your balance.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateScript = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/completion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: 'Create an ad script for Smart Watch Pro targeting tech enthusiasts 25-40, key message: Health tracking meets premium design, 30 seconds, casual informative style.'
            }
          ]
        })
      });
      
      const reader = response.body?.getReader();
      let result = '';
      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        result += new TextDecoder().decode(value);
      }
      
      setResult(result);
    } catch (error) {
      console.error('Script generation failed:', error);
      setResult('Script generation failed. Please check your balance.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetBidRecommendation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/completion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: 'Recommend an optimal bid for JohnDoe YouTube slot: 500K followers, 4.2% engagement, 30-second mid-roll. Historical bids: $500 (lost), $750 (won), $650 (won). Provide min/optimal/max bid amounts, win probabilities, and justification.'
            }
          ]
        })
      });
      
      const reader = response.body?.getReader();
      let result = '';
      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        result += new TextDecoder().decode(value);
      }
      
      setResult(result);
    } catch (error) {
      console.error('Bid recommendation failed:', error);
      setResult('Recommendation failed. Please check your balance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">AI-Powered Advertiser Tools</h2>
      
      <div className="flex gap-4">
        <button
          onClick={handleAnalyzeCreator}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Analyze Creator
        </button>
        
        <button
          onClick={handleGenerateScript}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          Generate Ad Script
        </button>
        
        <button
          onClick={handleGetBidRecommendation}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          Get Bid Recommendation
        </button>
      </div>

      {loading && <p>Processing with AI...</p>}
      
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Result:</h3>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}
