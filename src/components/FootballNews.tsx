import { useEffect, useState } from 'react';
import { t } from '~/utils/translations';

interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
  message?: string;
}

export default function FootballNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/football-news');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        }
        
        const data: NewsAPIResponse = await response.json();
        
        if (data.status === 'ok' && data.articles) {
          setNews(data.articles);
        } else if (data.message) {
          throw new Error(data.message);
        } else {
          throw new Error('Invalid response from API');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">{t('Error')}: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">{t('No news articles found about Romanian football.')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((article, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="h-48 overflow-hidden">
            {article.urlToImage ? (
              <img 
                src={article.urlToImage} 
                alt={article.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-news.svg';
                }}
              />
            ) : (
              <img 
                src="/placeholder-news.svg" 
                alt={t('No Image Available')} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h3>
            <p className="text-gray-600 text-sm mb-2">
              {article.source.name} • {new Date(article.publishedAt).toLocaleDateString('ro-RO')}
            </p>
            {article.description && (
              <p className="text-gray-700 mb-4 line-clamp-3">{article.description}</p>
            )}
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
            >
              {t('Read More')}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
} 