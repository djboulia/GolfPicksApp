import { ApiFetch } from '../util/apifetch';
import { getBaseUrl } from '../util/url';
import { type Event } from '../models/Event';

const getUrl = () => {
  return getBaseUrl() + `/Events`;
};

export class EventApi {
  static async get(eventid: string): Promise<Event | undefined> {
    const baseUrl = getUrl();
    const url = baseUrl + `/${eventid}/deep?playerSort=ranking`;

    const json = await ApiFetch.get(url);

    // console.log('event: ', JSON.stringify(json));
    return json;
  }
}
