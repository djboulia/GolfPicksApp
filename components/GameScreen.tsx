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

    // console.log('getting game ', id);
    getGameAsync(id);
  }, []);

  const currentRound = leaderboard?.roundInfo?.currentRound;

  const gamers = leaderboard?.gamers;
  gamers?.sort((a: any, b: any) => {
    const roundA = a.rounds[currentRound - 1];
    const roundB = b.rounds[currentRound - 1];
    return roundA.score - roundB.score;
  });

  const onClick = (gamer: any) => {
    console.log('clicked on ', gamer);
    navigation.navigate('GameDetails', {
      gamer: gamer,
    });
  };

  const header = () => {
    return (
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{leaderboard?.name}</Text>
        </View>
        <View style={styles.leaderboardContainer}>
          <Text style={styles.leaderboardTitle}>Game Leaderboard</Text>
          <Text style={styles.leaderboardTitle}>Round {currentRound}</Text>
        </View>
      </>
    );
  };

  const footer = () => {
    return (
      <View style={styles.leaderboardContainer}>
        <Text style={styles.leaderboardRoundLeader}>Round Leader</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        {leaderboard ? (
          <>
            <FlatList
              data={gamers}
              ListHeaderComponent={header}
              ListFooterComponent={footer}
              renderItem={({ item }) => (
                <LeaderboardItem item={item} currentRound={currentRound} onClick={onClick} />
              )}
              keyExtractor={(item) => {
                // console.log(item);
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
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    backgroundColor: '#fff',
    color: '#000000',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  containerInput: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  leaderboardContainer: {
    backgroundColor: '#005500',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 20,
  },
  leaderboardTitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
  },
  leaderboardRoundLeader: {
    color: '#ff0',
    fontSize: 20,
    padding: 10,
  },
});
