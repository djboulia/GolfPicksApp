import { type Game } from '../models/Game';
import { type GamerPick } from '../models/GamerPick';
import { type Leaderboard } from '../models/Leaderboard';
import { ApiFetch } from '../util/apifetch';
import { getBaseUrl } from '../util/url';
import { type GamesApiType } from './types';

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

  async gameDay(gameid: string): Promise<Game | undefined> {
    const baseUrl = getUrl();
    const url = baseUrl + `/${gameid}/gameDay`;

    console.log('url: ', url);

    const json = await ApiFetch.get(url);

    // console.log('games: ', JSON.stringify(json));
    return json;
  },

  async picks(id: string, gamerId: string): Promise<GamerPick[]> {
    const baseUrl = getUrl();
    const url = baseUrl + `/${id}/Gamers/${gamerId}/picks`;

    console.log('url: ', url);

    const json = await ApiFetch.get(url);

    // console.log('games: ', JSON.stringify(json));
    return json?.picks;
  },

  async updatePicks(id: string, gamerId: string, picks: GamerPick[]): Promise<GamerPick[]> {
    const baseUrl = getUrl();
    const url = baseUrl + `/${id}/Gamers/${gamerId}/picks`;

    console.log('url: ', url);

    const json = await ApiFetch.post(url, JSON.stringify(picks));

    // console.log('games: ', JSON.stringify(json));
    return json;
  },
};
