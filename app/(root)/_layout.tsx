import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';

import { useSession } from '@/hooks/SessionProvider';
import { useCurrentGamer } from '@/hooks/useCurrentGamer';

export default function RootLayout() {
  const [gamer, gamerLoaded] = useCurrentGamer();
  const { isLoggedIn, signIn } = useSession();

  useEffect(() => {
    console.log('RootLayout useEffect', gamer);
    if (gamer) {
      signIn();
    }
  }, [gamer]);

  console.log('RootLayout gamerLoaded ', gamerLoaded, 'isLoggedIn ', isLoggedIn);

  if (!gamerLoaded) {
    return null;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!isLoggedIn) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    console.log('not logged in, redirecting to login');
    return <Redirect href="/login" />;
  }

  return (
    // <Stack />

    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="games"
          options={{
            drawerLabel: 'My Games',
            title: 'My Games',
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: 'About',
            title: 'About',
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
          }}
        />
        <Drawer.Screen
          name="logout"
          options={{
            title: 'Logout',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
