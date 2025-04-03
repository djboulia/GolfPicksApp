import { Platform } from 'react-native';
import { Storage } from '../Storage';
import { getBaseUrl } from '../util/url';
import { ApiFetch } from '../util/apifetch';
import { type Gamer } from '../models/Gamer';
import { type Games } from '../models/Games';

const getUrl = () => {
  return getBaseUrl() + `/Gamers`;
};

const GAMER_KEY = 'gamer';

export class GamerApi {
  static async login(username: string, password: string): Promise<Gamer | undefined> {
    const baseUrl = getUrl();
    const url = baseUrl + '/login';

    const json = await ApiFetch.post(
      url,
      JSON.stringify({ username: username, password: password }),
    ).catch((error) => {
      console.log('login error for URL: ', url);
      if (Platform.OS === 'android') {
        console.log(`is your local ip address: ${getBaseUrl()}?`);
      }
      throw error;
    });

    // set current gamer in app storage
    await Storage.setItem(GAMER_KEY, JSON.stringify(json));

    return this.getCurrentGamer();
  }

  static async getCurrentGamer(): Promise<Gamer | undefined> {
    const gamer = await Storage.getItem(GAMER_KEY);
    if (gamer) {
      const gamerObject = JSON.parse(gamer) as Gamer;
      return gamerObject;
    }
    return undefined;
  }

  static async logout(): Promise<boolean> {
    await Storage.removeItem(GAMER_KEY);
    return true;
  }

  static async games(gamer: Gamer): Promise<Games | undefined> {
    const baseUrl = getUrl();
    const url = baseUrl + `/${gamer.id}/Games`;

    const json = await ApiFetch.get(url);
    return json;
  }
}
