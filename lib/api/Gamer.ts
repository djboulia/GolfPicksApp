import { Platform } from 'react-native';
import { Storage } from '../Storage';

// need to use our IP address in order for Android simulator to work
const host = Platform.OS === 'android' ? '192.168.86.46' : 'localhost';
const getUrl = () => {
  return `http://${host}:3000/api/Gamers`;
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
    const url = getUrl();
    const loginUrl = url + '/login';

    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    }).catch((error) => {
      console.log('login error for URL: ', loginUrl);
      throw error;
    });

    const json = await response.json();
    if (response.status !== 200) {
      console.log('login error for URL: ', loginUrl);
      throw new Error(json.message);
    }

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

  public async logout() {
    await Storage.removeItem(GAMER_KEY);
    return true;
  }

  public async games() {
    const baseUrl = getUrl();
    const url = baseUrl + `/${this.gamerObject.id}/Games`;

    const response = await fetch(url, {
      method: 'GET',
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

    return json;
  }
}
