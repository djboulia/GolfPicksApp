import { type GamerScore } from './GamerScore';
import { type RoundInformation } from './RoundInformation';

export interface Leaderboard {
  name: string;
  gamers: GamerScore[];
  roundInfo: RoundInformation;
}
