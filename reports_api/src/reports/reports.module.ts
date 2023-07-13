import { Module } from '@nestjs/common';
import { ReportsService } from './reports/reports.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'reports',
    }),
  ],
  providers: [ReportsService],
})
export class ReportsModule {}
