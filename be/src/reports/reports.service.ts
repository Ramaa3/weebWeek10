import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './create-report.dto';
import { UpdateReportDto } from './update-report.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const reports = await this.prisma.report.findMany({ orderBy: [{ date: 'desc' }, { id: 'asc' }] });
    return reports.map((report) => this.serialize(report));
  }

  async findOne(id: string) {
    const report = await this.prisma.report.findUnique({ where: { id } });
    if (!report) throw new NotFoundException('Laporan tidak ditemukan.');
    return this.serialize(report);
  }

  async create(dto: CreateReportDto) {
    try {
      const report = await this.prisma.report.create({
        data: { ...dto, id: dto.id.trim(), description: dto.description.trim(), date: this.parseDate(dto.date) },
      });
      return this.serialize(report);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('ID laporan sudah digunakan.');
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateReportDto) {
    await this.findOne(id);
    const report = await this.prisma.report.update({
      where: { id },
      data: { ...dto, description: dto.description.trim(), date: this.parseDate(dto.date) },
    });
    return this.serialize(report);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.report.delete({ where: { id } });
  }

  private serialize<T extends { date: Date }>(report: T) {
    return { ...report, date: report.date.toISOString().slice(0, 10) };
  }

  private parseDate(value: string) {
    const date = new Date(value + 'T00:00:00.000Z');
    if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
      throw new BadRequestException('Tanggal laporan tidak valid.');
    }
    return date;
  }
}
