import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Games',
        }}
      />
      <Stack.Screen
        name="game"
        options={{
          title: 'Leaderboard',
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: 'Details',
        }}
      />
      <Stack.Screen name="picks" />
    </Stack>
  );
}
