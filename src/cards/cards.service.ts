import { Injectable } from '@nestjs/common';
import { ScryfallService } from './scryfall.service';
import { SearchCardsDto } from './dto/search-cards.dto';

@Injectable()
export class CardsService {
  constructor(private readonly scryfallService: ScryfallService) {}

  async searchCardsWithFields(query: SearchCardsDto) {
    // Mapeo de campos del DTO a keywords de Scryfall
    const keywordMap: Record<string, string> = {
      name: '',
      t: 't',
      c: 'c',
      id: 'id',
      o: 'o',
      m: 'm',
      mv: 'mv',
      pow: 'pow',
      tou: 'tou',
      loy: 'loy',
      r: 'r',
      e: 'e',
      a: 'a',
      ft: 'ft',
      wm: 'wm',
      lang: 'lang',
      f: 'f',
      year: 'year',
      date: 'date',
      is: 'is',
      order: 'order',
      unique: 'unique',
      direction: 'direction',
      display: 'display',
    };

    const keywords: string[] = [];
    for (const [dtoKey, scryKey] of Object.entries(keywordMap)) {
      const value = (query as any)[dtoKey];
      if (value) {
        // Si es name, va directo (puede incluir ! o comillas)
        if (dtoKey === 'name') {
          keywords.push(value);
        } else {
          keywords.push(`${scryKey}:${value}`);
        }
      }
    }

    const q = keywords.join(' ').trim();

    const scryfallRes = await this.scryfallService.searchCards(q);
    // Tomar solo las primeras 5 cartas y los campos requeridos
    return scryfallRes.data.slice(0, 5).map((card) => {
      // Si tiene card_faces, tomar la imagen del primer face disponible
      let image = card.image_uris?.normal;
      if (!image && card.card_faces?.length) {
        image =
          card.card_faces[0].image_uris?.normal ||
          card.card_faces[0].image_uris?.small;
      }
      return {
        id: card.id,
        name: card.name,
        set_name: card.set_name,
        image: image,
        mana_cost: card.mana_cost ?? card.card_faces?.[0]?.mana_cost ?? null,
        oracle_text:
          card.oracle_text ?? card.card_faces?.[0]?.oracle_text ?? null,
      };
    });
  }
}
