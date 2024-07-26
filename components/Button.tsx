import { Theme, useTheme } from '@react-navigation/native';
import { StyleSheet, View, Button as ButtonReactNative } from 'react-native';

export default function Button({
  label,
  enabled = true,
  onPress,
}: {
  label: string;
  enabled?: boolean;
  onPress?: () => void;
}) {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.buttonContainer}>
      <ButtonReactNative
        color={styles.button.color}
        title={label}
        disabled={!enabled}
        onPress={() => {
          if (enabled && onPress) onPress();
        }}
      />
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    buttonContainer: {
      width: 150,
      height: 55,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
    },
    button: {
      color: theme.dark ? '#009900' : '#005500',
      borderRadius: 10,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  });
