import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ErrorText from '@/components/ErrorText';
import { compareScores } from '@/lib/util/comparescores';
import { useLocalSearchParams } from 'expo-router';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import Loader from '@/components/Loader';
import { type Theme, useTheme } from '@react-navigation/native';
import { getCustomColors } from '@/theme/colors';
import { type GamerScore } from '@/lib/models/GamerScore';
import { type GamerPick } from '@/lib/models/GamerPick';

const TOP_SCORES = 5; // cut line for scores that count towards total

export default function DetailsScreen() {
  const params = useLocalSearchParams<{ gameId: string; gamerId: string; currentRound: string }>();
  const theme = useTheme();
  const { gameId, gamerId, currentRound } = params;
  const [errorMsg] = useState<string | undefined>(undefined);
  const { leaderboard, loaded } = useLeaderboard(gameId ?? '');
  const [gamer, setGamer] = useState<GamerScore | undefined>(undefined);

  const rounds = [1, 2, 3, 4];

  const styles = createStyles(theme);
  useEffect(() => {
    if (loaded && leaderboard) {
      console.log('leaderboard ', leaderboard);

      // find the gamer in the leaderboard
      const gamers = leaderboard.gamers;
      const gamer = gamers.find((g: GamerScore) => g.objectId === gamerId);
      console.log('gamerId', gamerId, 'found gamer', gamer);

      // sort the leaders by lowest score in current round
      // if there are ties, sort by previous rounds
      gamer?.picks?.sort((a: GamerPick, b: GamerPick) => {
        for (let i = Number(currentRound); i >= 0; i--) {
          const result = compareScores(a.rounds[i], b.rounds[i]);

          if (result !== 0) return result;
          // continue on looking at prior rounds if first round is a tie
        }
        return 0;
      });

      setGamer(gamer);
    }
  }, [loaded, leaderboard, gamerId, currentRound]);

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

          {rounds.map((round: number) => {
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

  const topFiveScore = () => {
    // only show the latest score

    const scores = gamer?.scores?.map((score: string, index: number) => {
      if (gamer?.scores?.[index + 1]) {
        return '';
      } else {
        return score;
      }
    });

    return (
      <>
        <View key={'top5'} style={styles.top5Container}>
          <Text key={'top5'} style={styles.top5}>
            Top Five
          </Text>
          {rounds.map((round: number, index: number) => {
            return (
              <Text key={round} style={styles.top5Score}>
                {scores?.[index]}
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
        {gamer ? (
          <FlatList
            data={gamer.picks}
            ListHeaderComponent={header}
            renderItem={({ item, index }) => {
              const listIndex = index;
              return (
                <>
                  {
                    /* include the scores after the top five players */
                    listIndex === TOP_SCORES && topFiveScore()
                  }
                  <View
                    style={listIndex < TOP_SCORES ? styles.playerContainer : styles.totalsContainer}
                  >
                    <Text
                      key={'name'}
                      style={listIndex < TOP_SCORES ? styles.player : styles.playerCut}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    {rounds.map((round: number, scoreIndex: number) => {
                      return (
                        <Text
                          key={round}
                          style={
                            listIndex < TOP_SCORES ? styles.playerScore : styles.playerCutScore
                          }
                        >
                          {item.rounds[scoreIndex]}
                        </Text>
                      );
                    })}
                  </View>
                </>
              );
            }}
            keyExtractor={(item) => {
              // console.log(item);
              return item.name;
            }}
          />
        ) : (
          !errorMsg && <Loader />
        )}
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

const defaultLightTextColor = '#fff';
const defaultDarkTextColor = '#000';

const baseLabelStyle = {
  color: defaultLightTextColor,
  fontSize: defaultFontSize,
  padding: 10,
  borderWidth: 1,
};

const baseScoreStyle = {
  color: defaultLightTextColor,
  fontSize: defaultFontSize,
  padding: 10,
  borderWidth: 1,
};

const createStyles = (theme: Theme) => {
  const customColors = getCustomColors(theme.dark);

  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: theme.colors.background,
    },
    titleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: theme.colors.primary,
    },
    title: {
      color: customColors.leaderboardText,
      fontSize: 20,
      fontWeight: 'bold',
      padding: 10,
      textAlign: 'center',
    },
    totalsContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: customColors.subHeader,
    },
    playerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
    },
    player: {
      ...baseLabelStyle,
      textAlign: 'left',
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
      borderWidth: 0,
      flex: 3,
    },
    playerScore: {
      ...baseScoreStyle,
      textAlign: 'center',
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
      borderWidth: 0,
      flex: 1,
    },
    playerCut: {
      ...baseLabelStyle,
      textAlign: 'left',
      color: defaultDarkTextColor,
      borderWidth: 0,
      flex: 3,
    },
    playerCutScore: {
      ...baseScoreStyle,
      textAlign: 'center',
      color: defaultDarkTextColor,
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
    top5Container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: customColors.subHeader,
    },
    top5: {
      ...baseLabelStyle,
      textAlign: 'center',
      color: theme.dark ? theme.colors.text : theme.colors.primary,
      fontWeight: 'bold',
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.text,
      borderWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      flex: 3,
    },
    top5Score: {
      ...baseScoreStyle,
      textAlign: 'center',
      color: theme.dark ? theme.colors.text : theme.colors.primary,
      fontWeight: 'bold',
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.text,
      borderWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      flex: 1,
    },

    containerInput: {
      backgroundColor: theme.colors.background,
      paddingVertical: 10,
    },
  });
};
