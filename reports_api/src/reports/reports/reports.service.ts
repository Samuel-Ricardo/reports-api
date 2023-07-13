import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { Status } from '@prisma/client';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ReportsService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('reports')
    private reportsQueue: Queue,
  ) {}

  all() {
    return this.prisma.report.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.report.findUnique({ where: { id } });
  }

  async request() {
    const report = await this.prisma.report.create({
      data: {
        filename: '',
        status: Status.PENDING,
      },
    });

    await this.reportsQueue.add({ reportID: report.id });
    return report;
  }

  async produce(reportID: string) {
    console.log('[PRODUCER] Producing report: ' + reportID);

    await new Promise((f) => setTimeout(f, Math.random() * 1000));

    await this.prisma.report.update({
      where: { id: reportID },
      data: { status: Status.PROCESSING },
    });

    await new Promise((f) => setTimeout(f, Math.random() * 1000));

    const randomStatus = Math.random() > 0.5 ? Status.DONE : Status.ERROR;

    await this.prisma.report.update({
      where: { id: reportID },
      data: {
        filename:
          randomStatus === Status.DONE ? 'report-${reportID}.pdf' : null,
        status: randomStatus,
      },
    });
  }
}

const sleep = (ms: number) => new Promise((f) => setTimeout(f, ms));
