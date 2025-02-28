'use server';

import { api } from '~/utils/api';
import { AlertCircle } from 'lucide-react';
import type { Standing } from '~/types/api';

// Server component that fetches and displays data
async function StandingsData({ leagueId }: { leagueId: string }) {
  let standings: Standing[] = [];
  let error: string | null = null;
  
  try {
    // Server-side data fetching
    const data = await api.getStandings(leagueId);
    
    if (data && data.length > 0) {
      standings = data;
    } else {
      error = 'Nu există clasament disponibil pentru această competiție';
    }
  } catch (err) {
    console.error('Eroare la încărcarea clasamentului:', err);
    error = err instanceof Error ? err.message : String(err);
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4 flex items-start">
        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold">Eroare la încărcarea clasamentului</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  if (standings.length === 0) {
    return null;
  }
  
  // Group standings by group if they have group property
  let groupedStandings: Record<string, Standing[]>;
  
  if (leagueId === '270') {
    // First, sort standings by their position to ensure proper ordering
    const sortedStandings = [...standings].sort((a, b) => {
      const posA = typeof a.overall_league_position === 'string' 
        ? parseInt(a.overall_league_position, 10) 
        : a.overall_league_position;
      
      const posB = typeof b.overall_league_position === 'string' 
        ? parseInt(b.overall_league_position, 10) 
        : b.overall_league_position;
      
      return posA - posB;
    });
    
    // Create original groups of 10 teams each
    const originalGroups: Standing[][] = [];
    
    // Divide the array into chunks of 10 teams
    for (let i = 0; i < sortedStandings.length; i += 10) {
      originalGroups.push(sortedStandings.slice(i, i + 10));
    }
    
    // Now create new groups based on relative position within each original group
    groupedStandings = {};
    
    // For each relative position (0-9)
    for (let relativePos = 0; relativePos < 10; relativePos++) {
      const teamsAtPosition: Standing[] = [];
      
      // Go through each original group
      originalGroups.forEach(group => {
        // If this group has a team at this relative position, add it
        if (relativePos < group.length) {
          const team = group[relativePos];
          if (team) {
            teamsAtPosition.push(team);
          }
        }
      });
      
      // If we found teams at this relative position, add them to the new groups
      if (teamsAtPosition.length > 0) {
        groupedStandings[`Grupa ${relativePos + 1}`] = teamsAtPosition;
      }
    }
  } else {
    // For other leagues, use the existing group property if available
    groupedStandings = standings.reduce<Record<string, Standing[]>>((acc, standing) => {
      const group = standing.league_round ?? 'Grupa Implicită';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(standing);
      return acc;
    }, {});
  }
  
  return (
    <>
      {Object.entries(groupedStandings).map(([group, groupStandings]) => (
        <div key={group} className="mb-8">
          {Object.keys(groupedStandings).length > 1 && (
            <h3 className="text-xl font-semibold mb-3">Grupa: {group}</h3>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Poziție</th>
                  <th className="py-2 px-4 border-b text-left">Echipă</th>
                  <th className="py-2 px-4 border-b text-center">MJ</th>
                  <th className="py-2 px-4 border-b text-center">V</th>
                  <th className="py-2 px-4 border-b text-center">E</th>
                  <th className="py-2 px-4 border-b text-center">Î</th>
                  <th className="py-2 px-4 border-b text-center">GM</th>
                  <th className="py-2 px-4 border-b text-center">GP</th>
                  <th className="py-2 px-4 border-b text-center">PCT</th>
                </tr>
              </thead>
              <tbody>
                {groupStandings.map((standing, index) => (
                  <tr key={standing.team_id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">
                      {standing.overall_league_position}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center">
                        {standing.team_badge && (
                          <img 
                            src={standing.team_badge || '/placeholder-team.svg'} 
                            alt={standing.team_name} 
                            className="w-6 h-6 mr-2"
                          />
                        )}
                        {standing.team_name}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b text-center">{standing.overall_league_payed}</td>
                    <td className="py-2 px-4 border-b text-center">{standing.overall_league_W}</td>
                    <td className="py-2 px-4 border-b text-center">{standing.overall_league_D}</td>
                    <td className="py-2 px-4 border-b text-center">{standing.overall_league_L}</td>
                    <td className="py-2 px-4 border-b text-center">{standing.overall_league_GF}</td>
                    <td className="py-2 px-4 border-b text-center">{standing.overall_league_GA}</td>
                    <td className="py-2 px-4 border-b text-center font-bold">{standing.overall_league_PTS}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}

export default StandingsData;