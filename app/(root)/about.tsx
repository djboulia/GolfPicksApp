import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCurrentGamer } from '@/hooks/useCurrentGamer';

export default function AboutScreen() {
  const [gamer] = useCurrentGamer();

  console.log('AboutScreen: ', gamer);

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Text style={styles.title}>This is the GolfPicks App</Text>
        <Text style={styles.list}>Implemented with Expo and React Native</Text>
        <Text style={styles.list}>Server side API built in Node.js</Text>
        <Text style={styles.list}>Golf data hosted in AWS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    padding: 10,
  },
  list: {
    fontSize: 20,
    padding: 10,
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
