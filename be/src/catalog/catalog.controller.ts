import { Controller, Get, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
@Controller()
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}
  @Get('health') health() { return this.catalogService.health(); }
  @Get('facilities') facilities() { return this.catalogService.facilities(); }
  @Get('monitoring') monitoring(@Query('type') type?: string) { return this.catalogService.monitoring(type); }
  @Get('community-notes') communityNotes() { return this.catalogService.communityNotes(); }
}
