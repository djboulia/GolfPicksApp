import { useEffect, useState } from 'react';
import { type Gamer } from '@/lib/models/Gamer';
import Api from '@/lib/api/api';

export function useCurrentGamer(): [Gamer | undefined, boolean] {
  const [gamer, setGamer] = useState<Gamer | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const getGamer = async () => {
      const gamer = await Api.gamer.getCurrentGamer();
      console.log('getCurrentGamer: ', gamer);
      setGamer(gamer);
      setLoaded(true);
    };

    void getGamer();
  }, []);

  return [gamer, loaded];
}
