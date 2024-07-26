import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import LinkContainer from './LinkContainer';
import { Theme, useTheme } from '@react-navigation/native';
import { getCustomColors } from '@/theme/colors';

export default function TournamentItem({
  name,
  id,
  onClick,
}: {
  name: string;
  id: string;
  onClick?: (id: string) => void;
}) {
  const theme = useTheme();

  // console.log('item: ', item);

  const styles = createStyles(theme);
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

const createStyles = (theme: Theme) => {
  const customColors = getCustomColors(theme.dark);

  return StyleSheet.create({
    container: {
      width: '100%',
      borderTopWidth: 1,
      borderTopColor: customColors.border,
      paddingVertical: 12,
    },
    linkContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    linkLabel: {
      color: theme.colors.primary,
      fontSize: 20,
    },
  });
};
