import { Controller, Get, Query, Param } from '@nestjs/common';
import { ScryfallService } from './scryfall.service';
import { ScryfallByPageResponse } from './interfaces/scryfall-card.interface';
import { ScryfallCardById } from './interfaces/scryfall-card-by-id.interface';

@Controller('scryfall-test')
export class ScryfallTestController {
  constructor(private readonly scryfallService: ScryfallService) {}

  @Get('search')
  async search(@Query('q') q: string): Promise<ScryfallByPageResponse> {
    return this.scryfallService.searchCards(q);
  }

  @Get('card/:id')
  async getById(@Param('id') id: string): Promise<ScryfallCardById> {
    return this.scryfallService.getCardById(id);
  }
}
