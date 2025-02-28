import type { Metadata } from 'next';
import { TeamsServer } from '~/components/TeamsServer';
import { Flag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Echipe SuperLiga | Cluburi Fotbal Românesc',
  description: 'Informații despre echipele din SuperLiga României. Descoperă loturile, stadioanele și statisticile echipelor de fotbal românești.',
  keywords: 'echipe SuperLiga, cluburi fotbal românesc, loturi Liga 1, stadioane fotbal România',
};

// Make the page dynamic to read search params
export const dynamic = 'force-dynamic';

export default function TeamsPage() {
  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 inline-flex items-center justify-center">
          <span className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Echipe SuperLiga
          </span>
        </h1>
      </div>
      
      <div className="border border-green-600/30 rounded-xl p-6 bg-white shadow-sm">
        <TeamsServer />
      </div>
    </div>
  );
} 