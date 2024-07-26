import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function ErrorScreen() {
  const params = useLocalSearchParams();
  const { message } = params;

  return (
    <>
      <Stack.Screen options={{ title: 'Error!' }} />
      <View style={styles.container}>
        <Text>There was an error</Text>
        <Text>{message}</Text>
        <Link href="/logout" style={styles.link}>
          <Text>Log out</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
