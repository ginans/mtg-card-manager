import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { ScryfallByPageResponse } from './interfaces/scryfall-card.interface';
import { ScryfallCardById } from './interfaces/scryfall-card-by-id.interface';

@Injectable()
export class ScryfallService {
  private readonly apiUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.apiUrl = this.configService.get<string>('SCRYFALL_API_URL') || 'https://api.scryfall.com';
  }

  async searchCards(query: string): Promise<ScryfallByPageResponse> {
    try {
      const url = `${this.apiUrl}/cards/search?format=json&include_extras=true&include_multilingual=true&include_variations=true&order=released&page=1&q=${encodeURIComponent(query)}&unique=prints`;
      const { data } = await axios.get<ScryfallByPageResponse>(url);
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.response?.data || 'Error consultando Scryfall');
    }
  }

  async getCardById(id: string): Promise<ScryfallCardById> {
    try {
      const url = `${this.apiUrl}/cards/${id}`;
      const { data } = await axios.get<ScryfallCardById>(url);
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.response?.data || 'Error consultando Scryfall');
    }
  }
}
