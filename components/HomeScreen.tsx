import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import ErrorText from './ErrorText';
import { useCurrentGamer } from '../lib/hooks/useCurrentGamer';
import TournamentItem from './TournamentItem';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [errorMsg] = React.useState<string | undefined>(undefined);
  const gamer = useCurrentGamer();
  const [games, setGames] = React.useState<any>();

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

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Text style={styles.title}>Logged in user {gamer?.getName()}</Text>

        {games ? (
          <FlatList
            data={games.history}
            renderItem={({ item }) => <TournamentItem event={item.event} />}
            keyExtractor={(item) => item.eventid}
          />
        ) : (
          <Text>Loading...</Text>
        )}
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
