'use client';

import { useState, useEffect } from 'react';
import { ROMANIAN_LEAGUES } from '~/utils/api';
import type { Standing } from '~/types/api';
import { AlertCircle, Trophy, Medal } from 'lucide-react';
import { trackEvent } from '~/utils/analytics';

interface StandingsProps {
  defaultLeagueId: string;
}

export function Standings({ defaultLeagueId }: StandingsProps) {
  const [selectedLeague, setSelectedLeague] = useState<string>(defaultLeagueId);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchStandings() {
      setError(null);
      setIsLoading(true);
      
      try {
        const response = await fetch(`/api?action=get_standings&league_id=${selectedLeague}`);
        
        if (!response.ok) {
          throw new Error(`Eroare la încărcarea clasamentului: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setStandings(data);
          
          // Track successful standings load
          trackEvent('standings_loaded', { 
            league_id: selectedLeague,
            teams_count: data.length
          });
        } else {
          setStandings([]);
          
          // Track empty standings
          trackEvent('standings_empty', { 
            league_id: selectedLeague
          });
        }
      } catch (err) {
        console.error('Eroare la încărcarea clasamentului:', err);
        setError(err instanceof Error ? err.message : String(err));
        
        // Track error
        trackEvent('standings_load_error', { 
          league_id: selectedLeague,
          error: err instanceof Error ? err.message : String(err)
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchStandings();
  }, [selectedLeague]);

  // Handle league change
  const handleLeagueChange = (leagueId: string) => {
    setSelectedLeague(leagueId);
    
    // Track league change
    trackEvent('league_changed', {
      league_id: leagueId,
      league_name: ROMANIAN_LEAGUES.find(league => league.id === leagueId)?.name || 'Unknown'
    });
  };

  // Process standings based on league
  const processedStandings = () => {
    // For Liga III, group teams by their relative position within original groups
    if (selectedLeague === '270') {
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
      const newGroups: Record<string, Standing[]> = {};
      
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
          newGroups[`Grupa ${relativePos + 1}`] = teamsAtPosition;
        }
      }
      
      return newGroups;
    } else {
      // For other leagues, first sort by position
      const sortedStandings = [...standings].sort((a, b) => {
        const posA = typeof a.overall_league_position === 'string' 
          ? parseInt(a.overall_league_position, 10) 
          : a.overall_league_position;
        
        const posB = typeof b.overall_league_position === 'string' 
          ? parseInt(b.overall_league_position, 10) 
          : b.overall_league_position;
        
        return posA - posB;
      });
      
      // Then use the existing group property if available
      return sortedStandings.reduce<Record<string, Standing[]>>((acc, standing) => {
        const group = standing.league_round ?? 'Grupa Implicită';
        if (!acc[group]) {
          acc[group] = [];
        }
        acc[group].push(standing);
        return acc;
      }, {});
    }
  };

  const groupedStandings = processedStandings();

  // League name mapping
  const leagueNames: Record<string, string> = {
    'Liga I': 'Liga I',
    'Liga II': 'Liga II',
    'Liga III': 'Liga III'
  };

  // Function to determine row styling based on position
  const getRowStyle = (position: number | string, totalTeams: number) => {
    // Only apply special styling for Liga I (ID 272)
    if (selectedLeague !== '272') {
      return 'hover:bg-gray-50';
    }
    
    const positionNum = typeof position === 'string' ? parseInt(position, 10) : position;
    
    // Champions League positions (top 2)
    if (positionNum <= 2) {
      return 'bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500';
    }
    // Europa League position (3rd)
    if (positionNum === 3) {
      return 'bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500';
    }
    // Conference League position (4th)
    if (positionNum === 4) {
      return 'bg-gradient-to-r from-teal-50 to-teal-100 border-l-4 border-teal-500';
    }
    // Relegation positions (bottom 4 for Liga I)
    if (totalTeams >= 14 && positionNum > totalTeams - 4) {
      return 'bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500';
    }
    // Default
    return 'hover:bg-gray-50';
  };

  // Function to render position indicator
  const renderPositionIndicator = (position: number | string) => {
    // Only show special indicators for Liga I (ID 272)
    if (selectedLeague !== '272') {
      return position;
    }
    
    const positionNum = typeof position === 'string' ? parseInt(position, 10) : position;
    
    if (positionNum === 1) {
      return (
        <div className="flex items-center">
          <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
          <span>{position}</span>
        </div>
      );
    }
    if (positionNum === 2) {
      return (
        <div className="flex items-center">
          <Medal className="h-5 w-5 text-gray-400 mr-2" />
          <span>{position}</span>
        </div>
      );
    }
    if (positionNum === 3) {
      return (
        <div className="flex items-center">
          <Medal className="h-5 w-5 text-amber-600 mr-2" />
          <span>{position}</span>
        </div>
      );
    }
    return position;
  };

  // Track team click
  const handleTeamClick = (team: Standing) => {
    trackEvent('standings_team_clicked', {
      team_name: team.team_name,
      team_id: team.team_id,
      league_id: selectedLeague,
      position: team.overall_league_position
    });
  };

  // Function to determine if we should show the qualification/relegation legend
  const shouldShowLegend = () => {
    return selectedLeague === '272'; // Only show for Liga I
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md border-t-4 border-green-600">
        <label htmlFor="league-select" className="block text-sm font-medium text-gray-700 mb-2">
          Selectează Liga:
        </label>
        <div className="flex flex-wrap gap-2">
          {ROMANIAN_LEAGUES.map((league) => (
            <button
              key={league.id}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedLeague === league.id
                  ? 'bg-green-700 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              onClick={() => handleLeagueChange(league.id)}
            >
              {leagueNames[league.name] || league.name}
            </button>
          ))}
        </div>
      </div>
      
      {error ? (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold">Eroare la încărcarea clasamentului</h3>
            <p>{error}</p>
          </div>
        </div>
      ) : isLoading && standings.length === 0 ? (
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700 mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Se încarcă clasamentul...</p>
          <p className="text-sm text-gray-500 mt-2">Vă rugăm să așteptați câteva momente</p>
        </div>
      ) : standings.length === 0 ? (
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Nu există date disponibile</h3>
          <p className="text-gray-600">
            Nu am găsit informații despre clasament pentru liga selectată.
          </p>
        </div>
      ) : (
        <>
          {shouldShowLegend() && (
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-800">Legendă:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-100 border-l-4 border-green-600 mr-2"></div>
                  <span className="text-sm">Calificare UEFA Champions League</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-100 border-l-4 border-blue-600 mr-2"></div>
                  <span className="text-sm">Calificare UEFA Europa League</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-100 border-l-4 border-red-600 mr-2"></div>
                  <span className="text-sm">Retrogradare</span>
                </div>
              </div>
            </div>
          )}
          {Object.entries(groupedStandings).map(([group, groupStandings]) => (
            <div key={group} className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-green-700 text-white p-3">
                <h3 className="text-xl font-semibold">{group}</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-green-700 to-green-800 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">Poziție</th>
                      <th className="py-3 px-4 text-left">Echipă</th>
                      <th className="py-3 px-4 text-center">MJ</th>
                      <th className="py-3 px-4 text-center">V</th>
                      <th className="py-3 px-4 text-center">E</th>
                      <th className="py-3 px-4 text-center">Î</th>
                      <th className="py-3 px-4 text-center">GM</th>
                      <th className="py-3 px-4 text-center">GP</th>
                      <th className="py-3 px-4 text-center font-bold">PCT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupStandings.map((standing, index) => (
                      <tr 
                        key={standing.team_id} 
                        className={`${getRowStyle(standing.overall_league_position, groupStandings.length)} transition-colors cursor-pointer`}
                        onClick={() => handleTeamClick(standing)}
                      >
                        <td className="py-3 px-4 border-b">
                          {selectedLeague === '270' 
                            ? standing.overall_league_position // Use the original position for Liga III
                            : renderPositionIndicator(standing.overall_league_position)
                          }
                        </td>
                        <td className="py-3 px-4 border-b">
                          <div className="flex items-center">
                            {standing.team_badge && (
                              <img 
                                src={standing.team_badge || '/placeholder-team.svg'} 
                                alt={standing.team_name} 
                                className="w-8 h-8 mr-3 object-contain"
                              />
                            )}
                            <span className="font-medium">{standing.team_name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 border-b text-center">{standing.overall_league_payed}</td>
                        <td className="py-3 px-4 border-b text-center font-medium text-green-700">{standing.overall_league_W}</td>
                        <td className="py-3 px-4 border-b text-center font-medium text-amber-600">{standing.overall_league_D}</td>
                        <td className="py-3 px-4 border-b text-center font-medium text-red-600">{standing.overall_league_L}</td>
                        <td className="py-3 px-4 border-b text-center">{standing.overall_league_GF}</td>
                        <td className="py-3 px-4 border-b text-center">{standing.overall_league_GA}</td>
                        <td className="py-3 px-4 border-b text-center font-bold bg-gray-50">{standing.overall_league_PTS}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Standings; 