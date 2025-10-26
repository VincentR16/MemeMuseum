import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { getJson } from 'serpapi';
import { SerpApiTrendingResponse } from './type/serpResponse.type';
import { TrendingSearch } from './type/trendingSearch.type';

@Injectable()
export class TrendingService {
  private dailyTrendingKeywords: string[] = [];
  private lastUpdate: Date | null = null;

  constructor(private readonly configService: ConfigService) {}

  @Cron('0 */12 * * *')
  async updateDailyTrending(): Promise<void> {
    console.log('Updating daily trending keywords...');

    try {
      const apiKey = this.configService.get<string>('SERPAPI_KEY');

      if (!apiKey) {
        throw new Error('SERPAPI_KEY is not configured');
      }

      // Usa la nuova API senza il parametro "frequency"
      const response = (await getJson({
        engine: 'google_trends_trending_now',
        geo: 'IT',
        hl: 'it',
        hours: 24, // Ultime 24 ore
        api_key: apiKey,
      })) as SerpApiTrendingResponse;

      if (response.trending_searches && response.trending_searches.length > 0) {
        // Estrai le prime 5 query dai trending searches
        this.dailyTrendingKeywords = response.trending_searches
          .slice(0, 5)
          .map((search: TrendingSearch) => search.query);

        this.lastUpdate = new Date();

        console.log(
          '✅ Trending keywords updated:',
          this.dailyTrendingKeywords,
        );
        console.log('Last update:', this.lastUpdate);
      } else {
        console.log('⚠️ No trending searches found');
      }
    } catch (error) {
      console.error('❌ Error fetching trending searches:', error);
    }
  }

  /* async onModuleInit(): Promise<void> {
    console.log('TrendingService initialized. Fetching initial data...');
    await this.updateDailyTrending();
  } */

  getDailyKeywords(): string[] {
    return this.dailyTrendingKeywords;
  }

  getLastUpdate(): Date | null {
    return this.lastUpdate;
  }

  // Metodo extra: ottieni solo trending attivi
  async getActiveTrendingKeywords(): Promise<string[]> {
    try {
      const apiKey = this.configService.get<string>('SERPAPI_KEY');

      if (!apiKey) {
        throw new Error('SERPAPI_KEY is not configured');
      }

      const response = (await getJson({
        engine: 'google_trends_trending_now',
        geo: 'IT',
        hl: 'it',
        hours: 24,
        api_key: apiKey,
      })) as SerpApiTrendingResponse;

      if (response.trending_searches) {
        // Filtra solo i trending attivi
        return response.trending_searches
          .filter((search: TrendingSearch) => search.active)
          .slice(0, 5)
          .map((search: TrendingSearch) => search.query);
      }

      return [];
    } catch (error) {
      console.error('❌ Error fetching active trending searches:', error);
      return [];
    }
  }
}
