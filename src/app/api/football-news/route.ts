import { NextResponse } from 'next/server';
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

export async function GET() {
  const distinctId = getDistinctId();
  const startTime = Date.now();
  
  try {
    // API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_NEWSAPI_KEY;
    
    if (!apiKey) {
      const error = 'News API key is not configured';
      
      // Track API error
      await trackServerEvent('api_error', distinctId, {
        endpoint: '/api/football-news',
        error,
        status: 500
      });
      
      throw new Error(error);
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
      next: { revalidate: parseInt(process.env.REVALIDATE_NEWS ?? '1800', 10) } // Cache based on env or default to 30 minutes
    });
    
    if (!response.ok) {
      const error = `NewsAPI responded with status: ${response.status}`;
      
      // Track API error
      await trackServerEvent('api_error', distinctId, {
        endpoint: '/api/football-news',
        error,
        status: response.status,
        statusText: response.statusText
      });
      
      throw new Error(error);
    }
    
    const data = await response.json() as Record<string, unknown>;
    
    // Track successful API call
    await trackServerEvent('api_news_success', distinctId, {
      endpoint: '/api/football-news',
      articles_count: Array.isArray(data.articles) ? data.articles.length : 0,
      response_time_ms: Date.now() - startTime
    });
    
    // Return the response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching football news:', error);
    
    // Track API error
    await trackServerEvent('api_error', distinctId, {
      endpoint: '/api/football-news',
      error: error instanceof Error ? error.message : String(error),
      status: 500
    });
    
    return NextResponse.json(
      { error: 'Failed to fetch football news', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 