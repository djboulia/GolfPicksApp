import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import ErrorText from './ErrorText';
import LeaderboardItem from './LeaderboardItem';
import { Games } from '../lib/api/Games';
import Loader from './Loader';

export default function GameScreen({ route, navigation }: { route: any; navigation: any }) {
  const { id } = route.params;
  const [errorMsg] = React.useState<string | undefined>(undefined);
  const [leaderboard, setLeaderboard] = React.useState<any>();

  useEffect(() => {
    const getGameAsync = async (id: string) => {
      const leaderboard = await Games.leaderboard(id);
      setLeaderboard(leaderboard || []);
    };

    console.log('getting game ', id);
    getGameAsync(id);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        {leaderboard ? (
          <>
            <Text style={styles.title}>{leaderboard?.name}</Text>
            <FlatList
              data={leaderboard.gamers}
              renderItem={({ item }) => <LeaderboardItem item={item} />}
              keyExtractor={(item) => {
                console.log(item);
                return item.objectId;
              }}
            />
          </>
        ) : (
          <Loader />
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
    backgroundColor: '#fff',
    color: '#005500',
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
