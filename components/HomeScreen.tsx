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

  const testData = [
    {
      event: 'event 1',
      eventid: '1',
    },
    {
      event: 'event 2',
      eventid: '2',
    },
    {
      event: 'event 3',
      eventid: '3',
    },
    {
      event: 'event 4',
      eventid: '4',
    },
    {
      event: 'event 5',
      eventid: '5',
    },
    {
      event: 'event 6',
      eventid: '6',
    },
    {
      event: 'event 7',
      eventid: '7',
    },
    {
      event: 'event 8',
      eventid: '8',
    },
    {
      event: 'event 9',
      eventid: '9',
    },
    {
      event: 'event 10',
      eventid: '10',
    },
    {
      event: 'event 11',
      eventid: '11',
    },
    {
      event: 'event 12',
      eventid: '12',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Text style={styles.title}>Logged in user {gamer?.getName()}</Text>

        {games ? (
          <FlatList
            data={games.history}
            renderItem={({ item }) => <TournamentItem event={item.event} />}
            keyExtractor={(item) => {
              console.log(item);
              return item.eventid;
            }}
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
