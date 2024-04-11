import React from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';

export default function Loader({ message }: { message?: string }) {
  return <ActivityIndicator size="large" color="#005500" />;
}

const styles = StyleSheet.create({});
