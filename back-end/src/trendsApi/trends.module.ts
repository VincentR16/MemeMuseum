import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TrendingService } from './trends.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ScheduleModule.forRoot(), ConfigModule.forRoot()],
  providers: [TrendingService],
  exports: [TrendingService],
})
export class TrendingModule {}
