import type { Metadata } from 'next';
import FootballNewsClient from '~/components/FootballNewsClient';

export const metadata: Metadata = {
  title: 'Știri SuperLiga | Noutăți Fotbal Românesc',
  description: 'Cele mai recente știri despre fotbalul românesc și SuperLiga. Urmărește ultimele noutăți, transferuri și evenimente din fotbalul românesc.',
  keywords: 'știri fotbal românesc, noutăți SuperLiga, transferuri Liga 1, fotbal România știri, actualitate fotbal',
};

export default function NewsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-lg shadow-md">
            Știri SuperLiga
          </span>
        </h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <FootballNewsClient />
      </div>
    </div>
  );
} 