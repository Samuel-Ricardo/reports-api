import {
  MessageEvent,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Render,
  Res,
  Sse,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Observable, defer, map, repeat, tap } from 'rxjs';
import { Response } from 'express';
import { Report, Status } from '@prisma/client';

@Controller('reports')
export class ReportsController {
  constructor(private service: ReportsService) {}

  @Get('view')
  @Render('reports')
  async view() {
    const reports = await this.service.all();
    return { reports };
  }

  @Get()
  async all() {
    return await this.service.all();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id + '');
  }

  @Post()
  request() {
    return this.service.request();
  }

  @Sse(':id/events')
  events(
    @Param('id') id: string,
    @Res() response: Response,
  ): Observable<MessageEvent> {
    return defer(() => this.service.findOne(id)).pipe(
      repeat({
        delay: 1000,
      }),
      tap((report) => {
        if (report.status === Status.DONE || report.status === Status.ERROR) {
          setTimeout(() => {
            response.end();
          }, 1000);
        }
      }),
      map((report) => ({
        type: 'message',
        data: report,
      })),
    );
  }
}
