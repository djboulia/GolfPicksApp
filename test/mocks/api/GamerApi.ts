import { type Gamer } from '@/lib/models/Gamer';
import { type Games } from '@/lib/models/Games';
import { gamerData } from '../data/gamer';
import { gamesData } from '../data/games';
import { type GamerApiType } from '@/lib/api/types';

export const GamerApi: GamerApiType = {
  async login(_username: string, _password: string): Promise<Gamer | undefined> {
    return this.getCurrentGamer();
  },

  async getCurrentGamer(): Promise<Gamer | undefined> {
    return gamerData;
  },

  async logout(): Promise<boolean> {
    return true;
  },

  async games(_gamer: Gamer): Promise<Games | undefined> {
    return gamesData;
  },
};
