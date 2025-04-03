import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCurrentGamer } from '@/hooks/useCurrentGamer';
import { useSession } from '@/hooks/SessionProvider';
import { type Theme, useTheme } from '@react-navigation/native';

export default function LogoutScreen() {
  const theme = useTheme();
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
      void logout();
    }
  }, [gamer, signOut]);

  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Text style={styles.title}>Logging Out...</Text>
      </View>
    </View>
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
    containerInput: {
      backgroundColor: theme.colors.background,
      padding: 10,
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
  });
