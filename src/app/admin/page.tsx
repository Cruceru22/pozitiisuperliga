import Link from 'next/link';
import { RefreshCw, Settings } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            href="/admin/revalidate" 
            className="flex flex-col items-center p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <RefreshCw className="h-12 w-12 text-green-600 mb-4" />
            <h2 className="text-lg font-semibold text-green-800">Cache Revalidation</h2>
            <p className="text-sm text-green-700 text-center mt-2">
              Refresh data from external APIs
            </p>
          </Link>
          
          <div className="flex flex-col items-center p-6 bg-gray-50 border border-gray-200 rounded-lg opacity-50 cursor-not-allowed">
            <Settings className="h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-lg font-semibold text-gray-500">Settings</h2>
            <p className="text-sm text-gray-500 text-center mt-2">
              Coming soon
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <Link href="/" className="text-green-600 hover:text-green-800 transition-colors">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
} 