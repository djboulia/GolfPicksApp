import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import ErrorText from './ErrorText';
import { useCurrentGamer } from '../lib/hooks/useCurrentGamer';
import TournamentItem from './TournamentItem';
import Loader from './Loader';
import { AuthContext } from '../lib/AuthContext';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const context = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const gamer = useCurrentGamer();
  const [games, setGames] = useState<any>();

  useEffect(() => {
    const getGamesAsync = async () => {
      console.log('getting games for gamer ', gamer?.getName());
      const games = await gamer?.games().catch((error) => {
        setErrorMsg(error.message);
      });
      setGames(games || []);
    };

    if (gamer) {
      getGamesAsync();
    }
  }, [gamer]);

  // if we couldn't get the game info, make the user sign in again
  if (errorMsg) {
    context.signOut();
  }

  const onClick = (id: string) => {
    navigation.navigate('Game', {
      id: id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Text style={styles.title}>Games for {gamer?.getName()}</Text>

        {games ? (
          <FlatList
            data={games.history}
            renderItem={({ item }) => <TournamentItem item={item} onClick={onClick} />}
            keyExtractor={(item) => {
              // console.log(item);
              return item.eventid;
            }}
          />
        ) : (
          !errorMsg && <Loader />
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
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    padding: 10,
  },
  title: {
    backgroundColor: '#005500',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
  },
  containerInput: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  input: {
    width: 300,
    height: 40,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
