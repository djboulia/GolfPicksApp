import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ErrorText from './ErrorText';

export default function GameDetails({ route, navigation }: { route: any; navigation: any }) {
  const { gamer } = route.params;
  const [errorMsg] = React.useState<string | undefined>(undefined);

  return (
    <View style={styles.container}>
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Picks for {gamer?.name}</Text>
        </View>
        <View style={styles.totalsContainer}>
          <Text style={styles.header}> </Text>
          <Text style={styles.headerScore}>1</Text>
          <Text style={styles.headerScore}>2</Text>
          <Text style={styles.headerScore}>3</Text>
          <Text style={styles.headerScore}>4</Text>
        </View>

        <FlatList
          data={gamer.picks}
          renderItem={({ item }) => (
            <View style={styles.playerContainer}>
              <Text style={styles.player} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.playerScore}>{item.rounds[0]}</Text>
              <Text style={styles.playerScore}>{item.rounds[0]}</Text>
              <Text style={styles.playerScore}>{item.rounds[0]}</Text>
              <Text style={styles.playerScore}>{item.rounds[0]}</Text>
            </View>
          )}
          keyExtractor={(item) => {
            // console.log(item);
            return item.objectId;
          }}
        />

        <View style={styles.totalsContainer}>
          <Text style={styles.totals}>Total</Text>
          <Text style={styles.totalsScore}>{gamer.totals[0]}</Text>
          <Text style={styles.totalsScore}>{gamer.totals[1]}</Text>
          <Text style={styles.totalsScore}>{gamer.totals[2]}</Text>
          <Text style={styles.totalsScore}>{gamer.totals[3]}</Text>
        </View>

        <View style={styles.top5Container}>
          <Text style={styles.top5}>Top Five</Text>
          <Text style={styles.top5Score}>{gamer.scores[0]}</Text>
          <Text style={styles.top5Score}>{gamer.scores[1]}</Text>
          <Text style={styles.top5Score}>{gamer.scores[2]}</Text>
          <Text style={styles.top5Score}>{gamer.scores[3]}</Text>
        </View>
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
    textAlign: 'center',
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
