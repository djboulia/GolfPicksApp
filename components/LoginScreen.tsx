import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import LabelTextInput, { InputTypes } from './LabelTextInput';
import Button from './Button';
import ErrorText from './ErrorText';

import { Gamer } from '../lib/api/Gamer';
import { useCurrentGamer } from '../lib/hooks/useCurrentGamer';
import { AuthContext } from '../lib/AuthContext';

const GolfPicksLogo = require('../assets/images/golfpicks.png');

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState<string | undefined>(undefined);
  const gamer = useCurrentGamer();

  const { signIn } = React.useContext(AuthContext);

  const onLogin = () => {
    console.log(`calling Login with ${email} and ${password}`);
    Gamer.login(email, password)
      .then((gamer): any => {
        if (gamer) {
          console.log('login: ', gamer);
          setErrorMsg(undefined);
          signIn();
        } else {
          setErrorMsg('Error logging in.');
        }
      })
      .catch((error): any => {
        console.log('login error: ', error);
        setErrorMsg('Error logging in.');
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
          type={InputTypes.email}
          placeholder="Email"
          onChange={setEmail}
        />
      </View>
      <View style={styles.containerInput}>
        <LabelTextInput
          label="Password:"
          value={password}
          type={InputTypes.password}
          placeholder="Password"
          onChange={setPassword}
        />
      </View>
      <View style={styles.containerInput}>
        <Button label="Log in" onPress={onLogin} />
      </View>
      {errorMsg && (
        <View style={styles.containerInput}>
          <ErrorText text={errorMsg || ''} />
        </View>
      )}
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  containerInput: {
    backgroundColor: '#fff',
    padding: 10,
  },
  input: {
    width: 300,
    height: 40,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
