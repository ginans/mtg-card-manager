import { Controller, Get, Query } from '@nestjs/common';
import { CardsService } from './cards.service';
import { SearchCardsDto } from './dto/search-cards.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('search')
  async search(@Query() query: SearchCardsDto) {
    return this.cardsService.searchCardsWithFields(query);
  }
}
