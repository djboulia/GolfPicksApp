import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import ErrorText from './ErrorText';
import { compareScores } from '../lib/util/comparescores';

export default function GameDetails({ route, navigation }: { route: any; navigation: any }) {
  const { gamer, currentRound } = route.params;
  const [errorMsg] = useState<string | undefined>(undefined);

  const rounds = [1, 2, 3, 4];

  // sort the leaders by lowest score in current round
  // if there are ties, sort by previous rounds
  gamer.picks?.sort((a: any, b: any) => {
    for (let i = currentRound; i >= 0; i--) {
      const result = compareScores(a.rounds[i], b.rounds[i]);

      if (result !== 0) return result;
      // continue on looking at prior rounds if first round is a tie
    }
    return 0;
  });

  const [orientation, setOrientation] = useState<ScreenOrientation.Orientation | null>(null);

  useEffect(() => {
    checkOrientation();
    const subscription = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const checkOrientation = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    setOrientation(orientation);
  };
  const handleOrientationChange = (o: any) => {
    console.log('orientation changed', o.orientationInfo.orientation);
    setOrientation(o.orientationInfo.orientation);
  };
  console.log('orientation', orientation);

  const header = () => {
    return (
      <>
        <View key={'title'} style={styles.titleContainer}>
          <Text style={styles.title}>Picks for {gamer?.name}</Text>
        </View>
        <View key={'header'} style={styles.totalsContainer}>
          <Text key={'header'} style={styles.header}>
            {' '}
          </Text>

          {rounds.map((round: any) => {
            return (
              <Text key={round} style={styles.headerScore}>
                {round}
              </Text>
            );
          })}
        </View>
      </>
    );
  };

  const footer = () => {
    return (
      <>
        <View key={'total'} style={styles.totalsContainer}>
          <Text key={'total'} style={styles.totals}>
            Total
          </Text>
          {rounds.map((round: any, index: number) => {
            return (
              <Text key={round} style={styles.totalsScore}>
                {gamer.totals[index]}
              </Text>
            );
          })}
        </View>
        <View key={'top5'} style={styles.top5Container}>
          <Text key={'top5'} style={styles.top5}>
            Top Five
          </Text>
          {rounds.map((round: any, index: number) => {
            return (
              <Text key={round} style={styles.top5Score}>
                {gamer.scores[index]}
              </Text>
            );
          })}
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <>
        <FlatList
          data={gamer.picks}
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          renderItem={({ item }) => (
            <View style={styles.playerContainer}>
              <Text key={'name'} style={styles.player} numberOfLines={1}>
                {item.name}
              </Text>
              {rounds.map((round: any, index: number) => {
                return (
                  <Text key={round} style={styles.playerScore}>
                    {item.rounds[index]}
                  </Text>
                );
              })}
            </View>
          )}
          keyExtractor={(item) => {
            // console.log(item);
            return item.name;
          }}
        />
      </>

      {errorMsg && (
        <View style={styles.containerInput}>
          <ErrorText text={errorMsg || ''} />
        </View>
      )}
    </View>
  );
}

const defaultFontSize = 18;

const defaultBgColor = '#fff';
const defaultLightTextColor = '#fff';
const defaultDarkTextColor = '#000';
const headerBgColor = '#005500';
const subHeaderBgColor = '#dff0d8';
const playerBgColor = '#fff';
const top5BgColor = '#1e90ff';

const baseLabelStyle = {
  color: defaultLightTextColor,
  fontSize: defaultFontSize,
  padding: 10,
  borderColor: 'gray',
  borderWidth: 1,
};

const baseScoreStyle = {
  color: defaultLightTextColor,
  fontSize: defaultFontSize,
  padding: 10,
  borderColor: 'gray',
  borderWidth: 1,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: defaultBgColor,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: headerBgColor,
  },
  title: {
    color: defaultLightTextColor,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  totalsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: subHeaderBgColor,
  },
  playerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: defaultBgColor,
  },
  player: {
    ...baseLabelStyle,
    textAlign: 'left',
    color: defaultDarkTextColor,
    backgroundColor: playerBgColor,
    borderWidth: 0,
    flex: 3,
  },
  playerScore: {
    ...baseScoreStyle,
    textAlign: 'center',
    color: defaultDarkTextColor,
    backgroundColor: playerBgColor,
    borderWidth: 0,
    flex: 1,
  },
  header: {
    ...baseLabelStyle,
    textAlign: 'center',
    color: defaultDarkTextColor,
    fontWeight: 'bold',
    borderWidth: 0,
    flex: 3,
  },
  headerScore: {
    ...baseScoreStyle,
    textAlign: 'center',
    color: defaultDarkTextColor,
    fontWeight: 'bold',
    borderWidth: 0,
    flex: 1,
  },
  totals: {
    ...baseLabelStyle,
    textAlign: 'center',
    color: defaultDarkTextColor,
    flex: 3,
  },
  totalsScore: {
    ...baseScoreStyle,
    textAlign: 'center',
    color: defaultDarkTextColor,
    flex: 1,
  },
  top5Container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: top5BgColor,
  },
  top5: {
    ...baseLabelStyle,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 3,
  },
  top5Score: {
    ...baseScoreStyle,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
  },

  containerInput: {
    backgroundColor: defaultBgColor,
    paddingVertical: 10,
  },
});
