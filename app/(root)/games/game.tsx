import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ErrorText from '@/components/ErrorText';
import LeaderboardItem from '@/components/LeaderboardItem';
import { Games } from '@/lib/api/Games';
import Loader from '@/components/Loader';
import LeaderboardHeader from '@/components/LeaderboardHeader';
import { compareScores } from '@/lib/util/comparescores';
import { useSession } from '@/hooks/SessionProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Theme, useTheme } from '@react-navigation/native';
import { getCustomColors } from '@/theme/colors';

export default function GameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;
  const context = useSession();
  const theme = useTheme();
  const [errorMsg, setErrorMessage] = useState<string | undefined>(undefined);
  const [leaderboard, setLeaderboard] = useState<any>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getGameAsync = async (id: string) => {
    console.log('getting game ', id);

    setRefreshing(true);

    const leaderboard = await Games.leaderboard(id).catch((error) => {
      console.log('error getting game: ', error);
      setErrorMessage(error.message);
    });

    // sort the leaders by lowest score in current round
    // if there are ties, sort by previous rounds
    const currentRound = leaderboard?.roundInfo?.currentRound;
    const gamers = leaderboard?.gamers;
    gamers?.sort((a: any, b: any) => {
      for (let i = currentRound; i >= 0; i--) {
        const result = compareScores(a.rounds[i]?.score, b.rounds[i]?.score);
        if (result !== 0) return result;
      }
      return 0;
    });

    // console.log('sorted gamers ', gamers);

    setLeaderboard(leaderboard || []);
    setRefreshing(false);
  };

  useEffect(() => {
    // console.log('getting game ', id);
    if (id) {
      getGameAsync(id);
    }
  }, []);

  const onRefresh = () => {
    console.log('onRefresh id: ', id);
    if (id) {
      getGameAsync(id);
    }
  };

  // if we couldn't get the game info, make the user sign in again
  if (errorMsg) {
    context.signOut();
  }

  const currentRound = leaderboard?.roundInfo?.currentRound;
  console.log('current round: ', currentRound);

  const gamers = leaderboard?.gamers;

  const onClick = (gamer: any) => {
    console.log('clicked on ', gamer);
    router.push(
      `/games/details?gameId=${id}&gamerId=${gamer.objectId}&currentRound=${currentRound}`,
    );
  };

  const styles = createStyles(theme);

  const header = () => {
    return (
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{leaderboard?.name}</Text>
        </View>
        <View style={styles.leaderboardContainer}>
          <Text style={styles.leaderboardTitle}>Game Leaderboard</Text>
        </View>
        <LeaderboardHeader roundTitles={['R1', 'R2', 'R3', 'R4']} />
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
              refreshing={refreshing}
              onRefresh={onRefresh}
              ListHeaderComponent={header}
              ListFooterComponent={footer}
              renderItem={({ item }) => <LeaderboardItem item={item} onClick={onClick} />}
              keyExtractor={(item) => {
                // console.log(item);
                return item.objectId;
              }}
            />
          </>
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

const createStyles = (theme: Theme) => {
  const customColors = getCustomColors(theme.dark);

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
    },
    titleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    title: {
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      fontSize: 25,
      fontWeight: 'bold',
      padding: 20,
      textAlign: 'center',
    },
    containerInput: {
      backgroundColor: theme.colors.background,
      paddingVertical: 10,
    },
    leaderboardContainer: {
      backgroundColor: theme.colors.primary,
      color: customColors.leaderboardText,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: 20,
    },
    leaderboardTitle: {
      color: customColors.leaderboardText,
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
};
