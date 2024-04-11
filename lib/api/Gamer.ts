import { Platform } from 'react-native';
import { Storage } from '../Storage';
import { getBaseUrl } from '../util/url';
import { ApiFetch } from '../util/fetch';

const getUrl = () => {
  return getBaseUrl() + `/Gamers`;
};

const GAMER_KEY = 'gamer';

type GamerObject = {
  id: string;
  name: string;
  admin: boolean;
  username: string;
  password: string;
};

export class Gamer {
  gamerObject: GamerObject;

  constructor(gamerObject: GamerObject) {
    this.gamerObject = gamerObject;
  }

  static async login(username: string, password: string) {
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
      const gamerObject = JSON.parse(gamer);
      return new Gamer(gamerObject);
    }
    return undefined;
  }

  public getName(): string {
    return this.gamerObject.name;
  }

  public getId(): string {
    console.log('gamerObject', this.gamerObject);
    return this.gamerObject.id;
  }

  public async logout() {
    await Storage.removeItem(GAMER_KEY);
    return true;
  }

  public async games() {
    const baseUrl = getUrl();
    const url = baseUrl + `/${this.gamerObject.id}/Games`;

    const json = await ApiFetch.get(url);

    // console.log('games: ', JSON.stringify(json));
    return json;
  }
}
