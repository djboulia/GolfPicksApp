import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Loader({ message }: { message?: string }) {
  // TODO: implement a fancy loader
  return <Text>{message ? message : 'Loading...'}</Text>;
}

const styles = StyleSheet.create({});
