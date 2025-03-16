import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LinkContainer from './LinkContainer';
import { Theme, useTheme } from '@react-navigation/native';

export default function LeaderboardHeader({ roundTitles }: { roundTitles: string[] }) {
  const theme = useTheme();

  const styles = createStyles(theme);
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

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 12,
      backgroundColor: theme.colors.primary,
    },
    linkContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 20,
      paddingVertical: 5,
    },
    label: {
      ...baseStyle,
      flex: 3,
      paddingRight: 10,
      color: theme.dark ? 'lightgray' : defaultColor,
    },
    score: {
      ...baseStyle,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'right',
      color: theme.dark ? 'lightgray' : defaultColor,
    },
    spacer: {
      width: 30,
    },
  });
