import { Platform } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SessionProvider } from '@/hooks/SessionProvider';

import { useColorScheme } from 'react-native';
import { getTheme } from '@/theme/colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      // allow rotattion to change the layout
      ScreenOrientation.unlockAsync();
    }
  }, []);

  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SessionProvider>
      <ThemeProvider value={getTheme(colorScheme === 'dark')}>
        <Slot />
      </ThemeProvider>
    </SessionProvider>
  );
}
