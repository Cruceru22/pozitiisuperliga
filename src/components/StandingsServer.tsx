'use server';

import { api } from '~/utils/api';
import { Standings } from './Standings';
import type { Standing } from '~/types/api';
import { Suspense } from 'react';

interface StandingsServerProps {
  defaultLeagueId: string;
}

export async function StandingsServer({ defaultLeagueId }: StandingsServerProps) {
  // Fetch initial standings data on the server, always using league ID 272
  let initialStandings: Standing[] = [];
  let initialError: string | null = null;
  
  try {
    // Always use league ID 272 for initial server-side rendering
    initialStandings = await api.server.getStandings('272');
    
    // Sort standings by position
    const sortedStandings = [...initialStandings].sort((a, b) => {
      const posA = typeof a.overall_league_position === 'string' 
        ? parseInt(a.overall_league_position, 10) 
        : a.overall_league_position;
      
      const posB = typeof b.overall_league_position === 'string' 
        ? parseInt(b.overall_league_position, 10) 
        : b.overall_league_position;
      
      return posA - posB;
    });
    
    // Select one team per position from 1-6
    const top6Teams: Standing[] = [];
    const positionsAdded = new Set<number>();
    
    for (const team of sortedStandings) {
      const position = typeof team.overall_league_position === 'string'
        ? parseInt(team.overall_league_position, 10)
        : team.overall_league_position;
      
      if (position >= 1 && position <= 6 && !positionsAdded.has(position)) {
        top6Teams.push(team);
        positionsAdded.add(position);
        
        // Break if we have all 6 positions
        if (positionsAdded.size === 6) break;
      }
    }
    
    // Sort the final selection by position to ensure correct order
    top6Teams.sort((a, b) => {
      const posA = typeof a.overall_league_position === 'string' 
        ? parseInt(a.overall_league_position, 10) 
        : a.overall_league_position;
      
      const posB = typeof b.overall_league_position === 'string' 
        ? parseInt(b.overall_league_position, 10) 
        : b.overall_league_position;
      
      return posA - posB;
    });
    
    initialStandings = top6Teams;
  } catch (err) {
    console.error('Error fetching initial standings:', err);
    initialError = err instanceof Error ? err.message : String(err);
  }
  
  return (
    <Suspense fallback={<div className="p-4 text-center">Se încarcă clasamentul...</div>}>
      <Standings 
        initialStandings={initialStandings}
        initialError={initialError}
      />
    </Suspense>
  );
} 