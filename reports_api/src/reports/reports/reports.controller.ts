import { Controller, Get, Param, ParseIntPipe, Render } from '@nestjs/common';
import { ReportsService } from './reports.service';

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
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.service.findOne(id + '');
  }
}
