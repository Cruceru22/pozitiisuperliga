import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { trackServerEvent } from '~/utils/server-analytics';
import { v4 as uuidv4 } from 'uuid';

// Helper function to get or generate a distinct ID for the user
function getDistinctId(): string {
  return uuidv4();
}

export async function POST(request: Request) {
  const distinctId = getDistinctId();
  
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const secret = searchParams.get('secret');
    
    // Check for valid secret to prevent unauthorized revalidations
    if (secret !== process.env.REVALIDATION_SECRET) {
      await trackServerEvent('revalidation_unauthorized', distinctId, {
        endpoint: '/api/revalidate',
        error: 'Invalid secret'
      });
      
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }
    
    if (!tag) {
      await trackServerEvent('revalidation_error', distinctId, {
        endpoint: '/api/revalidate',
        error: 'Missing tag parameter'
      });
      
      return NextResponse.json({ error: 'Missing tag parameter' }, { status: 400 });
    }
    
    // Revalidate the specific tag
    revalidateTag(tag);
    
    // Track successful revalidation
    await trackServerEvent('revalidation_success', distinctId, {
      endpoint: '/api/revalidate',
      tag,
      timestamp: Date.now()
    });
    
    return NextResponse.json({ 
      revalidated: true, 
      tag, 
      now: Date.now(),
      message: `Cache for tag "${tag}" has been successfully revalidated.`
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    
    // Track revalidation error
    await trackServerEvent('revalidation_error', distinctId, {
      endpoint: '/api/revalidate',
      error: error instanceof Error ? error.message : String(error)
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to revalidate', 
        message: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}

// Also support GET requests for easier testing in the browser
export async function GET(request: Request) {
  return POST(request);
} 