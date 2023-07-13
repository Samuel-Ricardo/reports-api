import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { PrismaModule } from '../../prisma/prisma.module';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ReportsService],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
