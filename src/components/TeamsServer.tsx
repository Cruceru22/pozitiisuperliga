'use server';

import { api } from '~/utils/api';
import TeamsClient from './TeamsClient';
import type { Team } from '~/types/api';
import { Suspense } from 'react';
import { ROMANIAN_LEAGUES } from '~/utils/api';

export async function TeamsServer() {
  // Fetch initial teams data on the server
  let initialTeams: Team[] = [];
  let initialError: string | null = null;
  
  try {
    // Use the first Romanian league ID (Liga I)
    const leagueId = ROMANIAN_LEAGUES[0].id;
    initialTeams = await api.server.getTeams(leagueId);
  } catch (err) {
    console.error('Error fetching initial teams:', err);
    initialError = err instanceof Error ? err.message : String(err);
  }
  
  return (
    <Suspense fallback={<div className="p-4 text-center">Se încarcă echipele...</div>}>
      <TeamsClient 
        initialTeams={initialTeams}
        initialError={initialError}
      />
    </Suspense>
  );
} 