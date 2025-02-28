import type { Metadata } from 'next';
import { Standings } from '~/components/Standings';
import { ROMANIAN_LEAGUES } from '~/utils/api';

export const metadata: Metadata = {
  title: 'Poziții SuperLiga | Clasament Fotbal Românesc',
  description: 'Clasamente și poziții actualizate pentru SuperLiga României și alte ligi de fotbal românesc. Urmărește echipele favorite în timp real.',
  keywords: 'clasament SuperLiga, poziții SuperLiga, fotbal românesc, Liga 1 România, clasament fotbal',
};

// Make the page dynamic to read search params
export const dynamic = 'force-dynamic';

export default function HomePage() {
  // Default league ID for initial render
  const defaultLeagueId = ROMANIAN_LEAGUES[0].id;
  
  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-lg shadow-md">
            Clasament SuperLiga
          </span>
        </h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6 border border-blue-100">
        <Standings defaultLeagueId={defaultLeagueId} />
      </div>
    </div>
  );
}
