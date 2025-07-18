import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchCardsDto {
  @ApiPropertyOptional({
    description:
      'Nombre exacto o parcial. Usa ! para exacto. Ej: !"Lightning Bolt"',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Tipo de carta. Ej: t:creature, t:artifact',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  t?: string;

  @ApiPropertyOptional({
    description: 'Colores. Ej: c:uw, c:red, c>g',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  c?: string;

  @ApiPropertyOptional({
    description: 'Identidad de color. Ej: id:abzan, id:uw',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({
    description: 'Texto de reglas (oracle). Ej: o:"draw a card"',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  o?: string;

  @ApiPropertyOptional({
    description: 'Coste de maná. Ej: m:{G}{U}, m:2WW',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  m?: string;

  @ApiPropertyOptional({
    description: 'Valor de maná. Ej: mv=3, mv>5',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  mv?: string;

  @ApiPropertyOptional({
    description: 'Poder. Ej: pow>=4',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  pow?: string;

  @ApiPropertyOptional({
    description: 'Resistencia. Ej: tou<=2',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  tou?: string;

  @ApiPropertyOptional({
    description: 'Lealtad (planeswalkers). Ej: loy=3',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  loy?: string;

  @ApiPropertyOptional({
    description: 'Rareza. Ej: r:rare, r>=uncommon',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  r?: string;

  @ApiPropertyOptional({
    description: 'Edición (set code). Ej: e:khm',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  e?: string;

  @ApiPropertyOptional({
    description: 'Artista. Ej: a:"John Avon"',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  a?: string;

  @ApiPropertyOptional({
    description: 'Texto de ambientación. Ej: ft:mishra',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  ft?: string;

  @ApiPropertyOptional({
    description: 'Watermark. Ej: wm:orzhov',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  wm?: string;

  @ApiPropertyOptional({
    description: 'Idioma. Ej: lang:es',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  lang?: string;

  @ApiPropertyOptional({
    description: 'Legalidad en formato. Ej: f:commander',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  f?: string;

  @ApiPropertyOptional({
    description: 'Año de impresión. Ej: year>=2020',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  year?: string;

  @ApiPropertyOptional({
    description: 'Fecha de impresión. Ej: date>=2015-08-18',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiPropertyOptional({
    description:
      'Flags y filtros especiales. Ej: is:foil, is:fullart, is:promo',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  is?: string;

  @ApiPropertyOptional({
    description: 'Opciones de resultado: order, unique, direction, display',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  order?: string;

  @ApiPropertyOptional({
    description: 'Opciones de resultado: unique',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  unique?: string;

  @ApiPropertyOptional({
    description: 'Opciones de resultado: direction',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  direction?: string;

  @ApiPropertyOptional({
    description: 'Opciones de resultado: display',
    example: '',
    default: undefined,
  })
  @IsOptional()
  @IsString()
  display?: string;
}
