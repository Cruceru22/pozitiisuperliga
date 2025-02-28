import type { Metadata } from 'next';
import TeamsClient from '~/components/TeamsClient';

export const metadata: Metadata = {
  title: 'Echipe SuperLiga | Cluburi Fotbal Românesc',
  description: 'Informații despre echipele din SuperLiga României. Descoperă loturile, stadioanele și statisticile echipelor de fotbal românești.',
  keywords: 'echipe SuperLiga, cluburi fotbal românesc, loturi Liga 1, stadioane fotbal România',
};

export default function TeamsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-lg shadow-md">
            Echipe SuperLiga
          </span>
        </h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <TeamsClient />
      </div>
    </div>
  );
} 