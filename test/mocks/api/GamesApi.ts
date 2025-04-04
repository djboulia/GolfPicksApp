import { type Game } from '@/lib/models/Game';
import { type GamerPick } from '@/lib/models/GamerPick';
import { type Leaderboard } from '@/lib/models/Leaderboard';
import { ApiFetch } from '@/lib/util/apifetch';
import { getBaseUrl } from '@/lib/util/url';
import { gameData } from '../data/game';
import { gamerPickData } from '../data/gamerpick';
import { type GamesApiType } from '@/lib/api/types';

const getUrl = () => {
  return getBaseUrl() + `/Games`;
};

export const GamesApi: GamesApiType = {
  async leaderboard(id: string): Promise<Leaderboard | undefined> {
    const baseUrl = getUrl();
    const url = baseUrl + `/${id}/leaderboard`;

    const json = await ApiFetch.get(url);

    // console.log('games: ', JSON.stringify(json));
    return json;
  },

  async gameDay(_gameid: string): Promise<Game | undefined> {
    return gameData;
  },

  async picks(_id: string, _gamerId: string): Promise<GamerPick[]> {
    return gamerPickData;
  },

  async updatePicks(id: string, gamerId: string, picks: GamerPick[]): Promise<GamerPick[]> {
    return picks;
  },
};
