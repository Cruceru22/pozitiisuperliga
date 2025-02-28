'use client';

import { useEffect, useState } from 'react';

export default function GoogleAdsenseTest() {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'blocked' | 'error'>('loading');
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  useEffect(() => {
    // Add debug information
    const addDebugInfo = (info: string) => {
      setDebugInfo(prev => [...prev, info]);
    };

    addDebugInfo(`Checking AdSense at ${new Date().toISOString()}`);
    
    // Check if script element exists
    const scriptElements = document.querySelectorAll('script[src*="adsbygoogle"]');
    addDebugInfo(`Found ${scriptElements.length} AdSense script elements`);

    // Check if adsbygoogle is defined after a short delay
    const timer = setTimeout(() => {
      try {
        addDebugInfo(`Window.adsbygoogle defined: ${typeof window.adsbygoogle !== 'undefined'}`);
        
        if (window.adsbygoogle) {
          setStatus('loaded');
          addDebugInfo(`AdSense object properties: ${Object.keys(window.adsbygoogle).join(', ')}`);
        } else {
          // Check if there are any console errors related to AdSense
          setStatus('blocked');
          setErrorDetails('AdSense script not loaded. This might be due to an ad blocker or network issue.');
          addDebugInfo('AdSense object not found in window');
        }
      } catch (error) {
        setStatus('error');
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setErrorDetails(errorMessage);
        addDebugInfo(`Error accessing adsbygoogle: ${errorMessage}`);
      }
    }, 2000); // Give the script 2 seconds to load

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Google AdSense Status</h2>
      
      <div className={`p-3 rounded-md ${
        status === 'loading' ? 'bg-yellow-100 text-yellow-800' :
        status === 'loaded' ? 'bg-blue-100 text-blue-800' :
        'bg-red-100 text-red-800'
      }`}>
        <p className="font-medium">
          Status: {status === 'loading' ? 'Checking...' : 
                  status === 'loaded' ? 'AdSense script loaded successfully' : 
                  'AdSense script failed to load'}
        </p>
        
        {errorDetails && (
          <div className="mt-2 text-sm">
            <p>Details: {errorDetails}</p>
            <p className="mt-2">
              Possible solutions:
              <ul className="list-disc pl-5 mt-1">
                <li>Disable ad blockers on this site</li>
                <li>Check browser console for specific errors</li>
                <li>Verify your AdSense account is active and approved</li>
                <li>Ensure your site is added to your AdSense account</li>
              </ul>
            </p>
          </div>
        )}
      </div>
      
      {/* Debug information section */}
      <div className="mt-4 p-3 bg-gray-100 rounded-md text-xs font-mono overflow-auto max-h-40">
        <h3 className="font-bold mb-2">Debug Information:</h3>
        <ul className="space-y-1">
          {debugInfo.map((info, index) => (
            <li key={index}>{info}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>This component is for testing purposes only and should be removed in production.</p>
      </div>
    </div>
  );
} 