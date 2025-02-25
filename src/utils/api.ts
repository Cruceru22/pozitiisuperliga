import type { League, Standing, Team, Match } from '~/types/api';

export const ROMANIAN_LEAGUES = [
  { id: '272', name: 'Liga I' },
  { id: '271', name: 'Liga II' },
  { id: '270', name: 'Liga III' },
] as const;

export const ROMANIAN_LEAGUE_IDS = ROMANIAN_LEAGUES.map(league => league.id);

// API base URL is now only used in the server-side API route
// We don't need these variables anymore as we're using environment variables in the API route
// const API_KEY = process.env.NEXT_PUBLIC_APIFOOTBALL_KEY;
// const API_BASE_URL = 'https://apiv3.apifootball.com/';

async function fetchApi<T>(params: Record<string, string> = {}): Promise<T> {
  const searchParams = new URLSearchParams(params);
  const response = await fetch(`/api?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getLeagues: () => {
    return fetchApi<League[]>({ action: 'get_leagues' });
  },

  getStandings: (leagueId: string) => {
    return fetchApi<Standing[]>({ 
      action: 'get_standings',
      league_id: leagueId 
    });
  },

  getTeams: (leagueId: string) => {
    return fetchApi<Team[]>({ 
      action: 'get_teams',
      league_id: leagueId
    });
  },

  getEvents: (params: {
    from?: string;
    to?: string;
    league_id?: string;
    match_live?: string;
  }) => {
    return fetchApi<Match[]>({
      action: 'get_events',
      ...params
    });
  },

  getTopScorers: (leagueId: string) => {
    // Define a proper type for top scorers
    type TopScorer = {
      player_name: string;
      player_key: string;
      team_name: string;
      goals: string;
      assists: string;
      penalty_goals: string;
    };
    
    return fetchApi<TopScorer[]>({
      action: 'get_topscorers',
      league_id: leagueId
    });
  },

  revalidate: async (tag: string) => {
    const response = await fetch(`/api?tag=${tag}`, { method: 'POST' });
    return response.json() as Promise<{ revalidated: boolean; now: number }>;
  }
}; 