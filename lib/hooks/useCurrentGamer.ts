import React from 'react';
import { Gamer } from '../api/Gamer';

export function useCurrentGamer() {
  const [gamer, setGamer] = React.useState<Gamer | undefined>(undefined);

  React.useEffect(() => {
    const getGamer = async () => {
      const gamer = await Gamer.getCurrentGamer();
      setGamer(gamer);
    };
    getGamer();
  }, []);

  return gamer;
}
