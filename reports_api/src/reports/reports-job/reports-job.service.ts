import { Process, Processor } from '@nestjs/bull';
import { ReportsService } from '../reports/reports.service';
import { Job } from 'bull';

@Processor('reports')
export class ReportsJobService {
  constructor(private reportsService: ReportsService) {}

  @Process()
  async produce(job: Job<{ reportID: string }>) {
    await this.reportsService.produce(job.data.reportID);
    return {};
  }
}
