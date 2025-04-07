import { useTheme, type Theme } from '@react-navigation/native';
import { Link } from 'expo-router';
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TestScreen() {
  const theme = useTheme();

  const styles = createStyles(theme);

  return (
    <SafeAreaView>
      <Text>Test the following links:</Text>

      <Link style={styles.link} href="/games/picks?gameId=1&name=Sample Game">
        Picks
      </Link>

      <Link style={styles.link} href="/games">
        Games
      </Link>
    </SafeAreaView>
  );
}

const createStyles = (_theme: Theme) =>
  StyleSheet.create({
    link: {
      padding: 10,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      color: '#0000FF',
    },
  });
