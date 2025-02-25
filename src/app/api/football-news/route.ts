import { NextResponse } from 'next/server';

// Add caching configuration using export const dynamic
export const dynamic = 'force-dynamic';
// Remove the revalidate export and use next.revalidate in fetch options

export async function GET() {
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
      next: { revalidate: parseInt(process.env.REVALIDATE_NEWS ?? '1800', 10) } // Cache based on env or default to 30 minutes
    });
    
    if (!response.ok) {
      throw new Error(`NewsAPI responded with status: ${response.status}`);
    }
    
    const data = await response.json() as Record<string, unknown>;
    
    // Return the response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching football news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch football news', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 