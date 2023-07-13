import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prismaService: PrismaService) {}
}
