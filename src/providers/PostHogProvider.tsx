'use client';

import { useEffect, Suspense } from 'react';
import posthog from 'posthog-js';
import { usePathname, useSearchParams } from 'next/navigation';

function PostHogAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize PostHog
    posthog.init('phc_pfbsTplJjteHCdf1JoUTJ6W65wgPFmuNaj0rfuTlQrD', {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      capture_pageview: false // We'll handle this manually
    });

    // Return cleanup function - no need for explicit shutdown in newer versions
    return () => {
      // PostHog will be cleaned up automatically
    };
  }, []);

  // Track page views
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      
      // Track pageview
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider() {
  return (
    <Suspense fallback={null}>
      <PostHogAnalytics />
    </Suspense>
  );
} 