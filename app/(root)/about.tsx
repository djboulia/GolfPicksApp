import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCurrentGamer } from '@/hooks/useCurrentGamer';
import { Theme, useTheme } from '@react-navigation/native';

export default function AboutScreen() {
  const theme = useTheme();

  const [gamer] = useCurrentGamer();

  console.log('AboutScreen: ', gamer);

  const styles = createStyles(theme);
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
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
      color: theme.colors.text,
      fontSize: 25,
      fontWeight: 'bold',
      padding: 10,
    },
    list: {
      color: theme.colors.text,
      fontSize: 20,
      padding: 10,
    },
    containerInput: {
      backgroundColor: theme.colors.background,
      padding: 10,
    },
    input: {
      width: 300,
      height: 40,
      padding: 8,
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
  });
