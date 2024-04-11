import React from 'react';
import { StyleSheet, Text, ActivityIndicator, View } from 'react-native';

export default function Loader({ message }: { message?: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#005500" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
