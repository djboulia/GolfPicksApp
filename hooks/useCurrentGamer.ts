import { useEffect, useState } from 'react';
import { Gamer } from '@/lib/api/Gamer';

export function useCurrentGamer(): [Gamer | undefined, boolean] {
  const [gamer, setGamer] = useState<Gamer | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const getGamer = async () => {
      const gamer = await Gamer.getCurrentGamer();
      setGamer(gamer);
      setLoaded(true);
    };
    getGamer();
  }, []);

  return [gamer, loaded];
}
