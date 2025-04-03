import { type ActiveGame } from './ActiveGame';
import { type Game } from './Game';

export interface Games {
  active?: ActiveGame;
  history: Game[];
}
