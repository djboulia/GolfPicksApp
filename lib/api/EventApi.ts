import { ApiFetch } from '../util/apifetch';
import { getBaseUrl } from '../util/url';
import { type Event } from '../models/Event';
import { type EventApiType } from './types';

const getUrl = () => {
  return getBaseUrl() + `/Events`;
};

export const EventApi: EventApiType = {
  async get(eventId: string): Promise<Event | undefined> {
    const baseUrl = getUrl();
    const url = baseUrl + `/${eventId}/deep?playerSort=ranking`;

    const json = await ApiFetch.get(url);

    // console.log('event: ', JSON.stringify(json));
    return json;
  },
};
