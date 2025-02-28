'use client';

import { useState, useEffect, useRef } from 'react';
import type { Team } from '~/types/api';
import { ROMANIAN_LEAGUES } from '~/utils/api';
import { AlertCircle, MapPin, Users, Building, Info, Shirt, User, Calendar, Flag, ChevronRight } from 'lucide-react';
import { trackEvent } from '~/utils/analytics';

// Helper function to handle empty image URLs
const getImageSrc = (url: string | null | undefined): string | null => {
  if (!url || url === '') {
    return null;
  }
  return url;
};

export default function TeamsClient() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [activeTab, setActiveTab] = useState<'squad' | 'info'>('squad');
  const [error, setError] = useState<string | null>(null);
  const teamDetailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchTeams() {
      try {
        // Use the first Romanian league ID (Liga I)
        const leagueId = ROMANIAN_LEAGUES[0].id;
        const response = await fetch(`/api/teams?league_id=${leagueId}`);
        
        if (!response.ok) {
          throw new Error(`Eroare la încărcarea echipelor: ${response.status}`);
        }
        
        const data = await response.json();
        setTeams(data);
        
        // Don't automatically select the first team
        // This prevents automatic scrolling when the page loads
        
        setError(null);
        
        // Track successful teams load
        trackEvent('teams_loaded', { 
          league_id: leagueId,
          teams_count: data.length
        });
      } catch (err) {
        console.error('Eroare la încărcarea echipelor:', err);
        setError('Nu s-au putut încărca echipele. Vă rugăm să încercați din nou mai târziu.');
        
        // Track error
        trackEvent('teams_load_error', { 
          error: err instanceof Error ? err.message : String(err)
        });
      }
    }

    fetchTeams();
  }, []);

  // Scroll to team details when a team is selected
  useEffect(() => {
    if (selectedTeam && teamDetailsRef.current) {
      // On mobile, scroll to the team details
      if (window.innerWidth < 1024) {
        teamDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedTeam]);

  // Handle team selection
  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    
    // Track team selection
    trackEvent('team_selected', {
      team_name: team.team_name,
      team_id: team.team_key
    });
    
    // On mobile, scroll to the team details
    if (window.innerWidth < 1024 && teamDetailsRef.current) {
      setTimeout(() => {
        teamDetailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  // Handle tab change
  const handleTabChange = (tab: 'squad' | 'info') => {
    setActiveTab(tab);
    
    // Track tab change
    trackEvent('team_tab_changed', {
      tab,
      team_name: selectedTeam?.team_name,
      team_id: selectedTeam?.team_key
    });
  };

  // Render squad content
  const renderSquadContent = () => {
    if (!selectedTeam || !selectedTeam.players) {
      return <div className="text-center py-4 flex items-center justify-center"><Info className="w-5 h-5 mr-2" />Nu există date despre jucători</div>;
    }

    const positionTranslations = {
      'Goalkeepers': 'Portari',
      'Defenders': 'Fundași',
      'Midfielders': 'Mijlocași',
      'Forwards': 'Atacanți'
    };

    const positionColors = {
      'Goalkeepers': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Defenders': 'bg-blue-100 text-blue-800 border-blue-300',
      'Midfielders': 'bg-green-100 text-green-800 border-green-300',
      'Forwards': 'bg-red-100 text-red-800 border-red-300'
    };

    return (
      <div>
        {['Goalkeepers', 'Defenders', 'Midfielders', 'Forwards'].map(position => {
          const positionPlayers = selectedTeam.players.filter(
            player => player.player_type === position
          );
          
          if (positionPlayers.length === 0) return null;
          
          return (
            <div key={position} className="mb-8">
              <div className={`inline-flex items-center px-4 py-2 rounded-full mb-4 ${positionColors[position as keyof typeof positionColors]}`}>
                <Shirt className="w-4 h-4 mr-2" />
                <h3 className="text-lg font-semibold">{positionTranslations[position as keyof typeof positionTranslations]}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {positionPlayers.map(player => (
                  <div 
                    key={player.player_key.toString()} 
                    className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0 border-2 border-green-500">
                      <img 
                        src={getImageSrc(player.player_image) || '/placeholder-player.svg'} 
                        alt={player.player_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-800">
                        {player.player_name}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span className="inline-flex items-center bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium mr-2">
                          #{player.player_number}
                        </span>
                        <User className="w-3 h-3 mr-1" />
                        <span className="mr-2">{player.player_age} ani</span>
                        {player.player_rating && (
                          <span className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                            Notă: {player.player_rating}
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
      return <div className="text-center py-4 flex items-center justify-center"><Info className="w-5 h-5 mr-2" />Nu există date despre stadion</div>;
    }

    const venue = selectedTeam.venue;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <Building className="w-8 h-8 text-green-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-800">{venue.venue_name || 'Nume stadion indisponibil'}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start bg-gray-50 p-4 rounded-lg">
              <MapPin className="w-5 h-5 mr-3 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Locație</h4>
                <p className="text-gray-600">{venue.venue_city || 'Indisponibil'}</p>
                {venue.venue_address && (
                  <p className="text-gray-600 mt-1">{venue.venue_address}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-start bg-gray-50 p-4 rounded-lg">
              <Users className="w-5 h-5 mr-3 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Capacitate</h4>
                <p className="text-gray-600">{venue.venue_capacity ? `${venue.venue_capacity} spectatori` : 'Indisponibil'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-green-200 via-green-300 to-green-200 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center">
              <Building className="w-16 h-16 text-green-800 mx-auto mb-2" />
              <p className="text-green-800 font-medium">Stadion {venue.venue_name}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4 flex items-start" role="alert">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Eroare: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (teams.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Team List Sidebar */}
      <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-4 bg-gradient-to-r from-green-700 to-green-800 text-white">
          <h3 className="font-semibold text-lg flex items-center">
            <Flag className="w-5 h-5 mr-2" />
            Echipe
          </h3>
          <p className="text-xs text-green-100 mt-1 lg:hidden">Selectați o echipă pentru a vedea detalii</p>
        </div>
        <div className="overflow-y-auto max-h-[600px]">
          {teams.map((team) => (
            <button
              key={team.team_key}
              className={`w-full text-left p-3 flex items-center hover:bg-gray-50 transition-colors border-b border-gray-100 group ${
                selectedTeam?.team_key === team.team_key ? 'bg-green-50 border-l-4 border-green-500 pl-2' : ''
              }`}
              onClick={() => handleTeamSelect(team)}
            >
              <img 
                src={getImageSrc(team.team_badge) || '/placeholder-team.svg'} 
                alt={team.team_name} 
                className="w-8 h-8 object-contain mr-3"
              />
              <span className={`flex-1 ${selectedTeam?.team_key === team.team_key ? 'font-medium text-green-800' : ''}`}>
                {team.team_name}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity lg:hidden" />
            </button>
          ))}
        </div>
      </div>

      {/* Team Details */}
      <div ref={teamDetailsRef} className="lg:col-span-3 scroll-mt-4">
        {selectedTeam ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            {/* Team Header */}
            <div className="p-6 bg-gradient-to-r from-green-700 to-green-800 text-white border-b flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 bg-white rounded-full p-2 flex items-center justify-center">
                <img 
                  src={getImageSrc(selectedTeam.team_badge) || '/placeholder-team.svg'} 
                  alt={selectedTeam.team_name} 
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{selectedTeam.team_name}</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                  <div className="inline-flex items-center bg-green-600/30 px-2 py-1 rounded text-sm">
                    <Flag className="w-4 h-4 mr-1" />
                    {selectedTeam.team_country}
                  </div>
                  <div className="inline-flex items-center bg-green-600/30 px-2 py-1 rounded text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    Fondat: {selectedTeam.team_founded}
                  </div>
                  {selectedTeam.coaches && selectedTeam.coaches.length > 0 && selectedTeam.coaches[0] && (
                    <div className="inline-flex items-center bg-green-600/30 px-2 py-1 rounded text-sm">
                      <User className="w-4 h-4 mr-1" />
                      Antrenor: {selectedTeam.coaches[0].coach_name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                <button
                  onClick={() => handleTabChange('squad')}
                  className={`
                    whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center
                    ${activeTab === 'squad'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Lot
                </button>
                <button
                  onClick={() => handleTabChange('info')}
                  className={`
                    whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center
                    ${activeTab === 'info'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Building className="w-4 h-4 mr-2" />
                  Informații Stadion
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'squad' ? renderSquadContent() : renderStadiumContent()}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-8 text-center">
            <div className="flex flex-col items-center justify-center py-12">
              <Flag className="w-16 h-16 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Selectați o echipă</h3>
              <p className="text-gray-600 max-w-md">
                Alegeți o echipă din lista din stânga pentru a vedea informații detaliate despre lot și stadion.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 