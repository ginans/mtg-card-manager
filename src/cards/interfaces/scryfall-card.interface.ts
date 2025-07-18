/**
 * Representa una de las caras de una carta de Scryfall (para cartas de doble cara, modal, etc).
 */
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

/**
 * Representa la estructura resumida de una carta obtenida desde la API de Scryfall (búsqueda por query).
 */
export interface ScryfallCard {
  object: string;
  id: string;
  oracle_id: string;
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
}

/**
 * Respuesta paginada de la API de Scryfall para búsquedas de cartas.
 */
export interface ScryfallByPageResponse {
  object: string;
  total_cards: number;
  has_more: boolean;
  next_page?: string;
  data: ScryfallCard[];
}
