import type { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin | Poziții SuperLiga',
  description: 'Admin area for Poziții SuperLiga',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md inline-flex items-center">
            <Shield className="h-6 w-6 mr-2" />
            <h1 className="text-xl font-bold">Admin Area</h1>
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
} 