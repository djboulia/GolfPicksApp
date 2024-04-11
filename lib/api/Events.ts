import { ApiFetch } from '../util/apifetch';
import { getBaseUrl } from '../util/url';

const getUrl = () => {
  return getBaseUrl() + `/Events`;
};

export class Events {
  static async get(eventid: string) {
    const baseUrl = getUrl();
    const url = baseUrl + `/${eventid}/deep?playerSort=ranking`;

    const json = await ApiFetch.get(url);

    // console.log('event: ', JSON.stringify(json));
    return json;
  }
}
