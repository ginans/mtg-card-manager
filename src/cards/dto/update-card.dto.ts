import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ScryfallCardById,
  ScryfallCardFace,
} from '../interfaces/scryfall-card-by-id.interface';

export class UpdateCardDto
  implements
    Omit<
      Partial<ScryfallCardById>,
      'id' | 'oracle_id' | 'tcgplayer_id' | 'artist_ids'
    >
{
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo object debe ser un string' })
  object?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray({ message: 'El campo multiverse_ids debe ser un array de números' })
  @IsNumber(
    {},
    { each: true, message: 'Cada multiverse_id debe ser un número' },
  )
  multiverse_ids?: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo name debe ser un string' })
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo lang debe ser un string' })
  lang?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo released_at debe ser un string' })
  released_at?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo uri debe ser un string' })
  uri?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo scryfall_uri debe ser un string' })
  scryfall_uri?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo layout debe ser un string' })
  layout?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'El campo highres_image debe ser booleano' })
  highres_image?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo image_status debe ser un string' })
  image_status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: 'El campo cmc debe ser un número' })
  cmc?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo type_line debe ser un string' })
  type_line?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray({ message: 'El campo color_identity debe ser un array de strings' })
  @IsString({ each: true, message: 'Cada color_identity debe ser un string' })
  color_identity?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray({ message: 'El campo keywords debe ser un array de strings' })
  @IsString({ each: true, message: 'Cada keyword debe ser un string' })
  keywords?: string[];

  @ApiPropertyOptional({ type: [Object] })
  @IsOptional()
  @IsArray({ message: 'El campo card_faces debe ser un array de objetos' })
  @ValidateNested({
    each: true,
    message: 'Cada card_face debe ser un objeto válido',
  })
  @Type(() => Object)
  card_faces?: ScryfallCardFace[];

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject({ message: 'El campo image_uris debe ser un objeto' })
  image_uris?: Record<string, string>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo mana_cost debe ser un string' })
  mana_cost?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo oracle_text debe ser un string' })
  oracle_text?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo set debe ser un string' })
  set?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo set_name debe ser un string' })
  set_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo set_type debe ser un string' })
  set_type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo collector_number debe ser un string' })
  collector_number?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo rarity debe ser un string' })
  rarity?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo artist debe ser un string' })
  artist?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray({ message: 'El campo artist_ids debe ser un array de strings' })
  @IsString({ each: true, message: 'Cada artist_id debe ser un string' })
  artist_ids?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo border_color debe ser un string' })
  border_color?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo frame debe ser un string' })
  frame?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray({ message: 'El campo frame_effects debe ser un array de strings' })
  @IsString({ each: true, message: 'Cada frame_effect debe ser un string' })
  frame_effects?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'El campo security_stamp debe ser un string' })
  security_stamp?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'El campo full_art debe ser booleano' })
  full_art?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'El campo textless debe ser booleano' })
  textless?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'El campo booster debe ser booleano' })
  booster?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'El campo story_spotlight debe ser booleano' })
  story_spotlight?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: 'El campo edhrec_rank debe ser un número' })
  edhrec_rank?: number;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject({
    message:
      'El campo preview debe ser un objeto con source, source_uri y previewed_at',
  })
  preview?: {
    source: string;
    source_uri: string;
    previewed_at: string;
  };

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject({ message: 'El campo prices debe ser un objeto' })
  prices?: Record<string, string | null>;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject({ message: 'El campo related_uris debe ser un objeto' })
  related_uris?: Record<string, string>;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject({ message: 'El campo purchase_uris debe ser un objeto' })
  purchase_uris?: Record<string, string>;
}
