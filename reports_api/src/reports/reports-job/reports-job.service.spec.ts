import { Test, TestingModule } from '@nestjs/testing';
import { ReportsJobService } from './reports-job.service';
import { ReportsService } from '../reports/reports.service';
import { PrismaModule } from '../../prisma/prisma.module';

describe('ReportsJobService', () => {
  let service: ReportsJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ReportsJobService, ReportsService],
    }).compile();

    service = module.get<ReportsJobService>(ReportsJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
