import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { SearchCardsDto } from './dto/search-cards.dto';
import { SaveCardsDto } from './dto/save-cards.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Patch(':id')
  @ApiBody({
    type: UpdateCardDto,
    required: true,
    description: 'Ejemplos de payload para actualizar una carta',
    examples: {
      completo: {
        summary: 'Payload completo',
        value: {
          object: 'card',
          multiverse_ids: [12345, 67890],
          name: 'Black Lotus',
          lang: 'en',
          released_at: '1993-08-05',
          uri: 'https://api.scryfall.com/cards/abc',
          scryfall_uri: 'https://scryfall.com/card/abc',
          layout: 'normal',
          highres_image: true,
          image_status: 'highres_scan',
          cmc: 0,
          type_line: 'Artifact',
          color_identity: [],
          keywords: [],
          card_faces: [],
          image_uris: {
            normal: 'https://img.scryfall.com/cards/normal/abc.jpg',
          },
          mana_cost: '{0}',
          oracle_text: 'Add three mana of any one color.',
          set: 'LEA',
          set_name: 'Limited Edition Alpha',
          set_type: 'core',
          collector_number: '233',
          rarity: 'rare',
          artist: 'Christopher Rush',
          artist_ids: ['1234'],
          border_color: 'black',
          frame: '1993',
          frame_effects: [],
          security_stamp: 'oval',
          full_art: false,
          textless: false,
          booster: true,
          story_spotlight: false,
          edhrec_rank: 1,
          preview: {
            source: 'Wizards',
            source_uri: 'https://wizards.com',
            previewed_at: '1993-07-01',
          },
          prices: { usd: '100000.00' },
          related_uris: { gatherer: 'https://gatherer.wizards.com' },
          purchase_uris: { tcgplayer: 'https://tcgplayer.com' },
        },
      },
      un_campo: {
        summary: 'Solo un campo',
        value: {
          name: 'Black Lotus',
        },
      },
      dos_campos: {
        summary: 'Dos campos',
        value: {
          name: 'Black Lotus',
          lang: 'en',
        },
      },
    },
  })
  async updateCard(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.updateCardById(id, updateCardDto);
  }

  @Get('search')
  async search(@Query() query: SearchCardsDto) {
    return this.cardsService.searchCardsWithFields(query);
  }

  @Post('save')
  async saveCards(@Body() body: SaveCardsDto) {
    return this.cardsService.saveCardsWithStats(body.card_ids);
  }
}
