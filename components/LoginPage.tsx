import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LabelTextInput from "./LabelTextInput";
import Button from "./Button";

const GolfPicksLogo = require("../assets/images/golfpicks.png");

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image source={GolfPicksLogo} style={styles.image} />
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.title}>GolfPicks Login</Text>
      </View>
      <View style={styles.containerInput}>
        <LabelTextInput
          label="Email:"
          value={email}
          placeholder="Email"
          onChange={setEmail}
        />
      </View>
      <View style={styles.containerInput}>
        <LabelTextInput
          label="Password:"
          value={password}
          placeholder="Password"
          onChange={setPassword}
          password={true}
        />
      </View>
      <View style={styles.containerInput}>
        <Button label="Log in" onPress={() => console.log("Login")} />
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "bold",
  },
  containerInput: {
    backgroundColor: "#fff",
    padding: 10,
  },
  input: {
    width: 300,
    height: 40,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
  },
});
