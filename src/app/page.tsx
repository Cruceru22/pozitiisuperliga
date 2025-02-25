'use client';

import { useState } from 'react';
import { Standings } from '~/components/Standings';
import { Teams } from '~/components/Teams';
import FootballNews from '~/components/FootballNews';
import { t } from '../utils/translations';

const tabs = [
  { id: 'standings', label: t('Standings'), icon: '📊' },
  { id: 'teams', label: t('Teams'), icon: '⚽' },
  { id: 'news', label: t('Football News'), icon: '📰' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('standings');

  return (
    <div>
      {/* SEO-friendly heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 hidden md:block">
        Poziții SuperLiga - Clasamente și Statistici Fotbal Românesc
      </h1>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <nav className="flex" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 whitespace-nowrap py-4 px-1 text-sm md:text-base font-medium transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 border-t-4 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-t-4 border-transparent'
                }
              `}
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'standings' && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {t('Standings')} - Poziții SuperLiga
            </h2>
            <Standings />
          </>
        )}
        {activeTab === 'teams' && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {t('Teams')} - Echipe SuperLiga
            </h2>
            <Teams />
          </>
        )}
        {activeTab === 'news' && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {t('Football News')} - Știri SuperLiga
            </h2>
            <FootballNews />
          </>
        )}
      </div>
    </div>
  );
}
