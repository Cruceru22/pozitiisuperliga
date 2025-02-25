import type { League, Standing, Team, Match } from '~/types/api';

export const ROMANIAN_LEAGUES = [
  { id: '272', name: 'Liga I' },
  { id: '271', name: 'Liga II' },
  { id: '270', name: 'Liga III' },
] as const;

export const ROMANIAN_LEAGUE_IDS = ROMANIAN_LEAGUES.map(league => league.id);

const API_KEY = '54e4a9cc1605438a9fafca07954ad3a30f619e80952c02ce83cf2d4481934362';
const API_BASE_URL = 'https://apiv3.apifootball.com/';

async function fetchApi<T>(params: Record<string, string> = {}): Promise<T> {
  const searchParams = new URLSearchParams(params);
  const response = await fetch(`/api?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
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
    return fetchApi<any[]>({
      action: 'get_topscorers',
      league_id: leagueId
    });
  },

  revalidate: async (tag: string) => {
    const response = await fetch(`/api?tag=${tag}`, { method: 'POST' });
    return response.json();
  }
}; 