declare module 'newsapi' {
  interface NewsAPIOptions {
    q?: string;
    sources?: string;
    domains?: string;
    from?: string;
    to?: string;
    language?: string;
    sortBy?: string;
    page?: number;
    pageSize?: number;
    category?: string;
    country?: string;
  }

  interface NewsAPIResponse {
    status: string;
    totalResults?: number;
    articles?: Array<{
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
    }>;
    sources?: Array<{
      id: string;
      name: string;
      description: string;
      url: string;
      category: string;
      language: string;
      country: string;
    }>;
  }

  class NewsAPI {
    constructor(apiKey: string);
    v2: {
      topHeadlines(options: NewsAPIOptions): Promise<NewsAPIResponse>;
      everything(options: NewsAPIOptions): Promise<NewsAPIResponse>;
      sources(options: NewsAPIOptions): Promise<NewsAPIResponse>;
    };
  }

  export default NewsAPI;
} 