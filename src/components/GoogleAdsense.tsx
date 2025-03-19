'use client';

import Script from 'next/script';
import { useEffect, useState, useRef } from 'react';

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

const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || '';

export function GoogleAdsenseAd({
  client = ADSENSE_PUB_ID,
  slot,
  format = 'auto',
  responsive = true,
  style = {},
  className = '',
}: GoogleAdsenseProps) {
  const [isClient, setIsClient] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const [isAdPushed, setIsAdPushed] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (!isAdPushed && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsAdPushed(true);
      } catch (error) {
        console.error('AdSense ad push error:', error);
      }
    }
  }, []);

  if (!isClient) {
    return <div className={`ad-container ${className}`} ref={adRef}></div>;
  }

  return (
    <div className={`ad-container ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

// New component for the autorelaxed ad format
export function GoogleAdsenseAutorelaxed({
  className = '',
}: {
  className?: string;
}) {
  const [isClient, setIsClient] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const [isAdPushed, setIsAdPushed] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (!isAdPushed && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsAdPushed(true);
      } catch (error) {
        console.error('AdSense autorelaxed ad push error:', error);
      }
    }
  }, []);

  if (!isClient) {
    return <div className={`ad-container-autorelaxed ${className}`} ref={adRef}></div>;
  }

  return (
    <div className={`ad-container-autorelaxed ${className}`} ref={adRef}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="autorelaxed"
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot="7348178412"
      />
    </div>
  );
}

// New component for the regular responsive ad
export function GoogleAdsenseResponsive({
  className = '',
}: {
  className?: string;
}) {
  const [isClient, setIsClient] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const [isAdPushed, setIsAdPushed] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (!isAdPushed && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsAdPushed(true);
      } catch (error) {
        console.error('AdSense responsive ad push error:', error);
      }
    }
  }, []);

  if (!isClient) {
    return <div className={`ad-container-responsive ${className}`} ref={adRef}></div>;
  }

  return (
    <div className={`ad-container-responsive ${className}`} ref={adRef}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot="5017233395"
        data-ad-format="auto"
        data-full-width-responsive="true"
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
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
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