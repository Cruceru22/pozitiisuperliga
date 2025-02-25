import { useEffect, useState } from 'react';
import { t } from '~/utils/translations';

interface Player {
  player_key: string;
  player_id: string;
  player_image: string | null;
  player_name: string;
  player_number: string;
  player_country: string;
  player_type: string;
  player_age: string;
  player_match_played: string;
  player_goals: string;
  player_yellow_cards: string;
  player_red_cards: string;
  player_injured: string;
  player_rating: string;
}

interface Coach {
  coach_name: string;
  coach_country: string;
  coach_age: string;
}

interface Venue {
  venue_name: string;
  venue_address: string;
  venue_city: string;
  venue_capacity: string;
  venue_surface: string;
}

interface Team {
  team_key: string;
  team_name: string;
  team_country: string;
  team_founded: string;
  team_badge: string | null;
  venue: Venue;
  players: Player[];
  coaches: Coach[];
}

export function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [activeTab, setActiveTab] = useState<'squad' | 'info'>('squad');
  const [debugResponse, setDebugResponse] = useState<any>(null);

  // Helper function to handle empty image URLs
  const getImageSrc = (url: string | null | undefined): string | null => {
    if (!url || url === '') {
      return null;
    }
    return url;
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/teams');
        
        if (!response.ok) {
          // For error responses, we need to read the JSON only once
          const errorData = await response.json();
          throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        }
        
        // For successful responses, read the JSON
        const data = await response.json();
        
        // Store the raw response for debugging
        setDebugResponse(data);
        
        // Check if the response is an error message from the API
        if (data && data.error) {
          throw new Error(data.message || data.error);
        }
        
        // Check if the response is an array of teams
        if (Array.isArray(data)) {
          if (data.length > 0) {
            setTeams(data);
            setSelectedTeam(data[0]);
          } else {
            // If no teams found, show an error
            setError('No teams found in the API response.');
          }
        } else {
          // If it's not an array, it might be a single team or another format
          throw new Error('Unexpected API response format');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching teams:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Render squad content
  const renderSquadContent = () => {
    if (!selectedTeam || !selectedTeam.players) {
      return <div className="text-center py-4">{t('No player data available')}</div>;
    }

    return (
      <div>
        {['Goalkeepers', 'Defenders', 'Midfielders', 'Forwards'].map(position => {
          const positionPlayers = selectedTeam.players.filter(
            player => player.player_type === position
          );
          
          if (positionPlayers.length === 0) return null;
          
          return (
            <div key={position} className="mb-8">
              <h3 className="text-lg font-semibold mb-4">{t(position)}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {positionPlayers.map(player => (
                  <div 
                    key={player.player_key} 
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={getImageSrc(player.player_image) || '/placeholder-player.svg'} 
                        alt={player.player_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">
                        {player.player_name} 
                        <span className="ml-1 text-gray-500">#{player.player_number}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {t('Age')}: {player.player_age} • 
                        {player.player_rating && (
                          <span className="ml-1">
                            {t('Rating')}: {player.player_rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render stadium info content
  const renderStadiumContent = () => {
    if (!selectedTeam || !selectedTeam.venue) {
      return <div className="text-center py-4">{t('No stadium data available')}</div>;
    }

    const venue = selectedTeam.venue;

    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">{venue.venue_name || t('Stadium name not available')}</h3>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">{t('Location')}: {venue.venue_city || t('Not available')}</p>
            {venue.venue_address && (
              <p className="text-gray-600">{t('Address')}: {venue.venue_address}</p>
            )}
          </div>
          <div>
            <p className="text-gray-600">{t('Capacity')}: {venue.venue_capacity || t('Not available')}</p>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">{t('Error')}: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        
        {/* Debug information */}
        {debugResponse && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">API Response Debug:</h3>
            <pre className="text-xs overflow-auto max-h-[300px] p-2 bg-gray-100 rounded">
              {JSON.stringify(debugResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">{t('Note')}: </strong>
          <span className="block sm:inline">{t('No Romanian football teams were found in the API response. This could be due to API limitations or incorrect configuration.')}</span>
        </div>
        
        {/* Debug information */}
        {debugResponse && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">API Response Debug:</h3>
            <pre className="text-xs overflow-auto max-h-[300px] p-2 bg-gray-100 rounded">
              {JSON.stringify(debugResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Team List Sidebar */}
      <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="font-semibold text-lg">{t('Teams')}</h3>
        </div>
        <div className="overflow-y-auto max-h-[600px]">
          {teams.map((team) => (
            <button
              key={team.team_key}
              className={`w-full text-left p-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                selectedTeam?.team_key === team.team_key ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedTeam(team)}
            >
              <img 
                src={getImageSrc(team.team_badge) || '/placeholder-team.svg'} 
                alt={team.team_name} 
                className="w-8 h-8 object-contain"
              />
              <span>{team.team_name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Team Details */}
      <div className="lg:col-span-3">
        {selectedTeam && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Team Header */}
            <div className="p-6 bg-gray-50 border-b flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <img 
                src={getImageSrc(selectedTeam.team_badge) || '/placeholder-team.svg'} 
                alt={selectedTeam.team_name} 
                className="w-24 h-24 object-contain"
              />
              <div>
                <h2 className="text-2xl font-bold">{selectedTeam.team_name}</h2>
                <p className="text-gray-600">{selectedTeam.team_country} • {t('Founded')}: {selectedTeam.team_founded}</p>
                {selectedTeam.coaches && selectedTeam.coaches.length > 0 && selectedTeam.coaches[0] && (
                  <p className="text-gray-600 mt-1">
                    {t('Coach')}: {selectedTeam.coaches[0].coach_name}
                  </p>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('squad')}
                  className={`
                    whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm
                    ${activeTab === 'squad'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {t('Squad')}
                </button>
                <button
                  onClick={() => setActiveTab('info')}
                  className={`
                    whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm
                    ${activeTab === 'info'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {t('Stadium Info')}
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'squad' ? renderSquadContent() : renderStadiumContent()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 