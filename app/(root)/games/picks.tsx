import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ErrorText from '@/components/ErrorText';
import { useCurrentGamer } from '@/hooks/useCurrentGamer';
import { Games } from '@/lib/api/Games';
import { Events } from '@/lib/api/Events';
import Loader from '@/components/Loader';
import GolferItem from '@/components/GolferItem';
import PicksHeader from '@/components/PicksHeader';
import { useSession } from '@/hooks/SessionProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';

const MAX_SELECTIONS = 10;
const MAX_TOP10_SELECTIONS = 2;

export default function PicksScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ gameId: string; name: string }>();
  const { gameId, name } = params;

  const context = useSession();
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [gamer] = useCurrentGamer();
  const [picks, setPicks] = useState<any[]>();
  const [game, setGame] = useState<any>();
  const [event, setEvent] = useState<any>();
  const [golfers, setGolfers] = useState<any[]>([]);
  const [totalSelected, setTotalSelected] = useState<number>(0);
  const [top10Selected, setTop10Selected] = useState<number>(0);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>(undefined);

  const isSubmitEnabled = () => {
    return totalSelected === MAX_SELECTIONS;
  };

  const isEnabled = (golfer: any) => {
    if (totalSelected >= MAX_SELECTIONS) {
      return false;
    }

    if (golfer.index <= 10 && top10Selected >= MAX_TOP10_SELECTIONS) {
      return false;
    }

    return true;
  };

  const isSelected = (golfer: any, picks: any) => {
    return (
      picks.find((pick: any) => {
        return pick.id === golfer.player_id;
      }) !== undefined
    );
  };

  const initSelections = (golfers: any[], picks: any[]) => {
    let totalSelected = 0;
    let top10Selected = 0;

    if (golfers && picks) {
      golfers.forEach((golfer) => {
        golfer.selected = isSelected(golfer, picks);

        if (golfer.selected) {
          totalSelected++;
          if (golfer.rank <= 10) {
            top10Selected++;
          }
        }
      });
    }

    setTotalSelected(totalSelected);
    setTop10Selected(top10Selected);
    setGolfers(golfers || []);
  };

  useEffect(() => {
    const getPicksAsync = async (id: string | undefined) => {
      setLoadingMessage('Loading...');

      if (id && gamer?.getId()) {
        const result = await Games.picks(id, gamer?.getId()).catch((error: any) => {
          if (error?.message?.includes('not found')) {
            // haven't made picks yet
            return undefined;
          }
          console.log('error getting picks: ', error.status, error.message);
          setErrorMsg(error.message);
        });
        // console.log('result ', result);

        const picks = result?.picks || [];
        setPicks(picks);

        const game = await Games.gameDay(id).catch((error: any) => {
          console.log('error getting game: ', error);
          setErrorMsg(error.message);
        });

        setGame(game);

        const eventid = game.event;
        const event = await Events.get(eventid).catch((error: any) => {
          console.log('error getting event: ', error);
          setErrorMsg(error.message);
        });

        setEvent(event);

        initSelections(event?.golfers, picks);
        setLoadingMessage(undefined);
      } else {
        console.log('No gamer found');
      }
    };

    // console.log('getting game ', id);
    getPicksAsync(gameId);
  }, [gamer]);

  // if we couldn't get the game info, make the user sign in again
  if (errorMsg) {
    router.push('/error?message=' + errorMsg);
  }

  const golferClicked = (index: number) => {
    const golfer = golfers.find((golfer) => golfer.index === index);
    console.log('golferClicked ', golfer);

    if (golfer) {
      if (golfer.selected) {
        if (golfer.rank <= 10) {
          setTop10Selected(top10Selected - 1);
        }
        setTotalSelected(totalSelected - 1);
      } else {
        if (golfer.rank <= 10) {
          setTop10Selected(top10Selected + 1);
        }
        setTotalSelected(totalSelected + 1);
      }

      golfer.selected = !golfer.selected;
      setGolfers([...golfers]);
    }
  };

  const asyncUpdatePicks = async (gameid: string, gamerid: string, picks: any[]) => {
    setLoadingMessage('Saving picks...');

    const result = await Games.updatePicks(gameid, gamerid, picks).catch((error: any) => {
      console.log('error updating picks: ', error);
      setLoadingMessage(undefined);
      setErrorMsg(error.message);
      return undefined;
    });

    if (result) {
      setLoadingMessage(undefined);

      console.log('saved picks ', picks);
      router.back();
    }
  };

  const updatePicks = () => {
    console.log('updatePicks ');

    const picks: any[] = [];

    golfers.forEach((golfer) => {
      if (golfer.selected) {
        picks.push({ id: golfer.player_id });
      }
    });

    if (gameId && gamer?.getId()) {
      asyncUpdatePicks(gameId, gamer?.getId(), picks);
    } else {
      console.log('error: no gamer id found ', gamer?.getId());
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <PicksHeader
          gamerName={gamer?.getName() ? gamer.getName() : ''}
          gameName={name ?? ''}
          top10Selected={top10Selected}
          top10Max={MAX_TOP10_SELECTIONS}
          totalSelected={totalSelected}
          totalMax={MAX_SELECTIONS}
          submitEnabled={isSubmitEnabled()}
          onClick={updatePicks}
        />

        {loadingMessage && <Loader />}

        {golfers ? (
          <FlatList
            data={golfers}
            renderItem={({ item }) => (
              <GolferItem
                name={item.name}
                rank={item.rank}
                index={item.index}
                selected={item.selected}
                enabled={isEnabled(item)}
                onClick={golferClicked}
              />
            )}
            keyExtractor={(item) => {
              return item.index;
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
  containerInput: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
});
