import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Theme, useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import LabelTextInput, { InputTypes } from '@/components/LabelTextInput';
import Button from '@/components/Button';
import ErrorText from '@/components/ErrorText';

import { Gamer } from '../lib/api/Gamer';
import { useSession } from '@/hooks/SessionProvider';
import { useRouter } from 'expo-router';

const GolfPicksLogo = require('../assets/images/golfpicks.png');

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState<string | undefined>(undefined);
  const [inProgress, setInProgress] = React.useState(false);
  const router = useRouter();
  const theme = useTheme();

  const { signIn } = useSession();

  const onLogin = () => {
    if (inProgress) {
      console.log('login in already progress');
      return;
    }
    console.log(`calling Login with ${email} and ${password}`);
    setInProgress(true);
    Gamer.login(email, password)
      .then((gamer): any => {
        setInProgress(false);

        if (gamer) {
          console.log('login: ', gamer);
          setErrorMsg(undefined);
          signIn();
          router.push('/games');
        } else {
          console.log('gamer is undefined');
          setErrorMsg('Error logging in.');
        }
      })
      .catch((error): any => {
        setInProgress(false);

        console.log('login error: ', error);
        setErrorMsg('Error logging in.');
      });
  };

  const styles = createStyles(theme);

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
      color: theme.colors.text,
      fontSize: 25,
      fontWeight: 'bold',
    },
    containerInput: {
      backgroundColor: theme.colors.background,
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
