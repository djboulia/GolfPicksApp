import { useEffect, useState } from 'react';
import { compareScores } from '@/lib/util/comparescores';
import { type GamerScore } from '@/lib/models/GamerScore';
import { type Leaderboard } from '@/lib/models/Leaderboard';
import Api from '@/lib/api/api';

export function useLeaderboard(gameId: string): {
  leaderboard: Leaderboard | undefined;
  loaded: boolean;
  refresh: () => void;
  errorMessage: string | undefined;
} {
  const [leaderboard, setLeaderboard] = useState<Leaderboard>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const getGameAsync = async (id: string) => {
    console.log('getting game ', id);
    setLoaded(false);

    const leaderboard = await Api.games.leaderboard(id).catch((error) => {
      console.log('error getting game: ', error);
      setErrorMessage(error.message);
      return undefined;
    });

    // sort the leaders by lowest score in current round
    // if there are ties, sort by previous rounds
    const currentRound = leaderboard?.roundInfo?.currentRound;
    const gamers = leaderboard?.gamers;
    gamers?.sort((a: GamerScore, b: GamerScore) => {
      if (!currentRound) return 0;

      for (let i = currentRound; i >= 0; i--) {
        const result = compareScores(a.rounds[i]?.score, b.rounds[i]?.score);
        if (result !== 0) return result;
      }
      return 0;
    });

    // console.log('sorted gamers ', gamers);

    setLeaderboard(leaderboard);
    setLoaded(true);
  };

  useEffect(() => {
    void getGameAsync(gameId);
  }, [gameId]);

  // trigger a refresh of the leaderboard
  const refresh = () => {
    void getGameAsync(gameId);
  };

  return { leaderboard, loaded, refresh, errorMessage };
}
