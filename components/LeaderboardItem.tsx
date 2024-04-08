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
  onClick?: (item: any) => void;
}) {
  console.log('item: ', item);
  console.log('currentRound: ', item?.rounds, currentRound);

  return (
    <View style={styles.container}>
      <View>
        <LinkContainer
          style={styles.linkContainer}
          onPress={() => {
            console.log(`link ${item.eventid} pressed`);
            if (onClick) {
              onClick(item);
            }
          }}
        >
          <Text style={styles.linkLabel} numberOfLines={1}>
            {item?.name}
          </Text>

          {item?.rounds.map((round: any, index: number) => {
            return (
              <Text key={index} style={round.leader ? styles.linkLeaderScore : styles.linkScore}>
                {round.score}
              </Text>
            );
          })}

          <Ionicons name="chevron-forward" size={30} color="#fff" />
        </LinkContainer>
      </View>
    </View>
  );
}

const defaultFontSize = 18;
const defaultColor = '#fff';
const leaderColor = '#ff0';

const linkLabelBase = {
  fontSize: defaultFontSize,
};

const linkScoreBase = {
  fontSize: defaultFontSize,
};

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
    paddingVertical: 5,
  },
  linkLabel: {
    ...linkLabelBase,
    flex: 3,
    paddingRight: 10,
    color: defaultColor,
  },
  linkLeaderLabel: {
    ...linkLabelBase,
    flex: 3,
    color: leaderColor,
  },
  linkScore: {
    ...linkScoreBase,
    flex: 1,
    color: defaultColor,
  },
  linkLeaderScore: {
    ...linkScoreBase,
    flex: 1,
    color: leaderColor,
  },
});
