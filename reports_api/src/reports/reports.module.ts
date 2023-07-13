import { Module } from '@nestjs/common';
import { ReportsService } from './reports/reports.service';
import { BullModule } from '@nestjs/bull';
import { ReportsJobService } from './reports-job/reports-job.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'reports',
    }),
  ],
  providers: [ReportsService, ReportsJobService],
})
export class ReportsModule {}
