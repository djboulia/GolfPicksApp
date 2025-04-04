import { type Event } from '@/lib/models/Event';
import { eventData } from '../data/event';
import { type EventApiType } from '@/lib/api/types';

export const EventApi: EventApiType = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(eventid: string): Promise<Event | undefined> {
    return eventData;
  },
};
