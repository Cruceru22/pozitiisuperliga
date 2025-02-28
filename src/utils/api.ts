import type { League, Standing, Team, Match } from '~/types/api';

export const ROMANIAN_LEAGUES = [
  { id: '272', name: 'Liga I' },
  { id: '271', name: 'Liga II' },
  { id: '270', name: 'Liga III' },
] as const;

export const ROMANIAN_LEAGUE_IDS = ROMANIAN_LEAGUES.map(league => league.id);

// API base URL for direct server-side calls
const API_BASE_URL = 'https://apiv3.apifootball.com/';

// Client-side API calls through Next.js API routes
async function fetchApi<T>(params: Record<string, string> = {}): Promise<T> {
  const searchParams = new URLSearchParams(params);
  const response = await fetch(`/api?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

// Server-side direct API calls
async function fetchDirectApi<T>(params: Record<string, string> = {}, tag: string): Promise<T> {
  const apiKey = process.env.NEXT_PUBLIC_APIFOOTBALL_KEY;
  
  if (!apiKey) {
    throw new Error('API key is not configured');
  }
  
  const searchParams = new URLSearchParams({
    ...params,
    APIkey: apiKey,
  });
  
  const response = await fetch(`${API_BASE_URL}?${searchParams.toString()}`, {
    next: {
      tags: [tag],
      revalidate: getRevalidationTime(params.action, params.league_id)
    }
  });
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  
  const data = await response.json() as unknown;
  
  // Ensure we always return an array
  if (data && typeof data === 'object') {
    if (Array.isArray(data)) {
      return data as T;
    } else if (Object.keys(data as Record<string, unknown>).length === 0) {
      return [] as unknown as T;
    } else if ('error' in (data as Record<string, unknown>)) {
      throw new Error(String((data as Record<string, unknown>).error));
    } else {
      // If it's an object with numeric keys, convert to array
      const values = Object.values(data as Record<string, unknown>);
      if (values.length > 0) {
        return values as unknown as T;
      }
    }
  }
  
  return [] as unknown as T;
}

// Helper to determine revalidation time based on action type
function getRevalidationTime(action?: string, _leagueId?: string): number {
  switch (action) {
    case 'get_events':
      return 60; // 1 minute for events
    case 'get_standings':
      return parseInt(process.env.REVALIDATE_STANDINGS ?? '3600', 10);
    case 'get_teams':
      return parseInt(process.env.REVALIDATE_TEAMS ?? '3600', 10);
    case 'get_leagues':
      return 86400; // 24 hours for leagues
    case 'get_topscorers':
      return 3600; // 1 hour for top scorers
    default:
      return 300; // 5 minutes default
  }
}

// API methods for both client and server
export const api = {
  // Client-side methods (through API routes)
  getLeagues: () => {
    return fetchApi<League[]>({ action: 'get_leagues' });
  },

  getStandings: (leagueId: string) => {
    // For server components, use direct API call
    if (typeof window === 'undefined') {
      return api.server.getStandings(leagueId);
    }
    
    // For client components, use API route
    return fetchApi<Standing[]>({ 
      action: 'get_standings',
      league_id: leagueId 
    });
  },

  getTeams: (leagueId: string) => {
    // For server components, use direct API call
    if (typeof window === 'undefined') {
      return api.server.getTeams(leagueId);
    }
    
    // For client components, use API route
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
    // For server components, use direct API call
    if (typeof window === 'undefined') {
      return api.server.getEvents(params);
    }
    
    // For client components, use API route
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
    
    // For server components, use direct API call
    if (typeof window === 'undefined') {
      return api.server.getTopScorers(leagueId);
    }
    
    // For client components, use API route
    return fetchApi<TopScorer[]>({
      action: 'get_topscorers',
      league_id: leagueId
    });
  },

  revalidate: async (tag: string) => {
    const response = await fetch(`/api?tag=${tag}`, { method: 'POST' });
    return response.json() as Promise<{ revalidated: boolean; now: number }>;
  },
  
  // Server-side methods (direct API calls)
  server: {
    getLeagues: () => {
      return fetchDirectApi<League[]>({ action: 'get_leagues' }, 'leagues');
    },
    
    getStandings: (leagueId: string) => {
      return fetchDirectApi<Standing[]>(
        { action: 'get_standings', league_id: leagueId },
        `standings-${leagueId}`
      );
    },
    
    getTeams: (leagueId: string) => {
      return fetchDirectApi<Team[]>(
        { action: 'get_teams', league_id: leagueId },
        `teams-${leagueId}`
      );
    },
    
    getEvents: (params: {
      from?: string;
      to?: string;
      league_id?: string;
      match_live?: string;
    }) => {
      const tag = params.match_live === '1' ? 'live-matches' : 'events';
      return fetchDirectApi<Match[]>(
        { action: 'get_events', ...params },
        tag
      );
    },
    
    getTopScorers: (leagueId: string) => {
      type TopScorer = {
        player_name: string;
        player_key: string;
        team_name: string;
        goals: string;
        assists: string;
        penalty_goals: string;
      };
      
      return fetchDirectApi<TopScorer[]>(
        { action: 'get_topscorers', league_id: leagueId },
        `topscorers-${leagueId}`
      );
    },
    
    getFootballNews: async () => {
      interface NewsArticle {
        title: string;
        description: string;
        url: string;
        urlToImage: string | null;
        publishedAt: string;
        source: {
          name: string;
        };
      }
      
      interface NewsResponse {
        articles: NewsArticle[];
        status: string;
        totalResults: number;
      }
      
      try {
        // API key from environment variables
        const apiKey = process.env.NEXT_PUBLIC_NEWSAPI_KEY;
        
        if (!apiKey) {
          throw new Error('News API key is not configured');
        }
        
        // Build the URL with query parameters
        const url = new URL('https://newsapi.org/v2/everything');
        url.searchParams.append('q', 'SuperLiga');
        url.searchParams.append('language', 'ro');
        url.searchParams.append('sortBy', 'publishedAt');
        url.searchParams.append('pageSize', '20');
        
        // Fetch news about Romanian football with caching
        const response = await fetch(url.toString(), {
          headers: {
            'X-Api-Key': apiKey
          },
          next: { 
            revalidate: parseInt(process.env.REVALIDATE_NEWS ?? '1800', 10),
            tags: ['football-news']
          }
        });
        
        if (!response.ok) {
          throw new Error(`NewsAPI responded with status: ${response.status}`);
        }
        
        return await response.json() as NewsResponse;
      } catch (error) {
        console.error('Error fetching football news:', error);
        throw error;
      }
    }
  }
}; 