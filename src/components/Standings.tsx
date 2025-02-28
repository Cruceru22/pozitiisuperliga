'use client';

import { useState, useEffect } from 'react';
import { ROMANIAN_LEAGUES, api } from '~/utils/api';
import type { Standing } from '~/types/api';
import { AlertCircle, Trophy, Medal } from 'lucide-react';
import { trackEvent } from '~/utils/analytics';

interface StandingsProps {
  defaultLeagueId: string;
  initialStandings?: Standing[];
  initialError?: string | null;
}

export function Standings({ 
  defaultLeagueId, 
  initialStandings = [], 
  initialError = null 
}: StandingsProps) {
  const [selectedLeague, setSelectedLeague] = useState<string>(defaultLeagueId);
  const [standings, setStandings] = useState<Standing[]>(initialStandings);
  const [error, setError] = useState<string | null>(initialError);

  useEffect(() => {
    // If we're still on the initial league and we have initial data, don't fetch again
    if (selectedLeague === defaultLeagueId && initialStandings.length > 0 && !initialError) {
      return;
    }
    
    async function fetchStandings() {
      setError(null);
      
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
      }
    }
    
    fetchStandings();
  }, [selectedLeague, defaultLeagueId, initialStandings, initialError]);

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
    if (error) {
      return (
        <div className="p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm sm:text-base">Eroare la încărcarea clasamentului</h3>
            <p className="text-sm sm:text-base">{error}</p>
          </div>
        </div>
      );
    }
    
    if (standings.length === 0) {
      return (
        <div className="p-4 sm:p-8 text-center">
          <Trophy className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-bold text-gray-600 mb-2">Nu există clasament disponibil</h3>
          <p className="text-sm sm:text-base text-gray-500">Clasamentul pentru această competiție nu este disponibil momentan.</p>
        </div>
      );
    }
    
    // Group standings by group if they have group property
    let groupedStandings: Record<string, Standing[]>;
    
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
          <div key={group} className="mb-6 sm:mb-8">
            {Object.keys(groupedStandings).length > 1 && (
              <h3 className="text-lg sm:text-xl font-semibold mb-3 p-2 sm:p-3 bg-gray-700 text-white rounded-t-lg">
                Grupa: {group}
              </h3>
            )}
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
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
                  {groupStandings.map((standing) => (
                    <tr 
                      key={standing.team_id} 
                      className={`hover:bg-gray-50 cursor-pointer ${getRowStyle(standing.overall_league_position, groupStandings.length)}`}
                      onClick={() => handleTeamClick(standing)}
                    >
                      <td className="py-2 px-4 border-b">
                        <div className="flex items-center">
                          {renderPositionIndicator(standing.overall_league_position)}
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <div className="flex items-center">
                          {standing.team_badge && (
                            <img 
                              src={standing.team_badge || '/placeholder-team.svg'} 
                              alt={standing.team_name} 
                              className="w-6 h-6 mr-2"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-team.svg';
                              }}
                            />
                          )}
                          <span className="font-medium">{standing.team_name}</span>
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
  };

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
      return 'bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500';
    }
    // Europa League position (3rd)
    if (positionNum === 3) {
      return 'bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500';
    }
    // Conference League position (4th)
    if (positionNum === 4) {
      return 'bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500';
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
    <div className="container mx-auto p-0 sm:p-4">
      <div className="mb-6 bg-white p-3 sm:p-4 rounded-lg shadow-md border-t-4 border-gray-600">
        <label htmlFor="league-select" className="block text-sm font-medium text-gray-700 mb-2">
          Selectează Liga:
        </label>
        <div className="flex flex-wrap gap-2">
          {ROMANIAN_LEAGUES.map((league) => (
            <button
              key={league.id}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedLeague === league.id
                  ? 'bg-gray-700 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              onClick={() => handleLeagueChange(league.id)}
            >
              {leagueNames[league.name] || league.name}
            </button>
          ))}
        </div>
      </div>
      
      {shouldShowLegend() && (
        <div className="mb-6 bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
          <h3 className="font-semibold mb-3 text-gray-800">Legendă:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-100 border-l-4 border-green-600 mr-3 flex-shrink-0 rounded-sm"></div>
              <span className="text-sm">Calificare UEFA Champions League</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-orange-100 border-l-4 border-orange-600 mr-3 flex-shrink-0 rounded-sm"></div>
              <span className="text-sm">Calificare UEFA Europa League</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-purple-100 border-l-4 border-purple-600 mr-3 flex-shrink-0 rounded-sm"></div>
              <span className="text-sm">Calificare UEFA Conference League</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-100 border-l-4 border-red-600 mr-3 flex-shrink-0 rounded-sm"></div>
              <span className="text-sm">Retrogradare</span>
            </div>
          </div>
        </div>
      )}
      {processedStandings()}
    </div>
  );
}

export default Standings; 