import { type Game } from '../models/Game';
import { type Gamer } from '../models/Gamer';
import { type GamerPick } from '../models/GamerPick';
import { type Games } from '../models/Games';
import { type Leaderboard } from '../models/Leaderboard';
import { type Event } from '../models/Event';

export interface GamesApiType {
  leaderboard(id: string): Promise<Leaderboard | undefined>;

  gameDay(gameid: string): Promise<Game | undefined>;

  picks(id: string, gamerId: string): Promise<GamerPick[]>;

  updatePicks(id: string, gamerId: string, picks: GamerPick[]): Promise<GamerPick[]>;
}

export interface GamerApiType {
  login(username: string, password: string): Promise<Gamer | undefined>;

  getCurrentGamer(): Promise<Gamer | undefined>;

  logout(): Promise<boolean>;

  games(gamer: Gamer): Promise<Games | undefined>;
}

export interface EventApiType {
  get(eventId: string): Promise<Event | undefined>;
}

export interface ApiType {
  games: GamesApiType;
  gamer: GamerApiType;
  event: EventApiType;
}
