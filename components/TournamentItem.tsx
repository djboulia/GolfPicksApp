import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import LinkContainer from './LinkContainer';

export default function TournamentItem({
  name,
  id,
  onClick,
}: {
  name: string;
  id: string;
  onClick?: (id: string) => void;
}) {
  // console.log('item: ', item);

  return (
    <View style={styles.container}>
      <LinkContainer
        style={styles.linkContainer}
        onPress={() => {
          console.log(`link ${id} pressed`);
          if (onClick) {
            onClick(id);
          }
        }}
      >
        <Text style={styles.linkLabel}> {name}</Text>

        <Ionicons name="chevron-forward" size={30} color="#005500" />
      </LinkContainer>
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
