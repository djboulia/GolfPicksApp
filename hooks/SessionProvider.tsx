import { createContext, useContext, useEffect, useState } from 'react';
import { useCurrentGamer } from './useCurrentGamer';

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  isLoggedIn: false,
  isLoading: true,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [gamer, gamerLoaded] = useCurrentGamer();

  useEffect(() => {
    console.log('SessionProvider useEffect', gamer);
    setIsLoading(!gamerLoaded);
    setIsLoggedIn(gamer ? true : false);
  }, [gamerLoaded]);

  const values = {
    signIn: () => {
      console.log('setting isLoggedIn to true');
      setIsLoggedIn(true);
    },
    signOut: () => {
      console.log('setting isLoggedIn to false');
      setIsLoggedIn(false);
    },
    isLoggedIn,
    isLoading,
  };

  console.log('SessionProvider: ', values);
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
