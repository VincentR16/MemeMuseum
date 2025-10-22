import { TrendingSearch } from './trendingSearch.type';

export interface SerpApiTrendingResponse {
  search_metadata?: {
    id: string;
    status: string;
  };
  trending_searches?: TrendingSearch[];
}
