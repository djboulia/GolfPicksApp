import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCurrentGamer } from '../lib/hooks/useCurrentGamer';

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const [errorMsg, setErrorMsg] = React.useState<string | undefined>(undefined);
  const gamer = useCurrentGamer();
  const [games, setGames] = React.useState<any>();

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Text style={styles.title}>Profile Screen goes here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  containerInput: {
    backgroundColor: '#fff',
    padding: 10,
  },
  input: {
    width: 300,
    height: 40,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
