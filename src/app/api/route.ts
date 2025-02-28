import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { trackServerEvent } from '~/utils/server-analytics';
import { v4 as uuidv4 } from 'uuid';

const API_KEY = process.env.NEXT_PUBLIC_APIFOOTBALL_KEY;
const API_BASE_URL = 'https://apiv3.apifootball.com/';

// Helper function to get or generate a distinct ID for the user
function getDistinctId(): string {
  // In a real app, you would extract this from cookies, headers, or auth
  // For now, we'll generate a random ID for each request
  return uuidv4();
}

async function fetchFromApi(params: Record<string, string>, tag: string) {
  if (!API_KEY) {
    throw new Error('API key is not configured');
  }

  const searchParams = new URLSearchParams({
    ...params,
    APIkey: API_KEY,
  });

  const response = await fetch(`${API_BASE_URL}?${searchParams.toString()}`, {
    next: {
      tags: [tag],
      // Cache for 5 minutes by default
      revalidate: 300
    }
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  const data = await response.json() as unknown;
  
  // Ensure we always return an array
  if (data && typeof data === 'object') {
    if (Array.isArray(data)) {
      return data;
    } else if (Object.keys(data as Record<string, unknown>).length === 0) {
      return [];
    } else if ('error' in (data as Record<string, unknown>)) {
      throw new Error(String((data as Record<string, unknown>).error));
    } else {
      // If it's an object with numeric keys, convert to array
      const values = Object.values(data as Record<string, unknown>);
      if (values.length > 0) {
        return values;
      }
    }
  }
  
  return [];
}

export async function GET(request: Request) {
  const distinctId = getDistinctId();
  const startTime = Date.now();
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  if (!action) {
    await trackServerEvent('api_error', distinctId, {
      endpoint: '/api',
      error: 'Missing action parameter',
      status: 400
    });
    
    return NextResponse.json({ error: 'Missing action parameter' }, { status: 400 });
  }

  try {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    // Different cache tags for different types of data
    let tag = '';

    switch (action) {
      case 'get_events':
        tag = 'events';
        // Live matches should revalidate more frequently
        if (params.match_live === '1') {
          tag = 'live-matches';
        }
        break;
      case 'get_standings':
        tag = `standings-${params.league_id ?? 'all'}`;
        break;
      case 'get_teams':
        tag = `teams-${params.league_id ?? 'all'}`;
        break;
      case 'get_leagues':
        tag = 'leagues';
        break;
      case 'get_topscorers':
        tag = `topscorers-${params.league_id ?? 'all'}`;
        break;
      default:
        tag = 'default';
    }

    const data = await fetchFromApi(params, tag);
    
    // Track successful API call
    await trackServerEvent('api_success', distinctId, {
      endpoint: '/api',
      action,
      league_id: params.league_id || 'none',
      items_count: Array.isArray(data) ? data.length : 0,
      response_time_ms: Date.now() - startTime
    });
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    
    // Track API error
    await trackServerEvent('api_error', distinctId, {
      endpoint: '/api',
      action: searchParams.get('action') || 'unknown',
      error: error instanceof Error ? error.message : String(error),
      status: 500
    });
    
    return NextResponse.json(
      { error: 'Failed to fetch data', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Revalidation endpoint
export async function POST(request: Request) {
  const distinctId = getDistinctId();
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');

  if (!tag) {
    await trackServerEvent('api_revalidation_error', distinctId, {
      endpoint: '/api',
      error: 'Missing tag parameter',
      status: 400
    });
    
    return NextResponse.json({ error: 'Missing tag parameter' }, { status: 400 });
  }

  try {
    revalidateTag(tag);
    
    // Track successful revalidation
    await trackServerEvent('api_revalidation_success', distinctId, {
      endpoint: '/api',
      tag,
      timestamp: Date.now()
    });
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    // Track revalidation error
    await trackServerEvent('api_revalidation_error', distinctId, {
      endpoint: '/api',
      tag,
      error: error instanceof Error ? error.message : String(error),
      status: 500
    });
    
    return NextResponse.json(
      { error: 'Failed to revalidate', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 