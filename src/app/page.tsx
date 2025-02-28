import type { Metadata } from 'next';
import { StandingsServer } from '~/components/StandingsServer';
import { ROMANIAN_LEAGUES } from '~/utils/api';
import { Trophy } from 'lucide-react';

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
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4 inline-flex items-center justify-center">
          <span className="bg-green-600 text-white px-4 py-2 rounded-lg">
            <Trophy className="h-6 w-6 inline-block mr-2" />
            Clasament SuperLiga
          </span>
        </h1>
      </div>
      
      <div className="border border-green-600/30 rounded-xl p-6 bg-white shadow-sm">
        <StandingsServer defaultLeagueId={defaultLeagueId} />
      </div>
    </div>
  );
}
