import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCurrentGamer } from '@/hooks/useCurrentGamer';
import { useSession } from '@/hooks/SessionProvider';

export default function LogoutScreen() {
  const [gamer] = useCurrentGamer();

  const { signOut } = useSession();

  useEffect(() => {
    async function logout() {
      console.log('logging out gamer ', gamer?.getName());
      try {
        await gamer?.logout();
        signOut();
      } catch (error) {
        console.log('logout error: ', error);
      }
    }

    if (gamer) {
      logout();
    }
  }, [gamer]);

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Text style={styles.title}>Logging Out...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInput: {
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
