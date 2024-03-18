import { getBaseUrl } from '../util/url';

const getUrl = () => {
  return getBaseUrl() + `/Games`;
};

export class Games {
  static async leaderboard(id: string) {
    const baseUrl = getUrl();
    const url = baseUrl + `/${id}/leaderboard`;

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).catch((error) => {
      console.log('error for URL: ', url);
      throw error;
    });

    const json = await response.json();
    if (response.status !== 200) {
      console.log('error for URL: ', url);
      throw new Error(json.message);
    }

    // console.log('games: ', JSON.stringify(json));
    return json;
  }
}
