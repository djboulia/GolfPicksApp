import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ErrorText from '@/components/ErrorText';
import { useCurrentGamer } from '@/hooks/useCurrentGamer';
import { type Golfer } from '@/lib/models/Golfer';
import { type GamerPick } from '@/lib/models/GamerPick';
import { type Game } from '@/lib/models/Game';
import { type Event } from '@/lib/models/Event';
import Loader from '@/components/Loader';
import GolferItem from '@/components/GolferItem';
import PicksHeader from '@/components/PicksHeader';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import Api from '@/lib/api/api';

const MAX_SELECTIONS = 10;
const MAX_TOP10_SELECTIONS = 2;

export default function PicksScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ gameId: string; name: string }>();
  const { gameId, name } = params;

  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [gamer] = useCurrentGamer();
  const [, setPicks] = useState<GamerPick[]>();
  const [, setGame] = useState<Game>();
  const [, setEvent] = useState<Event>();
  const [golfers, setGolfers] = useState<Golfer[]>([]);
  const [totalSelected, setTotalSelected] = useState<number>(0);
  const [top10Selected, setTop10Selected] = useState<number>(0);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>(undefined);

  const isSubmitEnabled = () => {
    return totalSelected === MAX_SELECTIONS;
  };

  const isEnabled = (golfer: Golfer) => {
    if (totalSelected >= MAX_SELECTIONS) {
      return false;
    }

    if (golfer.index <= 10 && top10Selected >= MAX_TOP10_SELECTIONS) {
      return false;
    }

    return true;
  };

  const isSelected = (golfer: Golfer, picks: GamerPick[]) => {
    return (
      picks.find((pick) => {
        return pick.id === golfer.player_id;
      }) !== undefined
    );
  };

  useEffect(() => {
    const initSelections = (golfers: Golfer[] | undefined, picks: GamerPick[] | undefined) => {
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
      setGolfers(golfers ?? []);
    };

    const getPicksAsync = async (id: string | undefined) => {
      setLoadingMessage('Loading...');
      console.log('getting picks ', id, ' gamer ', gamer?.id);

      if (id && gamer?.id) {
        const picks = await Api.games.picks(id, gamer?.id).catch((error) => {
          if (error?.message?.includes('not found')) {
            // haven't made picks yet
            return undefined;
          }
          console.log('error getting picks: ', error.status, error.message);
          setErrorMsg(error.message);
        });
        // console.log('result ', result);

        setPicks(picks);

        const game = await Api.games.gameDay(id).catch((error) => {
          console.log('error getting game: ', error);
          setErrorMsg(error.message);
          return undefined;
        });

        setGame(game);

        if (game?.event) {
          const eventid = game.event;
          const event = await Api.event.get(eventid).catch((error) => {
            console.log('error getting event: ', error);
            setErrorMsg(error.message);
            return undefined;
          });

          setEvent(event);
          initSelections(event?.golfers, picks);
        }

        setLoadingMessage(undefined);
      } else {
        console.log('No gamer found');
      }
    };

    // console.log('getting game ', id);
    void getPicksAsync(gameId);
  }, [gameId, gamer]);

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

  const asyncUpdatePicks = async (gameid: string, gamerid: string, picks: GamerPick[]) => {
    setLoadingMessage('Saving picks...');

    const result = await Api.games.updatePicks(gameid, gamerid, picks).catch((error) => {
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

    const picks: GamerPick[] = [];

    golfers.forEach((golfer) => {
      if (golfer.selected) {
        picks.push({ id: golfer.player_id, name: golfer.name, rounds: [] });
      }
    });

    if (gameId && gamer?.id) {
      void asyncUpdatePicks(gameId, gamer?.id, picks);
    } else {
      console.log('error: no gamer id found ', gamer?.id);
    }
  };

  // if we couldn't get the game info, make the user sign in again
  if (errorMsg) {
    return <Redirect href={`/error?message=${errorMsg}`} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <PicksHeader
          gamerName={gamer?.name ?? ''}
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
              return item.index.toString();
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
