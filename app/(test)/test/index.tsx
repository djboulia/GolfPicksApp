import { Link } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TestScreen() {
  return (
    <SafeAreaView>
      <Text>This is the test screen</Text>

      <Link href="/games/picks?gameId=1&name=Game">Picks</Link>
    </SafeAreaView>
  );
}
