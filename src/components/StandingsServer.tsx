'use server';

import { api } from '~/utils/api';
import { Standings } from './Standings';
import type { Standing } from '~/types/api';
import { Suspense } from 'react';

interface StandingsServerProps {
  defaultLeagueId: string;
}

export async function StandingsServer({ defaultLeagueId }: StandingsServerProps) {
  // Fetch initial standings data on the server
  let initialStandings: Standing[] = [];
  let initialError: string | null = null;
  
  try {
    initialStandings = await api.server.getStandings(defaultLeagueId);
  } catch (err) {
    console.error('Error fetching initial standings:', err);
    initialError = err instanceof Error ? err.message : String(err);
  }
  
  return (
    <Suspense fallback={<div className="p-4 text-center">Se încarcă clasamentul...</div>}>
      <Standings 
        defaultLeagueId={defaultLeagueId} 
        initialStandings={initialStandings}
        initialError={initialError}
      />
    </Suspense>
  );
} 