'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import Standings from '~/components/Standings';
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
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {t('Poziții SuperLiga')} - {t('Romanian Football Stats')}
        </h1>
        
        <div className="mb-8">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-2 px-4 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4">
            {activeTab === 'standings' && t('Clasament SuperLiga')}
            {activeTab === 'teams' && t('Teams')}
            {activeTab === 'news' && t('Romanian Football News')}
          </h2>
          
          <Suspense fallback={<div>Loading...</div>}>
            {activeTab === 'standings' && <Standings />}
            {activeTab === 'teams' && <Teams />}
            {activeTab === 'news' && <FootballNews />}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
