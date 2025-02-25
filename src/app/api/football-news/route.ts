import { NextResponse } from 'next/server';

// Add caching configuration
export const revalidate = 1800; // Revalidate every 30 minutes

export async function GET() {
  try {
    // API key
    const apiKey = 'ef6c9168e80943a288d7a17d4215108d';
    
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
      next: { revalidate: 1800 } // Cache for 30 minutes
    });
    
    if (!response.ok) {
      throw new Error(`NewsAPI responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
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