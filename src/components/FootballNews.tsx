import { useState, useEffect } from 'react';
import { t } from '~/utils/translations';

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
  status: string;
  articles?: NewsArticle[];
  message?: string;
  error?: string;
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
          throw new Error(`Failed to fetch news: ${response.status}`);
        }
        
        const data = await response.json() as NewsResponse;
        
        if (data.error) {
          setError(data.message ?? data.error);
          return;
        }
        
        if (data.articles && data.articles.length > 0) {
          setNews(data.articles);
        } else {
          setError(t('No news articles found about Romanian football.'));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    // Call the async function and handle any errors
    fetchNews().catch(err => {
      console.error('Error in fetchNews:', err);
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg">{t('Loading...')}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
        <h3 className="font-bold">{t('Error')}</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">{t('Romanian Football News')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            {article.urlToImage ? (
              <img 
                src={article.urlToImage} 
                alt={article.title} 
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">{t('No Image Available')}</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{article.title}</h3>
              <p className="text-gray-700 mb-4">{article.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {t('Read More')}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 