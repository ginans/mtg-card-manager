import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardEntity, CardDocument } from './card.entity';

import { Injectable } from '@nestjs/common';
import { ScryfallService } from './scryfall.service';
import { SearchCardsDto } from './dto/search-cards.dto';

@Injectable()
export class CardsService {
  constructor(
    private readonly scryfallService: ScryfallService,
    @InjectModel(CardEntity.name) private cardModel: Model<CardDocument>,
  ) {}

  /**
   * Actualiza una carta existente por su id de Scryfall.
   * Retorna la carta actualizada o un error si no existe.
   */

  async updateCardById(id: string, updateData: Partial<CardEntity>) {
    const updated = await this.cardModel.findOneAndUpdate(
      { id },
      { $set: updateData },
      { new: true },
    );
    if (!updated) {
      return { error: `No existe una carta con el id ${id}` };
    }
    return updated;
  }

  /**
   * Guarda un array de cartas en la base de datos, previniendo duplicados por id.
   * Si alguna carta ya existe, retorna un error para ese id.
   */
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

  /**
   * Recibe un array de IDs de Scryfall, consulta la API y retorna los datos completos de cada carta.
   * No guarda en BD, solo consulta y retorna.
   */
  async fetchCardsByIds(cardIds: string[]) {
    const results: any[] = [];
    for (const id of cardIds) {
      try {
        const card = await this.scryfallService.getCardById(id);
        results.push(card);
      } catch (e) {
        results.push({ id, error: 'No encontrada o error en Scryfall' });
      }
      // Delay de 100ms para respetar el rate limit de Scryfall
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return results;
  }

  /**
   * Guarda un array de cartas en la base de datos, previniendo duplicados por id.
   * Si alguna carta ya existe, retorna un error para ese id.
   */
  async saveCardsToDb(cards: CardEntity[]) {
    const results: (CardEntity | { id: string; error: string })[] = [];
    for (const card of cards) {
      const exists = await this.cardModel.exists({ id: card.id });
      if (exists) {
        results.push({ id: card.id, error: 'Ya existe en la base de datos' });
        continue;
      }
      try {
        const created = await this.cardModel.create(card);
        results.push(created);
      } catch (e) {
        results.push({ id: card.id, error: 'Error al guardar en BD' });
      }
    }
    return results;
  }
  /**
   * Recibe IDs, consulta Scryfall, guarda en BD y retorna resultados y estadísticas.
   */
  async saveCardsWithStats(cardIds: string[]) {
    // 1. Consultar Scryfall por cada ID
    const cards = await this.fetchCardsByIds(cardIds);
    // 2. Guardar en BD (solo las que no tengan error)
    const validCards = cards.filter((c: any) => !c.error);
    const saveResults = await this.saveCardsToDb(validCards);
    // 3. Unir resultados de consulta y guardado
    const result = cardIds.map((id, idx) => {
      const fetchResult = cards[idx];
      if (fetchResult.error) return fetchResult;
      // Buscar resultado de guardado por id
      const saveResult = saveResults.find((r: any) => r.id === id);
      return saveResult || { id, error: 'No se pudo guardar' };
    });

    // Estadísticas
    const stats = {
      guardadas: result.filter((r: any) => r.status === 'Guardada' || r._id)
        .length,
      ya_existian: result.filter(
        (r: any) => r.error === 'Ya existe en la base de datos',
      ).length,
      no_encontradas: result.filter(
        (r: any) => r.error === 'No encontrada o error en Scryfall',
      ).length,
    };

    return { result, stats };
  }
}
