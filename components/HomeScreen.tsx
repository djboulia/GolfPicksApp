import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from './Button';
import ErrorText from './ErrorText';
import { useCurrentGamer } from '../lib/hooks/useCurrentGamer';
import { AuthContext } from '../lib/AuthContext';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [errorMsg, setErrorMsg] = React.useState<string | undefined>(undefined);
  const gamer = useCurrentGamer();
  const [games, setGames] = React.useState([]);

  const { signOut } = React.useContext(AuthContext);

  useEffect(() => {
    const getGamesAsync = async () => {
      console.log('getting games for gamer ', gamer?.getName());
      const games = await gamer?.games();
      setGames(games || []);
    };

    if (gamer) {
      getGamesAsync();
    }
  }, [gamer]);

  async function logout() {
    console.log('logging out');
    try {
      await gamer?.logout();
      signOut();
    } catch (error) {
      console.log('logout error: ', error);
      setErrorMsg('Error logging out.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Text style={styles.title}>Logged in user {gamer?.getName()}</Text>

        {games.map((game: any, index: number) => {
          return <Text key={index}> {JSON.stringify(game)} </Text>;
        })}

        <Button
          label="Logout"
          onPress={() => {
            logout();
          }}
        />
      </View>
      {errorMsg && (
        <View style={styles.containerInput}>
          <ErrorText text={errorMsg || ''} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  containerInput: {
    backgroundColor: '#fff',
    padding: 10,
  },
  input: {
    width: 300,
    height: 40,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
