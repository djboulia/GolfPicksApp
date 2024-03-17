import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Link from './Link';

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
          onPress={() => {
            console.log('link pressed');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginVertical: 5,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#005500',
    padding: 12,
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 4,
  },
});
