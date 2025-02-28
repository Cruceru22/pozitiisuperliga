import { NextResponse } from 'next/server';
import { api } from '~/utils/api';
import { trackServerEvent } from '~/utils/server-analytics';
import { v4 as uuidv4 } from 'uuid';

// Add caching configuration using export const dynamic
export const dynamic = 'force-dynamic';
// Remove the revalidate export and use next.revalidate in fetch options

// Helper function to get or generate a distinct ID for the user
function getDistinctId(): string {
  // In a real app, you would extract this from cookies, headers, or auth
  // For now, we'll generate a random ID for each request
  return uuidv4();
}

export async function GET(request: Request) {
  const distinctId = getDistinctId();
  const startTime = Date.now();
  
  try {
    const { searchParams } = new URL(request.url);
    const leagueId = searchParams.get('league_id');
    
    if (!leagueId) {
      // Track API error
      await trackServerEvent('api_error', distinctId, {
        endpoint: '/api/teams',
        error: 'League ID is required',
        status: 400
      });
      
      return NextResponse.json(
        { error: 'League ID is required' },
        { status: 400 }
      );
    }
    
    const teams = await api.getTeams(leagueId);
    
    if (!teams || teams.length === 0) {
      // Track empty response
      await trackServerEvent('api_empty_response', distinctId, {
        endpoint: '/api/teams',
        league_id: leagueId,
        status: 404
      });
      
      return NextResponse.json(
        { message: 'No teams found for this league' },
        { status: 404 }
      );
    }
    
    // Track successful API call
    await trackServerEvent('api_teams_success', distinctId, {
      endpoint: '/api/teams',
      league_id: leagueId,
      teams_count: teams.length,
      response_time_ms: Date.now() - startTime
    });
    
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    
    // Track API error
    await trackServerEvent('api_error', distinctId, {
      endpoint: '/api/teams',
      error: error instanceof Error ? error.message : String(error),
      status: 500
    });
    
    return NextResponse.json(
      { error: 'Failed to fetch teams data' },
      { status: 500 }
    );
  }
} 