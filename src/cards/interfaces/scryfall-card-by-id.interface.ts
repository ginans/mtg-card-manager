export interface ScryfallCardFace {
  object: string;
  name: string;
  mana_cost?: string;
  type_line: string;
  oracle_text?: string;
  colors?: string[];
  power?: string;
  toughness?: string;
  flavor_text?: string;
  artist?: string;
  artist_id?: string;
  illustration_id?: string;
  image_uris?: {
    small?: string;
    normal?: string;
    large?: string;
    png?: string;
    art_crop?: string;
    border_crop?: string;
  };
}

export interface ScryfallCardById {
  object: string;
  id: string;
  oracle_id: string;
  multiverse_ids: number[];
  tcgplayer_id?: number;
  name: string;
  lang: string;
  released_at: string;
  uri: string;
  scryfall_uri: string;
  layout: string;
  highres_image: boolean;
  image_status: string;
  cmc: number;
  type_line: string;
  color_identity: string[];
  keywords: string[];
  card_faces?: ScryfallCardFace[];
  image_uris?: {
    small?: string;
    normal?: string;
    large?: string;
    png?: string;
    art_crop?: string;
    border_crop?: string;
  };
  mana_cost?: string;
  oracle_text?: string;
  set: string;
  set_name: string;
  set_type: string;
  collector_number: string;
  rarity: string;
  artist?: string;
  artist_ids?: string[];
  border_color: string;
  frame: string;
  frame_effects?: string[];
  security_stamp?: string;
  full_art?: boolean;
  textless?: boolean;
  booster?: boolean;
  story_spotlight?: boolean;
  edhrec_rank?: number;
  preview?: {
    source: string;
    source_uri: string;
    previewed_at: string;
  };
  prices?: Record<string, string | null>;
  related_uris?: Record<string, string>;
  purchase_uris?: Record<string, string>;
}
