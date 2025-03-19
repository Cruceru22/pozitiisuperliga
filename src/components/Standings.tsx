'use client';

import { useState, useEffect } from 'react';
import type { Standing } from '~/types/api';
import { AlertCircle, Trophy } from 'lucide-react';
import { GoogleAdsenseResponsive } from './GoogleAdsense';

interface StandingsProps {
  initialStandings?: Standing[];
  initialError?: string | null;
}

export function Standings({ 
  initialStandings = [], 
  initialError = null 
}: StandingsProps) {
  const [standings, setStandings] = useState<Standing[]>(initialStandings);
  const [error, setError] = useState<string | null>(initialError);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // If we have initial data, don't fetch again
    if (initialStandings.length > 0 && !initialError) {
      // Process initial data to get one team per position from 1-6
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
      
      setStandings(top6Teams);
      return;
    }
    
    // Always set loading state first
    setIsLoading(true);
    
    async function fetchStandings() {
      setError(null);
      
      try {
        // Always use league ID 272 for Liga I
        const response = await fetch(`/api?action=get_standings&league_id=272`);
        
        if (!response.ok) {
          throw new Error(`Eroare la încărcarea clasamentului: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          // Sort standings by position
          const sortedStandings = [...data].sort((a, b) => {
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
          
          setStandings(top6Teams);
        } else {
          setStandings([]);
        }
      } catch (err) {
        console.error('Eroare la încărcarea clasamentului:', err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchStandings();
  }, [initialStandings, initialError]);

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
  
  if (isLoading && standings.length === 0) {
    return (
      <div className="p-4 sm:p-8 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
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
  
  return (
    <div className="container mx-auto p-0 sm:p-4">
      <div className="mb-6 bg-white p-3 sm:p-4 rounded-lg shadow-md border-t-4 border-green-600">
        <h2 className="text-xl font-bold text-gray-800">Liga I - Poziții 1-6</h2>
      </div>
      
      <div className="mb-6 sm:mb-8">
        <div className="overflow-x-auto relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
              <div className="flex flex-col items-center">
                <span className="w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full animate-spin mb-2"></span>
                <span className="text-sm text-green-600 font-medium">Se încarcă...</span>
              </div>
            </div>
          )}
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-green-600 text-white">
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
              {standings.map((standing) => (
                <tr
                  key={`${standing.team_id}-${standing.overall_league_position}`}
                  className="hover:bg-gray-50"
                >
                  <td className="py-2 px-4 border-b">
                    {standing.overall_league_position}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center">
                      {standing.team_badge && (
                        <img 
                          src={standing.team_badge} 
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
      
      {/* AdSense ad after the standings table */}
      <div className="mt-4 mb-6">
        <GoogleAdsenseResponsive className="w-full" />
      </div>
    </div>
  );
}

export default Standings;