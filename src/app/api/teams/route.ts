import { NextResponse } from 'next/server';

// Add caching configuration using export const dynamic
export const dynamic = 'force-dynamic';
// Remove the revalidate export and use next.revalidate in fetch options

export async function GET() {
  try {
    // Use the API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_APIFOOTBALL_KEY;
    
    if (!apiKey) {
      throw new Error('API key is not configured');
    }
    
    // Romanian Liga 1 league ID
    const leagueId = '272'; // Liga 1 Romania
    
    // Build the URL for the API request
    const url = `https://apiv3.apifootball.com/?action=get_teams&league_id=${leagueId}&APIkey=${apiKey}`;
    
    // Fetch team data with cache configuration
    const response = await fetch(url, { 
      next: { revalidate: parseInt(process.env.REVALIDATE_TEAMS ?? '3600', 10) } // Cache based on env or default to 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`APIFootball responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if the response is an error message from the API
    if (typeof data === 'object' && !Array.isArray(data) && 'error' in data) {
      const errorData = data as Record<string, unknown>;
      return NextResponse.json(
        { 
          error: 'API Error', 
          message: typeof errorData.message === 'string' ? errorData.message : JSON.stringify(errorData) 
        },
        { status: 400 }
      );
    }
    
    if (Array.isArray(data) && data.length > 0) {
      // Return all teams from the API
      return NextResponse.json(data);
    }
    
    // If we couldn't get any teams from the API, use fallback data
    const fallbackTeams = [
      {
        team_key: '1',
        team_name: 'FCSB',
        team_country: 'Romania',
        team_founded: '1947',
        team_badge: 'https://apiv3.apifootball.com/badges/2615_fcsb.jpg',
        venue: {
          venue_name: 'Arena Națională',
          venue_address: 'Bulevardul Basarabia 37-39',
          venue_city: 'București',
          venue_capacity: '55,634',
          venue_surface: 'Grass'
        },
        players: [
          {
            player_key: '1',
            player_id: '1',
            player_image: 'https://apiv3.apifootball.com/badges/players/68050_f-nita.jpg',
            player_name: 'Florin Niță',
            player_number: '1',
            player_country: 'Romania',
            player_type: 'Goalkeepers',
            player_age: '35',
            player_match_played: '30',
            player_goals: '0',
            player_yellow_cards: '2',
            player_red_cards: '0',
            player_injured: 'No',
            player_rating: '7.2'
          },
          {
            player_key: '2',
            player_id: '2',
            player_image: 'https://apiv3.apifootball.com/badges/players/68051_d-coman.jpg',
            player_name: 'Darius Olaru',
            player_number: '10',
            player_country: 'Romania',
            player_type: 'Midfielders',
            player_age: '25',
            player_match_played: '32',
            player_goals: '12',
            player_yellow_cards: '5',
            player_red_cards: '0',
            player_injured: 'No',
            player_rating: '7.8'
          },
          {
            player_key: '3',
            player_id: '3',
            player_image: 'https://apiv3.apifootball.com/badges/players/68052_f-coman.jpg',
            player_name: 'Florinel Coman',
            player_number: '7',
            player_country: 'Romania',
            player_type: 'Forwards',
            player_age: '26',
            player_match_played: '31',
            player_goals: '15',
            player_yellow_cards: '4',
            player_red_cards: '0',
            player_injured: 'No',
            player_rating: '8.1'
          }
        ],
        coaches: [
          {
            coach_name: 'Elias Charalambous',
            coach_country: 'Cyprus',
            coach_age: '43'
          }
        ]
      },
      {
        team_key: '2',
        team_name: 'CFR Cluj',
        team_country: 'Romania',
        team_founded: '1907',
        team_badge: 'https://apiv3.apifootball.com/badges/2596_cfr-cluj.jpg',
        venue: {
          venue_name: 'Stadionul Dr. Constantin Rădulescu',
          venue_address: 'Strada Romulus Vuia 23',
          venue_city: 'Cluj-Napoca',
          venue_capacity: '23,500',
          venue_surface: 'Grass'
        },
        players: [
          {
            player_key: '4',
            player_id: '4',
            player_image: 'https://apiv3.apifootball.com/badges/players/68053_o-hoban.jpg',
            player_name: 'Ovidiu Hoban',
            player_number: '5',
            player_country: 'Romania',
            player_type: 'Midfielders',
            player_age: '40',
            player_match_played: '25',
            player_goals: '1',
            player_yellow_cards: '6',
            player_red_cards: '0',
            player_injured: 'No',
            player_rating: '7.0'
          }
        ],
        coaches: [
          {
            coach_name: 'Dan Petrescu',
            coach_country: 'Romania',
            coach_age: '56'
          }
        ]
      },
      {
        team_key: '3',
        team_name: 'Universitatea Craiova',
        team_country: 'Romania',
        team_founded: '1948',
        team_badge: 'https://apiv3.apifootball.com/badges/2599_universitatea-craiova.jpg',
        venue: {
          venue_name: 'Stadionul Ion Oblemenco',
          venue_address: 'Strada Sfântul Dumitru 1',
          venue_city: 'Craiova',
          venue_capacity: '30,983',
          venue_surface: 'Grass'
        },
        players: [],
        coaches: [
          {
            coach_name: 'Costel Gâlcă',
            coach_country: 'Romania',
            coach_age: '52'
          }
        ]
      },
      {
        team_key: '4',
        team_name: 'Rapid București',
        team_country: 'Romania',
        team_founded: '1923',
        team_badge: 'https://apiv3.apifootball.com/badges/2601_rapid-bucuresti.jpg',
        venue: {
          venue_name: 'Stadionul Rapid-Giulești',
          venue_address: 'Calea Giulești',
          venue_city: 'București',
          venue_capacity: '14,047',
          venue_surface: 'Grass'
        },
        players: [],
        coaches: [
          {
            coach_name: 'Neil Lennon',
            coach_country: 'Northern Ireland',
            coach_age: '52'
          }
        ]
      },
      {
        team_key: '5',
        team_name: 'Dinamo București',
        team_country: 'Romania',
        team_founded: '1948',
        team_badge: 'https://apiv3.apifootball.com/badges/2597_dinamo-bucuresti.jpg',
        venue: {
          venue_name: 'Stadionul Dinamo',
          venue_address: 'Șoseaua Ștefan cel Mare 7-9',
          venue_city: 'București',
          venue_capacity: '15,032',
          venue_surface: 'Grass'
        },
        players: [],
        coaches: [
          {
            coach_name: 'Zeljko Kopic',
            coach_country: 'Croatia',
            coach_age: '46'
          }
        ]
      }
    ];
    
    return NextResponse.json(fallbackTeams);
  } catch (error) {
    console.error('Error fetching team data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team data', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 