import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CardEntity, CardSchema } from './card.entity';
import { ScryfallService } from './scryfall.service';
import { ScryfallTestController } from './scryfall-test.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CardEntity.name, schema: CardSchema }]),
  ],
  controllers: [ScryfallTestController],
  providers: [ScryfallService],
  exports: [MongooseModule, ScryfallService],
})
export class CardsModule {}
