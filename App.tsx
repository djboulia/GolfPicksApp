import React, { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import LogoutScreen from './components/LogoutScreen';
import AboutScreen from './components/AboutScreen';
import ProfileScreen from './components/ProfileScreen';
import { useCurrentGamer } from './lib/hooks/useCurrentGamer';
import { AuthContext } from './lib/AuthContext';
import GameScreen from './components/GameScreen';
import GameDetails from './components/GameDetails';
import PicksScreen from './components/PIcksScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const gamer = useCurrentGamer();
  const [loggedIn, setLoggedIn] = React.useState(false);

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        console.log('signing in');
        setLoggedIn(true);
      },
      signOut: () => {
        console.log('signing out');
        setLoggedIn(false);
      },
    }),
    [],
  );

  useEffect(() => {
    // allow rotattion to change the layout
    ScreenOrientation.unlockAsync();

    if (gamer) {
      console.log('gamer found, setting logged in to true');
      setLoggedIn(true);
    }
  }, [gamer]);

  function Games() {
    return (
      <Stack.Navigator>
        <Drawer.Screen
          name="Games"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Game"
          options={{
            drawerLabel: 'Leaderboard',
            title: 'Leaderboard',
          }}
          component={GameScreen}
        />
        <Drawer.Screen
          name="GameDetails"
          options={{
            drawerLabel: 'Details',
            title: 'Details',
          }}
          component={GameDetails}
        />
        <Drawer.Screen name="Player" component={ProfileScreen} />
        <Drawer.Screen name="Picks" component={PicksScreen} />
      </Stack.Navigator>
    );
  }

  function Root() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={Games}
          options={{
            drawerLabel: 'My Games',
            title: 'My Games',
          }}
        />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Logout" component={LogoutScreen} />
      </Drawer.Navigator>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {!loggedIn ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
