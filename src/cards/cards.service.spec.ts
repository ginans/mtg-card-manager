import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CardsService } from './cards.service';
import { ScryfallService } from './scryfall.service';
import { CardEntity } from './card.entity';
import { Model } from 'mongoose';

describe('CardsService', () => {
  let service: CardsService;
  let scryfallService: ScryfallService;
  let cardModel: Model<CardEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: ScryfallService,
          useValue: {
            searchCards: jest.fn(),
            getCardById: jest.fn(),
          },
        },
        {
          provide: getModelToken(CardEntity.name),
          useValue: {
            findOneAndUpdate: jest.fn(),
            exists: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
    scryfallService = module.get<ScryfallService>(ScryfallService);
    cardModel = module.get<Model<CardEntity>>(getModelToken(CardEntity.name));
  });

  describe('updateCardById', () => {
    it('debe actualizar y retornar la carta si existe', async () => {
      const updatedCard = { id: 'abc', name: 'Lotus' };
      (cardModel.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedCard);
      const result = await service.updateCardById('abc', { name: 'Lotus' });
      expect(result).toEqual(updatedCard);
      expect(cardModel.findOneAndUpdate).toHaveBeenCalledWith(
        { id: 'abc' },
        { $set: { name: 'Lotus' } },
        { new: true },
      );
    });
    it('debe retornar error si la carta no existe', async () => {
      (cardModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);
      const result = await service.updateCardById('nope', { name: 'X' });
      expect(result).toEqual({ error: 'No existe una carta con el id nope' });
    });
  });

  describe('searchCardsWithFields', () => {
    it('debe mapear los campos y retornar los primeros 5 resultados', async () => {
      const scryfallData = {
        data: [
          {
            id: '1',
            name: 'A',
            set_name: 'S',
            image_uris: { normal: 'img' },
            mana_cost: '{1}',
            oracle_text: 'txt',
          },
          {
            id: '2',
            name: 'B',
            set_name: 'S',
            image_uris: { normal: 'img' },
            mana_cost: '{2}',
            oracle_text: 'txt',
          },
          {
            id: '3',
            name: 'C',
            set_name: 'S',
            image_uris: { normal: 'img' },
            mana_cost: '{3}',
            oracle_text: 'txt',
          },
          {
            id: '4',
            name: 'D',
            set_name: 'S',
            image_uris: { normal: 'img' },
            mana_cost: '{4}',
            oracle_text: 'txt',
          },
          {
            id: '5',
            name: 'E',
            set_name: 'S',
            image_uris: { normal: 'img' },
            mana_cost: '{5}',
            oracle_text: 'txt',
          },
          {
            id: '6',
            name: 'F',
            set_name: 'S',
            image_uris: { normal: 'img' },
            mana_cost: '{6}',
            oracle_text: 'txt',
          },
        ],
      };
      (scryfallService.searchCards as jest.Mock).mockResolvedValue(
        scryfallData,
      );
      const dto = { name: 'Lotus' };
      const result = await service.searchCardsWithFields(dto as any);
      expect(result).toHaveLength(5);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('set_name');
      expect(result[0]).toHaveProperty('image');
      expect(result[0]).toHaveProperty('mana_cost');
      expect(result[0]).toHaveProperty('oracle_text');
    });
  });

  describe('fetchCardsByIds', () => {
    it('debe retornar los datos de las cartas consultadas', async () => {
      (scryfallService.getCardById as jest.Mock)
        .mockResolvedValueOnce({ id: '1', name: 'A' })
        .mockResolvedValueOnce({ id: '2', name: 'B' });
      const ids = ['1', '2'];
      const result = await service.fetchCardsByIds(ids);
      expect(result).toEqual([
        { id: '1', name: 'A' },
        { id: '2', name: 'B' },
      ]);
    });
    it('debe retornar error si alguna carta no se encuentra', async () => {
      (scryfallService.getCardById as jest.Mock)
        .mockResolvedValueOnce({ id: '1', name: 'A' })
        .mockRejectedValueOnce(new Error('not found'));
      const ids = ['1', '2'];
      const result = await service.fetchCardsByIds(ids);
      expect(result[1]).toEqual({
        id: '2',
        error: 'No encontrada o error en Scryfall',
      });
    });
  });

  describe('saveCardsToDb', () => {
    it('debe guardar cartas nuevas y retornar el objeto creado', async () => {
      (cardModel.exists as jest.Mock).mockResolvedValue(false);
      (cardModel.create as jest.Mock).mockResolvedValue({ id: '1', name: 'A' });
      const cards = [{ id: '1', name: 'A' }];
      const result = await service.saveCardsToDb(cards as any);
      expect(result[0]).toEqual({ id: '1', name: 'A' });
    });
    it('debe retornar error si la carta ya existe', async () => {
      (cardModel.exists as jest.Mock).mockResolvedValue(true);
      const cards = [{ id: '1', name: 'A' }];
      const result = await service.saveCardsToDb(cards as any);
      expect(result[0]).toEqual({
        id: '1',
        error: 'Ya existe en la base de datos',
      });
    });
    it('debe retornar error si ocurre un error al guardar', async () => {
      (cardModel.exists as jest.Mock).mockResolvedValue(false);
      (cardModel.create as jest.Mock).mockRejectedValue(new Error('fail'));
      const cards = [{ id: '1', name: 'A' }];
      const result = await service.saveCardsToDb(cards as any);
      expect(result[0]).toEqual({ id: '1', error: 'Error al guardar en BD' });
    });
  });

  describe('saveCardsWithStats', () => {
    it('debe consultar, guardar y retornar resultados y estadísticas', async () => {
      jest.spyOn(service, 'fetchCardsByIds').mockResolvedValue([
        { id: '1', name: 'A' },
        { id: '2', error: 'No encontrada o error en Scryfall' },
        { id: '3', name: 'C' },
      ] as any);
      jest.spyOn(service, 'saveCardsToDb').mockResolvedValue([
        { id: '1', status: 'Guardada' },
        { id: '3', error: 'Ya existe en la base de datos' },
      ] as any);
      const ids = ['1', '2', '3'];
      const result = await service.saveCardsWithStats(ids);
      expect(result.result).toHaveLength(3);
      expect(result.stats).toEqual({
        guardadas: 1,
        ya_existian: 1,
        no_encontradas: 1,
      });
    });
  });

  // Más pruebas unitarias pueden agregarse para los otros métodos siguiendo este patrón
});
