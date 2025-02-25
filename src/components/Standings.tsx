import { useEffect, useState } from 'react';
import { api, ROMANIAN_LEAGUES } from '~/utils/api';
import type { Standing } from '~/types/api';
import { t } from '~/utils/translations';
import React from 'react';

export function Standings() {
  const [standings, setStandings] = useState<Record<string, Standing[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string>(ROMANIAN_LEAGUES[0].id);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true);
        const response = await api.getStandings(selectedLeague);
        const leagueStandings = Array.isArray(response) ? response : [];
        
        setStandings(prev => ({
          ...prev,
          [selectedLeague]: leagueStandings
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : t('Failed to fetch standings'));
      } finally {
        setLoading(false);
      }
    };

    if (selectedLeague && !standings[selectedLeague]) {
      fetchStandings();
    }
  }, [selectedLeague, standings]);

  if (loading && selectedLeague && !standings[selectedLeague]) {
    return <div className="text-center">{t('Loading standings...')}</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  const currentStandings = selectedLeague ? standings[selectedLeague] || [] : [];

  // Function to determine if we should show a group header
  const shouldShowGroupHeader = (index: number) => {
    // For Liga III (ID: 270), add group headers at the start of each group of 10
    if (selectedLeague === '270' && index % 10 === 0) {
      return true;
    }
    return false;
  };

  return (
    <div>
      {/* League selector */}
      <div className="mb-6">
        <select
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {ROMANIAN_LEAGUES.map((league) => (
            <option key={league.id} value={league.id}>
              {t(league.name)}
            </option>
          ))}
        </select>
      </div>

      {currentStandings.length === 0 ? (
        <div className="text-center text-gray-500">{t('No standings available for this competition')}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('Position')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('Team')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('MP')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('W')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('D')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('L')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('GF')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('GA')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('PTS')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentStandings.map((team: Standing, index: number) => (
                <React.Fragment key={team.team_id}>
                  {shouldShowGroupHeader(index) && (
                    <tr className="bg-blue-50">
                      <td colSpan={9} className="px-6 py-2 text-center text-xs font-medium text-blue-600">
                        {t('Group')} {Math.floor(index / 10) + 1}
                      </td>
                    </tr>
                  )}
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {team.overall_league_position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {team.team_badge && (
                          <img
                            src={team.team_badge}
                            alt={team.team_name}
                            className="w-6 h-6 object-contain mr-2"
                          />
                        )}
                        <span className="text-sm font-medium text-gray-900">
                          {team.team_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {team.overall_league_payed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {team.overall_league_W}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {team.overall_league_D}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {team.overall_league_L}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {team.overall_league_GF}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {team.overall_league_GA}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {team.overall_league_PTS}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 