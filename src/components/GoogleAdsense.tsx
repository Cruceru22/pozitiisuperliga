'use client';

import { useEffect } from 'react';

// Add type declaration for adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleAdsenseProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export function GoogleAdsense({
  client,
  slot,
  format = 'auto',
  responsive = true,
  style = {},
  className = '',
}: GoogleAdsenseProps) {
  useEffect(() => {
    // Load AdSense script if it hasn't been loaded yet
    const hasScript = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
    
    if (!hasScript) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.dataset.adClient = client;
      document.head.appendChild(script);
    }

    // Push the ad to AdSense
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
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