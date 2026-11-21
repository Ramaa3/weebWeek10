import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CreateReportDto } from './create-report.dto';
import { UpdateReportDto } from './update-report.dto';
import { ReportsService } from './reports.service';
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Get() findAll() { return this.reportsService.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.reportsService.findOne(id); }
  @Post() create(@Body() dto: CreateReportDto) { return this.reportsService.create(dto); }
  @Put(':id') update(@Param('id') id: string, @Body() dto: UpdateReportDto) { return this.reportsService.update(id, dto); }
  @Delete(':id') @HttpCode(204) remove(@Param('id') id: string) { return this.reportsService.remove(id); }
}
