import {
  IsArray,
  ArrayNotEmpty,
  IsString,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveCardsDto {
  @ApiProperty({
    description: 'Array de IDs de cartas de Scryfall',
    example: [
      '38661695-3e4e-4ec3-a00e-e5e09df23772',
      'b4073c63-301d-4bce-bab6-3e684d3cfb1a',
    ],
    minItems: 1,
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  card_ids: string[];
}
