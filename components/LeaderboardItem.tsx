import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LinkContainer from './LinkContainer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Theme, useTheme } from '@react-navigation/native';
import { getCustomColors } from '@/theme/colors';

export default function LeaderboardItem({
  item,
  onClick,
}: {
  item: any;
  onClick?: (item: any) => void;
}) {
  const theme = useTheme();
  // console.log('item: ', item);
  // console.log('currentRound: ', item?.rounds, currentRound);

  const scores = [{ score: 0, styles: {} }];

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
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
            <Text
              key={index}
              style={
                round.leader ? { ...styles.linkScore, ...styles.linkLeaderScore } : styles.linkScore
              }
            >
              {round.score}
            </Text>
          );
        })}

        <Ionicons name="chevron-forward" size={30} color={styles.linkLabel.color} />
      </LinkContainer>
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

const createStyles = (theme: Theme) => {
  const customColors = getCustomColors(theme.dark);

  return StyleSheet.create({
    container: {
      width: '100%',
      borderTopWidth: 1,
      borderTopColor: customColors.leaderboardText,
      paddingVertical: 12,
      backgroundColor: theme.colors.primary,
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
      color: customColors.leaderboardText,
    },
    linkScore: {
      ...linkScoreBase,
      flex: 1,
      color: customColors.leaderboardText,
    },
    linkLeaderScore: {
      color: leaderColor,
    },
  });
};
