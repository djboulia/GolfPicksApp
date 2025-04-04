import { type Games } from '@/lib/models/Games';

export const gamesData: Games = {
  active: {
    inProgress: true,
    event: 'Tournament Name',
    eventid: '1234',
    joined: false,
  },
  history: [
    {
      event: 'Tournament History 1',
      eventid: '1234',
    },
    {
      event: 'Tournament History 2',
      eventid: '5678',
    },
    {
      event: 'Tournament History 3',
      eventid: '90123',
    },
  ],
};
