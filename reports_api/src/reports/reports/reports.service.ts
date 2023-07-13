import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { Status } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  all() {
    return this.prisma.report.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.report.findUnique({ where: { id } });
  }

  async request(filename?: string) {
    const report = await this.prisma.report.create({
      data: {
        filename,
        status: Status.PENDING,
      },
    });
    return report;
  }
}
