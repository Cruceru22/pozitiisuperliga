'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, AlertCircle, Calendar, User, Newspaper } from 'lucide-react';
import { trackEvent } from '~/utils/analytics';

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

interface FootballNewsClientProps {
  initialArticles?: NewsArticle[];
  initialError?: string | null;
}

export default function FootballNewsClient({
  initialArticles = [],
  initialError = null
}: FootballNewsClientProps) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [error, setError] = useState<string | null>(initialError);

  useEffect(() => {
    // If we have initial data and no error, don't fetch again
    if (initialArticles.length > 0 && !initialError) {
      return;
    }
    
    async function fetchNews() {
      try {
        const response = await fetch('/api/football-news');
        
        if (!response.ok) {
          throw new Error(`Eroare la încărcarea știrilor: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data && Array.isArray(data.articles)) {
          setArticles(data.articles);
          
          // Track successful news load
          trackEvent('news_loaded', { 
            articles_count: data.articles.length
          });
        } else {
          setError('Format de date invalid primit de la API');
          
          // Track data format error
          trackEvent('news_load_error', { 
            error: 'Invalid data format'
          });
        }
      } catch (err) {
        console.error('Eroare la încărcarea știrilor:', err);
        setError(err instanceof Error ? err.message : String(err));
        
        // Track error
        trackEvent('news_load_error', { 
          error: err instanceof Error ? err.message : String(err)
        });
      }
    }
    
    fetchNews();
  }, [initialArticles, initialError]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Track article click
  const handleArticleClick = (article: NewsArticle) => {
    trackEvent('article_clicked', {
      article_title: article.title,
      article_source: article.source.name,
      article_url: article.url
    });
  };
  
  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4 flex items-start">
        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold">Eroare la încărcarea știrilor</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  if (articles.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-600 mb-2">Nu există știri disponibile</h3>
        <p className="text-gray-500">Încercați să reveniți mai târziu pentru actualizări.</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <a 
            key={index} 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => handleArticleClick(article)}
            className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-blue-100 flex flex-col h-full transform hover:-translate-y-1 cursor-pointer"
          >
            {article.urlToImage && (
              <div className="h-52 overflow-hidden relative">
                <img 
                  src={article.urlToImage || '/placeholder-news.jpg'} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-news.svg';
                  }}
                />
                <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 text-sm font-medium rounded-br-lg">
                  <Newspaper className="h-4 w-4 inline-block mr-1" />
                  Știri
                </div>
              </div>
            )}
            <div className="p-5 flex-grow">
              <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 hover:text-blue-700 transition-colors">{article.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center mr-4">
                  <User className="h-4 w-4 mr-1 text-blue-600" />
                  <span className="font-medium">{article.source.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
            </div>
            <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-5 rounded-lg transition-all duration-300 w-full justify-center shadow-sm hover:shadow-md">
                Citește mai mult
                <ExternalLink className="h-4 w-4 ml-2" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
} 