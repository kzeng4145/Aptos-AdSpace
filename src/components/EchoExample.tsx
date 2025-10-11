'use client';

import { EchoTokens, useEchoModelProviders } from '@/lib/echo-sdk';
import { generateText } from 'ai';
import { useState } from 'react';

export function EchoExample() {
  const { openai } = useEchoModelProviders();
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const { text } = await generateText({
        model: openai('gpt-4o'),
        prompt: 'Hello world'
      });
      setResult(text);
    } catch (error) {
      console.error('Generation failed:', error);
      setResult('Generation failed. Please check your balance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Echo Integration Example</h2>
      
      {/* Complete user management - handles auth, billing, sign-out */}
      <EchoTokens showAvatar={true} />
      
      <button 
        onClick={handleGenerate}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Ask AI'}
      </button>
      
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
