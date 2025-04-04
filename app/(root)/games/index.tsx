import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ErrorText from '@/components/ErrorText';
import { useCurrentGamer } from '@/hooks/useCurrentGamer';
import TournamentItem from '@/components/TournamentItem';
import Loader from '@/components/Loader';
import CurrentGameHeader from '@/components/CurrentGameHeader';
import { useRouter } from 'expo-router';
import { type Theme, useTheme } from '@react-navigation/native';
import { getCustomColors } from '@/theme/colors';
import { ErrorRedirect } from '@/components/ErrorRedirect';
import { type Gamer } from '@/lib/models/Gamer';
import { type Games } from '@/lib/models/Games';
import Api from '@/lib/api/api';

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();

  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [gamer] = useCurrentGamer();
  const [games, setGames] = useState<Games | undefined>();
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const getGamesAsync = async (gamer: Gamer) => {
    setRefreshing(true);

    if (gamer) {
      console.log('getting games for gamer ', gamer.name);
      const games = await Api.gamer.games(gamer).catch((error) => {
        console.log(`error getting games: ${error.message}`);

        setErrorMsg(error.message);
        return undefined;
      });

      // console.log('games ', games);
      setGames(games);
    } else {
      console.log('gamer is undefined');
    }

    setRefreshing(false);
  };

  useEffect(() => {
    if (gamer) {
      void getGamesAsync(gamer);
    }
  }, [gamer]);

  const onRefresh = () => {
    console.log('onRefresh HomeScreen');
    if (!gamer) {
      console.log('gamer is undefined');
      return;
    }

    void getGamesAsync(gamer);
  };

  const onClick = (id: string) => {
    router.push(`/games/game?id=${id}`);
  };

  const updatePicks = (gameid: string, name: string) => {
    console.log('updatePicks ', gameid, name);
    router.push(`/games/picks?gameId=${gameid}'&name=${name}`);
  };

  // if we couldn't get the game info, make the user sign in again
  if (errorMsg) {
    return <ErrorRedirect errorMsg={errorMsg} />;
  }

  // console.log('games.active ', games?.active);
  // console.log('games.history', games?.history);

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Text style={styles.title}>Games for {gamer?.name}</Text>

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
              <TournamentItem name={item?.event ?? ''} id={item?.eventid} onClick={onClick} />
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

const createStyles = (theme: Theme) => {
  const customColors = getCustomColors(theme.dark);

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
    },
    image: {
      width: 200,
      height: 200,
    },
    imageContainer: {
      padding: 10,
    },
    title: {
      backgroundColor: theme.colors.primary,
      color: customColors.leaderboardText,
      fontSize: 25,
      fontWeight: 'bold',
      padding: 10,
    },
    containerInput: {
      backgroundColor: theme.colors.background,
      paddingVertical: 10,
    },
    input: {
      width: 300,
      height: 40,
      padding: 8,
      borderColor: theme.dark ? 'white' : 'gray',
      borderWidth: 1,
    },
  });
};
