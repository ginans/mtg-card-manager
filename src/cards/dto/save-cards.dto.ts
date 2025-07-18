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
      '6e9a83b6-2881-4ba3-96d4-0fd89110837d',
      'd0467b6f-8c7d-4fcd-99f8-d335bb736484',
      '38661695-3e4e-4ec3-a00e-e5e09df23772',
      'b4073c63-301d-4bce-bab6-3e684d3cfb1a',
      '6aeb2c1b-0f91-4afe-8105-dfb78c8e6420'
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
