import { type Theme, useTheme } from '@react-navigation/native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function ErrorScreen() {
  const params = useLocalSearchParams();
  const { message } = params;
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: 'Error!' }} />
      <View style={styles.container}>
        <Text style={styles.text}>There was an error</Text>
        <Text style={styles.text}>{message}</Text>
        <Link href="/logout" style={styles.link} asChild>
          <Button title="Log out" />
        </Link>
      </View>
    </>
  );
}

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    text: {
      color: theme.colors.text,
    },
    link: {
      marginTop: 15,
      paddingVertical: 15,
    },
  });
};
