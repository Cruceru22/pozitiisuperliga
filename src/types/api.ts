export interface Country {
  country_id: string;
  country_name: string;
  country_logo: string;
}

export interface League {
  country_id: string;
  country_name: string;
  league_id: string;
  league_name: string;
  league_season: string;
  league_logo: string;
  country_logo: string;
}

export interface Team {
  team_key: string;
  team_name: string;
  team_country: string;
  team_founded: string;
  team_badge: string;
  venue: {
    venue_name: string;
    venue_address: string;
    venue_city: string;
    venue_capacity: string;
    venue_surface: string;
  };
  players: Player[];
  coaches: Coach[];
}

export interface Player {
  player_key: number;
  player_id: string;
  player_image: string;
  player_name: string;
  player_number: string;
  player_country: string;
  player_type: string;
  player_age: string;
  player_match_played: string;
  player_goals: string;
  player_yellow_cards: string;
  player_red_cards: string;
  player_injured: string;
  player_substitute_out: string;
  player_substitutes_on_bench: string;
  player_assists: string;
  player_birthdate: string;
  player_is_captain: string;
  player_rating: string;
}

export interface Coach {
  coach_name: string;
  coach_country: string;
  coach_age: string;
}

export interface Standing {
  country_name: string;
  league_id: string;
  league_name: string;
  team_id: string;
  team_name: string;
  overall_league_position: string;
  overall_league_payed: string;
  overall_league_W: string;
  overall_league_D: string;
  overall_league_L: string;
  overall_league_GF: string;
  overall_league_GA: string;
  overall_league_PTS: string;
  home_league_position: string;
  home_league_payed: string;
  home_league_W: string;
  home_league_D: string;
  home_league_L: string;
  home_league_GF: string;
  home_league_GA: string;
  home_league_PTS: string;
  away_league_position: string;
  away_league_payed: string;
  away_league_W: string;
  away_league_D: string;
  away_league_L: string;
  away_league_GF: string;
  away_league_GA: string;
  away_league_PTS: string;
  league_round?: string;
  team_badge?: string;
}

export interface Match {
  match_id: string;
  country_id: string;
  country_name: string;
  league_id: string;
  league_name: string;
  match_date: string;
  match_status: string;
  match_time: string;
  match_hometeam_id: string;
  match_hometeam_name: string;
  match_hometeam_score: string;
  match_awayteam_name: string;
  match_awayteam_id: string;
  match_awayteam_score: string;
  team_home_badge: string;
  team_away_badge: string;
  league_logo: string;
  country_logo: string;
} 