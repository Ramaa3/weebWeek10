import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}
  async health() { await this.prisma.$queryRawUnsafe('SELECT 1'); return { status: 'ok', service: 'NucleoMonitor API', database: 'connected' }; }
  facilities() { return this.prisma.facility.findMany({ orderBy: { id: 'asc' } }); }
  monitoring(type?: string) {
    if (type && type !== 'Semua' && !['Udara', 'Air', 'Tanah'].includes(type)) throw new BadRequestException('Jenis pemantauan tidak valid.');
    return this.prisma.monitoring.findMany({ where: type && type !== 'Semua' ? { type } : {}, orderBy: { id: 'asc' } });
  }
  communityNotes() { return this.prisma.communityNote.findMany({ orderBy: { id: 'asc' } }); }
}
