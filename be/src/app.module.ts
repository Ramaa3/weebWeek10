import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ReportsController } from './reports/reports.controller';
import { ReportsService } from './reports/reports.service';
import { CatalogController } from './catalog/catalog.controller';
import { CatalogService } from './catalog/catalog.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReportsController, CatalogController],
  providers: [ReportsService, CatalogService],
})
export class AppModule {}
