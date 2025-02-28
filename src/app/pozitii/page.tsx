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

export default function StandingsPage() {
  // Default league ID for initial render
  const defaultLeagueId = ROMANIAN_LEAGUES[0].id;
  
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-green-700 to-green-800 text-white rounded-lg shadow-md">
            Clasament SuperLiga
          </span>
        </h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
        <Standings defaultLeagueId={defaultLeagueId} />
      </div>
    </div>
  );
} 