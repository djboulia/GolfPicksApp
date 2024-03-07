import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function ErrorText({ text }: { text: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fddcdf",
    padding: 2,
  },
  text: {
    width: 300,
    height: 40,
    padding: 8,
    color: "#942f3a",
  },
});
