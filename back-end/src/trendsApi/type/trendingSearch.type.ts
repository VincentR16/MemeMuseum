export interface TrendingSearch {
  query: string;
  start_timestamp: number;
  active: boolean;
  search_volume: number;
  increase_percentage: number;
  categories?: Array<{
    id: number;
    name: string;
  }>;
  trend_breakdown?: string[];
}
