import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Link from './Link';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TournamentItem({
  event,
  onClick,
}: {
  event: string;
  onClick?: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.linkContainer}>
        <Link
          label={event}
          style={styles.linkLabel}
          onPress={() => {
            console.log('link pressed');
          }}
        />

        <Ionicons name="chevron-forward" size={30} color="#005500" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#BBBBBB',
    paddingVertical: 12,
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  linkLabel: {
    color: '#005500',
    fontSize: 20,
  },
});
