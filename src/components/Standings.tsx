import { useState, useEffect } from 'react';
import { api, ROMANIAN_LEAGUES } from '~/utils/api';
import { t } from '~/utils/translations';
import type { Standing } from '~/types/api';

export default function Standings() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string>(ROMANIAN_LEAGUES[0].id);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await api.getStandings(selectedLeague);
        
        if (data && data.length > 0) {
          // Group standings by group if they have group property
          setStandings(data);
        } else {
          setStandings([]);
          setError(t('No standings available for this competition'));
        }
      } catch (err) {
        console.error('Error fetching standings:', err);
        setError(err instanceof Error ? err.message : String(err));
        setStandings([]);
      } finally {
        setLoading(false);
      }
    };

    // Call the async function and handle any errors
    fetchStandings().catch(err => {
      console.error('Error in fetchStandings:', err);
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    });
  }, [selectedLeague]);

  // Group standings by group if they have group property
  const groupedStandings = standings.reduce<Record<string, Standing[]>>((acc, standing) => {
    const group = standing.league_round ?? 'Default Group';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(standing);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg">{t('Loading standings...')}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
        <h3 className="font-bold">{t('Failed to fetch standings')}</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (standings.length === 0) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded mb-4">
        <p>{t('No standings available for this competition')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <label htmlFor="league-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select League:
        </label>
        <select
          id="league-select"
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {ROMANIAN_LEAGUES.map((league) => (
            <option key={league.id} value={league.id}>
              {t(league.name)}
            </option>
          ))}
        </select>
      </div>

      {Object.entries(groupedStandings).map(([group, groupStandings]) => (
        <div key={group} className="mb-8">
          {Object.keys(groupedStandings).length > 1 && (
            <h3 className="text-xl font-semibold mb-3">{t('Group')}: {group}</h3>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">{t('Position')}</th>
                  <th className="py-2 px-4 border-b text-left">{t('Team')}</th>
                  <th className="py-2 px-4 border-b text-center">{t('MP')}</th>
                  <th className="py-2 px-4 border-b text-center">{t('W')}</th>
                  <th className="py-2 px-4 border-b text-center">{t('D')}</th>
                  <th className="py-2 px-4 border-b text-center">{t('L')}</th>
                  <th className="py-2 px-4 border-b text-center">{t('GF')}</th>
                  <th className="py-2 px-4 border-b text-center">{t('GA')}</th>
                  <th className="py-2 px-4 border-b text-center">{t('PTS')}</th>
                </tr>
              </thead>
              <tbody>
                {groupStandings.map((standing) => (
                  <tr key={standing.team_id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{standing.overall_league_position}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center">
                        {standing.team_badge && (
                          <img 
                            src={standing.team_badge} 
                            alt={standing.team_name} 
                            className="w-6 h-6 mr-2"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder-team.svg';
                            }}
                          />
                        )}
                        {standing.team_name}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b text-center">{standing.overall_league_payed}</td>
                    <td className="py-2 px-4 border-b text-center">{standing.overall_league_W}</td>
                    <td className="py-2 px-4 border-b text-center">{standing.overall_league_D}</td>
                    <td className="py-2 px-4 border-b text-center">{standing.overall_league_L}</td>
                    <td className="py-2 px-4 border-b text-center">{standing.overall_league_GF}</td>
                    <td className="py-2 px-4 border-b text-center">{standing.overall_league_GA}</td>
                    <td className="py-2 px-4 border-b text-center font-bold">{standing.overall_league_PTS}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
} 