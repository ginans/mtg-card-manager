import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CardEntity, CardSchema } from './card.entity';
import { ScryfallService } from './scryfall.service';
import { ScryfallTestController } from './scryfall-test.controller';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CardEntity.name, schema: CardSchema }]),
  ],
  controllers: [ScryfallTestController, CardsController],
  providers: [ScryfallService, CardsService],
  exports: [MongooseModule, ScryfallService, CardsService],
})
export class CardsModule {}
