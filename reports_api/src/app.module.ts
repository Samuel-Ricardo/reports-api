import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ReportsJobService } from './reports/reports-job/reports-job.service';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [AppService, ReportsJobService],
})
export class AppModule {}
