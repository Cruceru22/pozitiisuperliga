'use server';

import { api } from '~/utils/api';
import FootballNewsClient from './FootballNewsClient';
import { Suspense } from 'react';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface NewsResponse {
  articles: NewsArticle[];
}

export async function FootballNewsServer() {
  // Fetch initial news data on the server
  let initialArticles: NewsArticle[] = [];
  let initialError: string | null = null;
  
  try {
    const newsData = await api.server.getFootballNews();
    if (newsData && Array.isArray(newsData.articles)) {
      initialArticles = newsData.articles;
    }
  } catch (err) {
    console.error('Error fetching initial news:', err);
    initialError = err instanceof Error ? err.message : String(err);
  }
  
  return (
    <Suspense fallback={<div className="p-4 text-center">Se încarcă știrile...</div>}>
      <FootballNewsClient 
        initialArticles={initialArticles}
        initialError={initialError}
      />
    </Suspense>
  );
} 