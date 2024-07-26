import { useEffect, useState } from 'react';
import { Games } from '@/lib/api/Games';
import { compareScores } from '@/lib/util/comparescores';

export function useLeaderboard(gameId: string): {
  leaderboard: any;
  loaded: boolean;
  refresh: () => void;
  errorMessage: string | undefined;
} {
  const [leaderboard, setLeaderboard] = useState<any>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const getGameAsync = async (id: string) => {
    console.log('getting game ', id);
    setLoaded(false);

    const leaderboard = await Games.leaderboard(id).catch((error) => {
      console.log('error getting game: ', error);
      setErrorMessage(error.message);
    });

    // sort the leaders by lowest score in current round
    // if there are ties, sort by previous rounds
    const currentRound = leaderboard?.roundInfo?.currentRound;
    const gamers = leaderboard?.gamers;
    gamers?.sort((a: any, b: any) => {
      for (let i = currentRound; i >= 0; i--) {
        const result = compareScores(a.rounds[i]?.score, b.rounds[i]?.score);
        if (result !== 0) return result;
      }
      return 0;
    });

    // console.log('sorted gamers ', gamers);

    setLeaderboard(leaderboard || []);
    setLoaded(true);
  };

  useEffect(() => {
    getGameAsync(gameId);
  }, []);

  // trigger a refresh of the leaderboard
  const refresh = () => {
    getGameAsync(gameId);
  };

  return { leaderboard, loaded, refresh, errorMessage };
}
