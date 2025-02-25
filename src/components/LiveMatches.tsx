import { useEffect, useState } from 'react';
import { api, ROMANIAN_LEAGUE_IDS } from '~/utils/api';
import type { Match } from '~/types/api';

export function LiveMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        setLoading(true);
        const today = new Date().toISOString().split('T')[0];
        
        const response = await api.getEvents({
          from: today,
          to: today,
          match_live: '1',
          league_id: ROMANIAN_LEAGUE_IDS.join(',')
        });
        
        // Handle both array and object responses
        const matchesData = Array.isArray(response) ? response : [];
        setMatches(matchesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch live matches');
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMatches();
    // Refresh every minute
    const interval = setInterval(fetchLiveMatches, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-center">Loading live matches...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (matches.length === 0) {
    return <div className="text-center text-gray-500">No live matches at the moment</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {matches.map((match) => (
        <div
          key={match.match_id}
          className="rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="text-sm text-gray-500 mb-2">
            {match.league_name} - {match.match_status}'
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {match.team_home_badge && (
                <img
                  src={match.team_home_badge}
                  alt={match.match_hometeam_name}
                  className="w-6 h-6 object-contain"
                />
              )}
              <span className="font-medium">{match.match_hometeam_name}</span>
            </div>
            <span className="text-xl font-bold">{match.match_hometeam_score}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {match.team_away_badge && (
                <img
                  src={match.team_away_badge}
                  alt={match.match_awayteam_name}
                  className="w-6 h-6 object-contain"
                />
              )}
              <span className="font-medium">{match.match_awayteam_name}</span>
            </div>
            <span className="text-xl font-bold">{match.match_awayteam_score}</span>
          </div>
        </div>
      ))}
    </div>
  );
} 