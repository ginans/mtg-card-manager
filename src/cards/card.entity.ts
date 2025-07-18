import {
  ScryfallCardById,
  ScryfallCardFace,
} from './interfaces/scryfall-card-by-id.interface';
import {
  Schema as MongooseSchema,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({ _id: false })
export class ImageUrisSchema {
  @Prop() small?: string;
  @Prop() normal?: string;
  @Prop() large?: string;
  @Prop() png?: string;
  @Prop() art_crop?: string;
  @Prop() border_crop?: string;
}

@Schema({ _id: false })
export class PreviewSchema {
  @Prop() source: string;
  @Prop() source_uri: string;
  @Prop() previewed_at: string;
}

@Schema({ _id: false })
export class PricesSchema {
  @Prop() usd?: string;
  @Prop() usd_foil?: string;
  @Prop() usd_etched?: string;
  @Prop() eur?: string;
  @Prop() eur_foil?: string;
  @Prop() tix?: string;
}

@Schema({ _id: false })
export class RelatedUrisSchema {
  @Prop() tcgplayer_infinite_articles?: string;
  @Prop() tcgplayer_infinite_decks?: string;
  @Prop() edhrec?: string;
}

@Schema({ _id: false })
export class PurchaseUrisSchema {
  @Prop() tcgplayer?: string;
  @Prop() cardmarket?: string;
  @Prop() cardhoarder?: string;
}

@Schema({ _id: false })
export class CardFaceSchema {
  @Prop() object: string;
  @Prop() name: string;
  @Prop() mana_cost?: string;
  @Prop() type_line: string;
  @Prop() oracle_text?: string;
  @Prop() colors?: string[];
  @Prop() power?: string;
  @Prop() toughness?: string;
  @Prop() flavor_text?: string;
  @Prop() artist?: string;
  @Prop() artist_id?: string;
  @Prop() illustration_id?: string;
  @Prop({ type: ImageUrisSchema }) image_uris?: ImageUrisSchema;
}

export type CardDocument = CardEntity & Document;

@Schema({ strict: false, timestamps: true })
export class CardEntity implements ScryfallCardById {
  @Prop({ required: true })
  object: string;
  @Prop({ required: true, unique: true })
  id: string;
  @Prop({ required: true })
  oracle_id: string;
  @Prop() multiverse_ids: number[];
  @Prop() tcgplayer_id?: number;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  lang: string;
  @Prop({ required: true })
  released_at: string;
  @Prop({ required: true })
  uri: string;
  @Prop({ required: true })
  scryfall_uri: string;
  @Prop({ required: true })
  layout: string;
  @Prop({ required: true })
  highres_image: boolean;
  @Prop({ required: true })
  image_status: string;
  @Prop({ required: true })
  cmc: number;
  @Prop({ required: true })
  type_line: string;
  @Prop({ required: true })
  color_identity: string[];
  @Prop({ required: true })
  keywords: string[];
  @Prop({ type: [CardFaceSchema] }) card_faces?: CardFaceSchema[];
  @Prop({ type: ImageUrisSchema }) image_uris?: ImageUrisSchema;
  @Prop() mana_cost?: string;
  @Prop() oracle_text?: string;
  @Prop({ required: true })
  set: string;
  @Prop({ required: true })
  set_name: string;
  @Prop({ required: true })
  set_type: string;
  @Prop({ required: true })
  collector_number: string;
  @Prop({ required: true })
  rarity: string;
  @Prop() artist?: string;
  @Prop() artist_ids?: string[];
  @Prop({ required: true })
  border_color: string;
  @Prop({ required: true })
  frame: string;
  @Prop() frame_effects?: string[];
  @Prop() security_stamp?: string;
  @Prop() full_art?: boolean;
  @Prop() textless?: boolean;
  @Prop() booster?: boolean;
  @Prop() story_spotlight?: boolean;
  @Prop() edhrec_rank?: number;
  @Prop({ type: PreviewSchema }) preview?: PreviewSchema;
  @Prop({ type: PricesSchema }) prices?: PricesSchema;
  @Prop({ type: RelatedUrisSchema }) related_uris?: RelatedUrisSchema;
  @Prop({ type: PurchaseUrisSchema }) purchase_uris?: PurchaseUrisSchema;
}

export const CardSchema = SchemaFactory.createForClass(CardEntity);
