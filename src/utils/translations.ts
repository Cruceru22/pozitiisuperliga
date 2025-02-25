// Define the available languages
export const LANGUAGES = ['en', 'ro'] as const;
export type Language = typeof LANGUAGES[number];

// Define the translations
export const translations = {
  // Layout and navigation
  'Romanian Football Stats': {
    en: 'Romanian Football Stats',
    ro: 'Statistici Fotbal Românesc'
  },
  'Live scores, standings, and stats for Romanian football leagues': {
    en: 'Live scores, standings, and stats for Romanian football leagues',
    ro: 'Scoruri live, clasamente și poziții SuperLiga pentru fotbalul românesc'
  },
  
  // Tabs
  'Standings': {
    en: 'Standings',
    ro: 'Clasamente'
  },
  'Teams': {
    en: 'Teams',
    ro: 'Echipe'
  },
  'Top Scorers': {
    en: 'Top Scorers',
    ro: 'Golgheteri'
  },
  'Football News': {
    en: 'Football News',
    ro: 'Știri Fotbal'
  },
  
  // Standings component
  'Loading standings...': {
    en: 'Loading standings...',
    ro: 'Se încarcă clasamentele...'
  },
  'Failed to fetch standings': {
    en: 'Failed to fetch standings',
    ro: 'Eroare la încărcarea clasamentelor'
  },
  'No standings available for this competition': {
    en: 'No standings available for this competition',
    ro: 'Nu există clasamente disponibile pentru această competiție'
  },
  'Position': {
    en: 'Position',
    ro: 'Poziție'
  },
  'Team': {
    en: 'Team',
    ro: 'Echipă'
  },
  'MP': {
    en: 'MP',
    ro: 'MJ' // Meciuri jucate
  },
  'W': {
    en: 'W',
    ro: 'V'   // Victorii
  },
  'D': {
    en: 'D',
    ro: 'E'   // Egaluri
  },
  'L': {
    en: 'L',
    ro: 'Î'   // Înfrângeri
  },
  'GF': {
    en: 'GF',
    ro: 'GM' // Goluri marcate
  },
  'GA': {
    en: 'GA',
    ro: 'GP' // Goluri primite
  },
  'PTS': {
    en: 'PTS',
    ro: 'PCT' // Puncte
  },
  'Group': {
    en: 'Group',
    ro: 'Seria' // Group/Series
  },
  
  // Teams content
  'Teams content coming soon...': {
    en: 'Teams content coming soon...',
    ro: 'Conținutul despre echipe va fi disponibil în curând...'
  },
  'No teams found.': {
    en: 'No teams found.',
    ro: 'Nu s-au găsit echipe.'
  },
  'No Romanian football teams were found in the API response. This could be due to API limitations or incorrect configuration.': {
    en: 'No Romanian football teams were found in the API response. This could be due to API limitations or incorrect configuration.',
    ro: 'Nu s-au găsit echipe românești de fotbal în răspunsul API. Acest lucru ar putea fi din cauza limitărilor API sau a configurării incorecte.'
  },
  'Note': {
    en: 'Note',
    ro: 'Notă'
  },
  'No player data available': {
    en: 'No player data available',
    ro: 'Nu există date despre jucători'
  },
  'No stadium data available': {
    en: 'No stadium data available',
    ro: 'Nu există date despre stadion'
  },
  'Squad': {
    en: 'Squad',
    ro: 'Lot'
  },
  'Stadium Info': {
    en: 'Stadium Info',
    ro: 'Informații Stadion'
  },
  'Founded': {
    en: 'Founded',
    ro: 'Fondat'
  },
  'Coach': {
    en: 'Coach',
    ro: 'Antrenor'
  },
  'Goalkeepers': {
    en: 'Goalkeepers',
    ro: 'Portari'
  },
  'Defenders': {
    en: 'Defenders',
    ro: 'Fundași'
  },
  'Midfielders': {
    en: 'Midfielders',
    ro: 'Mijlocași'
  },
  'Forwards': {
    en: 'Forwards',
    ro: 'Atacanți'
  },
  'Age': {
    en: 'Age',
    ro: 'Vârstă'
  },
  'Rating': {
    en: 'Rating',
    ro: 'Notă'
  },
  'Location': {
    en: 'Location',
    ro: 'Locație'
  },
  'Address': {
    en: 'Address',
    ro: 'Adresă'
  },
  'Capacity': {
    en: 'Capacity',
    ro: 'Capacitate'
  },
  'Surface': {
    en: 'Surface',
    ro: 'Suprafață'
  },
  'Stadium image not available': {
    en: 'Stadium image not available',
    ro: 'Imaginea stadionului nu este disponibilă'
  },
  'Stadium Details': {
    en: 'Stadium Details',
    ro: 'Detalii Stadion'
  },
  'Team Information': {
    en: 'Team Information',
    ro: 'Informații Echipă'
  },
  'Players': {
    en: 'Players',
    ro: 'Jucători'
  },
  'Not available': {
    en: 'Not available',
    ro: 'Nu este disponibil'
  },
  
  // Top scorers content
  'Top scorers content coming soon...': {
    en: 'Top scorers content coming soon...',
    ro: 'Conținutul despre golgheteri va fi disponibil în curând...'
  },
  
  // League names
  'Liga I': {
    en: 'Liga I',
    ro: 'Liga I'
  },
  'Liga II': {
    en: 'Liga II',
    ro: 'Liga II'
  },
  'Liga III': {
    en: 'Liga III',
    ro: 'Liga III'
  },
  'SuperLiga': {
    en: 'SuperLiga',
    ro: 'SuperLiga'
  },
  'Poziții SuperLiga': {
    en: 'SuperLiga Standings',
    ro: 'Poziții SuperLiga'
  },
  'Clasament SuperLiga': {
    en: 'SuperLiga Table',
    ro: 'Clasament SuperLiga'
  },
  
  // News component
  'Read More': {
    en: 'Read More',
    ro: 'Citește mai mult'
  },
  'No Image Available': {
    en: 'No Image Available',
    ro: 'Imagine indisponibilă'
  },
  'Romanian Football News': {
    en: 'Romanian Football News',
    ro: 'Știri Fotbal Românesc'
  },
  'Error': {
    en: 'Error',
    ro: 'Eroare'
  },
  'No news articles found about Romanian football.': {
    en: 'No news articles found about Romanian football.',
    ro: 'Nu s-au găsit articole despre fotbalul românesc.'
  },
  'Loading...': {
    en: 'Loading...',
    ro: 'Se încarcă...'
  },
  
  // SEO
  'Live scores, standings, and news for Romanian SuperLiga football': {
    en: 'Live scores, standings, and news for Romanian SuperLiga football',
    ro: 'Scoruri live, poziții SuperLiga și știri pentru fotbalul românesc'
  },
  'Romanian football, SuperLiga, standings, teams, live scores': {
    en: 'Romanian football, SuperLiga, standings, teams, live scores',
    ro: 'Fotbal românesc, SuperLiga, clasament, echipe, scoruri live'
  }
};

// Get the current language from the URL
export function getCurrentLanguage(): Language {
  // Default to English if we're on the server or can't determine the language
  if (typeof window === 'undefined') {
    return 'en';
  }

  const path = window.location.pathname;
  const language = path.split('/')[1];

  return LANGUAGES.includes(language as Language) ? (language as Language) : 'en';
}

// Translate a string
export function t(key: string, language?: Language): string {
  const currentLanguage = language ?? getCurrentLanguage();
  
  // Return the translation if it exists, otherwise return the key
  if (key in translations) {
    return translations[key as keyof typeof translations][currentLanguage] ?? key;
  }
  return key;
}

export type TranslationKey = keyof typeof translations; 