import { type GamerPick } from './GamerPick';
import { type Round } from './Round';

export interface GamerScore {
  objectId: string;
  eventid: string;
  name: string;
  score: number;
  rounds: Round[];
  picks: GamerPick[];
  totals: string[];
  scores: string[];
}
