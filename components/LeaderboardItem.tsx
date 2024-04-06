import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LinkContainer from './LinkContainer';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LeaderboardItem({
  item,
  currentRound,
  onClick,
}: {
  item: any;
  currentRound: number;
  onClick?: (id: string) => void;
}) {
  console.log('item: ', item);
  console.log('currentRound: ', item?.rounds, currentRound);

  const round = item?.rounds[currentRound - 1] || {};

  return (
    <View style={styles.container}>
      <View>
        <LinkContainer
          style={styles.linkContainer}
          onPress={() => {
            console.log(`link ${item.eventid} pressed`);
            if (onClick) {
              onClick(item.objectId);
            }
          }}
        >
          <Text style={round.leader ? styles.linkLeaderLabel : styles.linkLabel}>{item?.name}</Text>
          <Text style={round.leader ? styles.linkLeaderScore : styles.linkScore}>
            {round.score}
          </Text>
          <Ionicons name="chevron-forward" size={30} color="#fff" />
        </LinkContainer>
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
    backgroundColor: '#005500',
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  linkLabel: {
    width: 250,
    fontSize: 20,
    color: '#fff',
  },
  linkLeaderLabel: {
    width: 250,
    fontSize: 20,
    color: '#ff0',
  },
  linkScore: {
    width: 50,
    fontSize: 20,
    color: '#fff',
  },
  linkLeaderScore: {
    width: 50,
    fontSize: 20,
    color: '#ff0',
  },
});
