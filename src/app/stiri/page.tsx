import type { Metadata } from 'next';
import { FootballNewsServer } from '~/components/FootballNewsServer';
import { Newspaper } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Știri SuperLiga | Noutăți Fotbal Românesc',
  description: 'Cele mai recente știri despre fotbalul românesc și SuperLiga. Urmărește ultimele noutăți, transferuri și evenimente din fotbalul românesc.',
  keywords: 'știri fotbal românesc, noutăți SuperLiga, transferuri Liga 1, fotbal România știri, actualitate fotbal',
};

// Make the page dynamic to read search params
export const dynamic = 'force-dynamic';

export default function NewsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 inline-flex items-center justify-center">
          <span className="bg-green-600 text-white px-4 py-2 rounded-lg">
            <Newspaper className="h-6 w-6 inline-block mr-2" />
            Știri Fotbal
          </span>
        </h1>
      </div>
      
      <div className="border border-green-600/30 rounded-xl p-6 bg-white shadow-sm">
        <FootballNewsServer />
      </div>
    </div>
  );
} 