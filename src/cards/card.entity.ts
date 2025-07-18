import {
  ScryfallCardById,
  ScryfallCardFace,
} from './interfaces/scryfall-card-by-id.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  @Prop() card_faces?: ScryfallCardFace[];
  @Prop() image_uris?: Record<string, string>;
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
  @Prop() preview?: {
    source: string;
    source_uri: string;
    previewed_at: string;
  };
  @Prop() prices?: Record<string, string | null>;
  @Prop() related_uris?: Record<string, string>;
  @Prop() purchase_uris?: Record<string, string>;
}

export const CardSchema = SchemaFactory.createForClass(CardEntity);
