import { Theme, useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Text style={styles.title}>Profile Screen goes here</Text>
      </View>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 200,
      height: 200,
    },
    imageContainer: {
      padding: 10,
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    containerInput: {
      backgroundColor: theme.colors.background,
      padding: 10,
    },
    input: {
      width: 300,
      height: 40,
      padding: 8,
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
  });
