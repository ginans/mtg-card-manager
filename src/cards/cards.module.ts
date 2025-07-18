import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Cards, CardSchema } from './card.entity';
import { ScryfallService } from './scryfall.service';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cards.name, schema: CardSchema }]),
  ],
  controllers: [ CardsController],
  providers: [ScryfallService, CardsService],
  exports: [MongooseModule, ScryfallService, CardsService],
})
export class CardsModule {}
