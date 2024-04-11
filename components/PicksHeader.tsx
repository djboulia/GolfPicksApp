import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';

/**
 *
 * Display information about an active (in-progress or not yet started) game
 * If there is no active game, nothing is displayed
 *
 */
export default function PicksHeader({
  gamerName,
  gameName,
  top10Selected,
  top10Max,
  totalSelected,
  totalMax,
  submitEnabled,
  onClick,
}: {
  gamerName: string;
  gameName: string;
  top10Selected: number;
  top10Max: number;
  totalSelected: number;
  totalMax: number;
  submitEnabled: boolean;
  onClick?: () => void;
}) {
  // if we get here, there is an active game, but the user hasn't joined yet
  return (
    <>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Picks for {gamerName}</Text>
        </View>

        <Text style={styles.event}>{gameName}</Text>

        <View style={styles.selectionContainer}>
          <View style={styles.selections}>
            {totalSelected === totalMax ? (
              <>
                <Text>
                  {totalSelected} of {totalMax} Total Picks
                </Text>
                <Text>Press to Save Picks</Text>
              </>
            ) : (
              <>
                <Text>
                  {top10Selected} of {top10Max} Top 10 Picks
                </Text>
                <Text>
                  {totalSelected} of {totalMax} Total Picks
                </Text>
              </>
            )}
          </View>
          <Button label="Save Picks" enabled={submitEnabled} onPress={onClick} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  event: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  header: {
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: '#005500',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  selections: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 10,
  },
});
