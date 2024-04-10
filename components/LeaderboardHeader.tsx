import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LinkContainer from './LinkContainer';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LeaderboardHeader({ roundTitles }: { roundTitles: string[] }) {
  return (
    <View style={styles.container}>
      <LinkContainer style={styles.linkContainer}>
        <Text style={styles.label} numberOfLines={1}>
          {' '}
        </Text>

        {roundTitles.map((title: string, index: number) => {
          return (
            <Text key={index} style={styles.score}>
              {title}
            </Text>
          );
        })}

        <View style={styles.spacer} />
      </LinkContainer>
    </View>
  );
}

const defaultFontSize = 18;
const defaultColor = '#fff';

const baseStyle = {
  fontSize: defaultFontSize,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  label: {
    ...baseStyle,
    flex: 3,
    paddingRight: 10,
    color: defaultColor,
  },
  score: {
    ...baseStyle,
    fontWeight: 'bold',
    flex: 1,
    color: defaultColor,
  },
  spacer: {
    width: 30,
  },
});
