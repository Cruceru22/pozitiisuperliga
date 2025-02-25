export const translations = {
  // Layout and navigation
  'Romanian Football Stats': 'Statistici Fotbal Românesc',
  'Live scores, standings, and stats for Romanian football leagues': 'Scoruri live, clasamente și poziții SuperLiga pentru fotbalul românesc',
  
  // Tabs
  'Standings': 'Clasamente',
  'Teams': 'Echipe',
  'Top Scorers': 'Golgheteri',
  'Football News': 'Știri Fotbal',
  
  // Standings component
  'Loading standings...': 'Se încarcă clasamentele...',
  'Failed to fetch standings': 'Eroare la încărcarea clasamentelor',
  'No standings available for this competition': 'Nu există clasamente disponibile pentru această competiție',
  'Position': 'Poziție',
  'Team': 'Echipă',
  'MP': 'MJ', // Meciuri jucate
  'W': 'V',   // Victorii
  'D': 'E',   // Egaluri
  'L': 'Î',   // Înfrângeri
  'GF': 'GM', // Goluri marcate
  'GA': 'GP', // Goluri primite
  'PTS': 'PCT', // Puncte
  'Group': 'Seria', // Group/Series
  
  // Teams content
  'Teams content coming soon...': 'Conținutul despre echipe va fi disponibil în curând...',
  'No teams found.': 'Nu s-au găsit echipe.',
  'No Romanian football teams were found in the API response. This could be due to API limitations or incorrect configuration.': 'Nu s-au găsit echipe românești de fotbal în răspunsul API. Acest lucru ar putea fi din cauza limitărilor API sau a configurării incorecte.',
  'Note': 'Notă',
  'No player data available': 'Nu există date despre jucători',
  'No stadium data available': 'Nu există date despre stadion',
  'Squad': 'Lot',
  'Stadium Info': 'Informații Stadion',
  'Founded': 'Fondat',
  'Coach': 'Antrenor',
  'Goalkeepers': 'Portari',
  'Defenders': 'Fundași',
  'Midfielders': 'Mijlocași',
  'Forwards': 'Atacanți',
  'Age': 'Vârstă',
  'Rating': 'Notă',
  'Location': 'Locație',
  'Address': 'Adresă',
  'Capacity': 'Capacitate',
  'Surface': 'Suprafață',
  'Stadium image not available': 'Imaginea stadionului nu este disponibilă',
  
  // Top scorers content
  'Top scorers content coming soon...': 'Conținutul despre golgheteri va fi disponibil în curând...',
  
  // League names
  'Liga I': 'Liga I',
  'Liga II': 'Liga II',
  'Liga III': 'Liga III',
  'SuperLiga': 'SuperLiga',
  'Poziții SuperLiga': 'Poziții SuperLiga',
  'Clasament SuperLiga': 'Clasament SuperLiga',
  
  // News component
  'Read More': 'Citește mai mult',
  'No Image Available': 'Imagine indisponibilă',
  'Romanian Football News': 'Știri Fotbal Românesc',
  'Error': 'Eroare',
  'No news articles found about Romanian football.': 'Nu s-au găsit articole despre fotbalul românesc.',
  'Loading...': 'Se încarcă...',
};

export type TranslationKey = keyof typeof translations;

export function translate(key: string): string {
  return (translations as Record<string, string>)[key] || key;
}

// Shorthand function for translate
export const t = translate; 