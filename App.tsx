import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCurrentGamer } from './lib/hooks/useCurrentGamer';

const Stack = createNativeStackNavigator();
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import { AuthContext } from './lib/AuthContext';

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
    if (gamer) {
      setLoggedIn(true);
    }
  }, [gamer]);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {!loggedIn ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
