import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prismaService: PrismaService) {}

  all() {
    return this.prismaService.report.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prismaService.report.findUnique({ where: { id } });
  }
}
