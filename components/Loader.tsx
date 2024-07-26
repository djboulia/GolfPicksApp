import { Theme, useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

export default function Loader() {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={styles.container.color} />
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      color: theme.colors.primary,
      backgroundColor: theme.colors.background,
      height: '100%',
    },
  });
