import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';

/**
 *
 * Display information about an active (in-progress or not yet started) game
 * If there is no active game, nothing is displayed
 *
 */
export default function CurrentGameHeader({
  activeGame,
  onClick,
}: {
  activeGame: any;
  onClick?: (eventid: string, name: string) => void;
}) {
  console.log('activeGame', activeGame);

  if (!activeGame) return null;

  if (activeGame.inProgress) {
    return (
      <View style={styles.container}>
        <Text style={styles.inProgress}>Tournament in Progress</Text>
      </View>
    );
  }

  if (activeGame.joined) {
    console.log('activeGame.joined', activeGame.joined);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{activeGame.event}</Text>
        <Button
          label="Update Picks"
          onPress={() => {
            if (onClick) onClick(activeGame.eventid, activeGame.event);
          }}
        />
      </View>
    );
  }

  // if we get here, there is an active game, but the user hasn't joined yet
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activeGame.event} </Text>
      <Button
        label="Make Picks"
        onPress={() => {
          if (onClick) onClick(activeGame.eventid, activeGame.event);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#dff0d8',
    color: '#000',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    width: 200,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  inProgress: {
    color: '#005500',
    fontSize: 20,
    padding: 10,
  },
});
