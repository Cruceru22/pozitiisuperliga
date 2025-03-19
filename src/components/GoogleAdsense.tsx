'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

// Add type declaration for adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleAdsenseProps {
  client?: string;
  slot?: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export function GoogleAdsenseAd({
  client = 'pub-8684151047710849',
  slot,
  format = 'auto',
  responsive = true,
  style = {},
  className = '',
}: GoogleAdsenseProps) {
  useEffect(() => {
    // Push the ad to AdSense
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense ad push error:', error);
    }
  }, [client]);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

export default function GoogleAdsense() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<Error | null>(null);

  return (
    <>
      <Script
        id="google-adsense"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-8684151047710849"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Google AdSense script loaded successfully');
          setScriptLoaded(true);
        }}
        onError={(e) => {
          const error = e instanceof Error ? e : new Error('Unknown script loading error');
          console.error('Google AdSense script failed to load:', error);
          console.error('This may be caused by an ad blocker or network issue');
          setScriptError(error);
          setScriptLoaded(false);
          
          // You could implement a fallback or retry mechanism here if needed
        }}
      />
      
      {/* Optional: Add a hidden debug element that only shows in development */}
      {process.env.NODE_ENV === 'development' && scriptError && (
        <div style={{ display: 'none' }} id="adsense-debug-info">
          AdSense script error: {scriptError.message}
        </div>
      )}
    </>
  );
} 