'use client';

import { useState } from 'react';
import { RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

export default function RevalidatePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [secret, setSecret] = useState('');

  const revalidateOptions = [
    { name: 'Liga I Standings', tag: 'standings-272' },
    { name: 'Liga II Standings', tag: 'standings-271' },
    { name: 'Liga III Standings', tag: 'standings-270' },
    { name: 'All Teams', tag: 'teams-all' },
    { name: 'Liga I Teams', tag: 'teams-272' },
    { name: 'Liga II Teams', tag: 'teams-271' },
    { name: 'Liga III Teams', tag: 'teams-270' },
    { name: 'News', tag: 'news' },
  ];

  const handleRevalidate = async (tag: string) => {
    if (!secret) {
      setResult({
        success: false,
        message: 'Please enter the revalidation secret key',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(`/api/revalidate?tag=${tag}&secret=${encodeURIComponent(secret)}`);
      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || `Successfully revalidated ${tag}`,
        });
      } else {
        setResult({
          success: false,
          message: data.message || data.error || 'Failed to revalidate',
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Cache Revalidation</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="secret" className="block text-sm font-medium text-gray-700 mb-1">
            Revalidation Secret
          </label>
          <input
            type="password"
            id="secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your revalidation secret"
          />
        </div>
        
        {result && (
          <div className={`p-4 mb-4 rounded-md ${result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <div className="flex items-start">
              {result.success ? (
                <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              )}
              <p>{result.message}</p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {revalidateOptions.map((option) => (
            <button
              key={option.tag}
              onClick={() => handleRevalidate(option.tag)}
              disabled={isLoading}
              className="flex items-center justify-center p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-5 w-5 mr-2" />
              )}
              Refresh {option.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">Important Notes</h2>
        <ul className="list-disc pl-5 space-y-1 text-yellow-700">
          <li>Use this page only when you need to immediately update data on the site.</li>
          <li>Data is automatically refreshed periodically (standings every hour, news every 30 minutes).</li>
          <li>Excessive revalidation may increase API usage and potentially lead to rate limiting.</li>
        </ul>
      </div>
    </div>
  );
} 