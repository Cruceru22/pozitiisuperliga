import type { Metadata } from 'next';
import GoogleAdsenseTest from '~/components/GoogleAdsenseTest';

export const metadata: Metadata = {
  title: 'AdSense Test | Poziții SuperLiga',
  description: 'Test page for Google AdSense integration',
};

export default function AdsenseTestPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-green-700 to-green-800 text-white rounded-lg shadow-md">
            Google AdSense Test
          </span>
        </h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
        <p className="mb-6 text-gray-700">
          This page is used to test if the Google AdSense script is loading correctly. 
          If you see any errors, please check the browser console for more details.
        </p>
        
        <GoogleAdsenseTest />
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Common AdSense Issues</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Ad Blockers:</strong> Ad blockers can prevent the AdSense script from loading. 
              Try disabling any ad blockers for this site.
            </li>
            <li>
              <strong>Account Status:</strong> Ensure your AdSense account is active and approved.
            </li>
            <li>
              <strong>Site Verification:</strong> Make sure your site is added to your AdSense account 
              and properly verified.
            </li>
            <li>
              <strong>Content Security Policy:</strong> Check if your site's Content Security Policy 
              allows the AdSense script to load.
            </li>
            <li>
              <strong>Script Loading:</strong> Ensure the AdSense script is being loaded correctly 
              in your application.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 