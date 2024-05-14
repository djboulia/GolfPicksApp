import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ErrorText from './ErrorText';
import { useCurrentGamer } from '../lib/hooks/useCurrentGamer';
import TournamentItem from './TournamentItem';
import Loader from './Loader';
import { AuthContext } from '../lib/AuthContext';
import CurrentGameHeader from './CurrentGameHeader';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const context = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const gamer = useCurrentGamer();
  const [games, setGames] = useState<any>();
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const getGamesAsync = async () => {
    setRefreshing(true);

    console.log('getting games for gamer ', gamer?.getName());
    const games = await gamer?.games().catch((error) => {
      setErrorMsg(error.message);
    });

    // console.log('games ', games);
    setGames(games || []);
    setRefreshing(false);
  };

  useEffect(() => {
    if (gamer) {
      getGamesAsync();
    }
  }, [gamer]);

  const onRefresh = () => {
    console.log('onRefresh HomeScreen');
    getGamesAsync();
  };

  // if we couldn't get the game info, make the user sign in again
  if (errorMsg) {
    context.signOut();
  }

  const onClick = (id: string) => {
    navigation.navigate('Game', {
      id: id,
    });
  };

  const updatePicks = (gameid: string, name: string) => {
    console.log('updatePicks ', gameid, name);
    navigation.navigate('Picks', {
      gameid: gameid,
      name: name,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Text style={styles.title}>Games for {gamer?.getName()}</Text>

        <CurrentGameHeader activeGame={games?.active} onClick={updatePicks} />

        {games?.active?.inProgress && (
          <View style={{ backgroundColor: '#dff0d8' }}>
            <TournamentItem name={games.active.event} id={games.active.eventid} onClick={onClick} />
          </View>
        )}

        {games ? (
          <FlatList
            data={games.history}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={({ item }) => (
              <TournamentItem
                name={item?.event ? item.event : ''}
                id={item?.eventid}
                onClick={onClick}
              />
            )}
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
