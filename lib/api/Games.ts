import { ApiFetch } from '../util/fetch';
import { getBaseUrl } from '../util/url';

const getUrl = () => {
  return getBaseUrl() + `/Games`;
};

export class Games {
  static async leaderboard(id: string) {
    const baseUrl = getUrl();
    const url = baseUrl + `/${id}/leaderboard`;

    const json = await ApiFetch.get(url);

    // console.log('games: ', JSON.stringify(json));
    return json;
  }

  static async gameDay(gameid: string) {
    const baseUrl = getUrl();
    const url = baseUrl + `/${gameid}/gameDay`;

    console.log('url: ', url);

    const json = await ApiFetch.get(url);

    // console.log('games: ', JSON.stringify(json));
    return json;
  }

  static async picks(id: string, gamerId: string) {
    const baseUrl = getUrl();
    const url = baseUrl + `/${id}/Gamers/${gamerId}/picks`;

    console.log('url: ', url);

    const json = await ApiFetch.get(url);

    // console.log('games: ', JSON.stringify(json));
    return json;
  }

  static async updatePicks(id: string, gamerId: string, picks: any[]) {
    const baseUrl = getUrl();
    const url = baseUrl + `/${id}/Gamers/${gamerId}/picks`;

    console.log('url: ', url);

    const json = await ApiFetch.post(url, JSON.stringify(picks));

    // console.log('games: ', JSON.stringify(json));
    return json;
  }
}
