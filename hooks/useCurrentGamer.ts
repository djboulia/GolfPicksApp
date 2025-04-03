import { useEffect, useState } from 'react';
import { GamerApi } from '@/lib/api/GamerApi';
import { type Gamer } from '@/lib/models/Gamer';

export function useCurrentGamer(): [Gamer | undefined, boolean] {
  const [gamer, setGamer] = useState<Gamer | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const getGamer = async () => {
      const gamer = await GamerApi.getCurrentGamer();
      console.log('getCurrentGamer: ', gamer);
      setGamer(gamer);
      setLoaded(true);
    };

    void getGamer();
  }, []);

  return [gamer, loaded];
}
