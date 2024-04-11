import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Button({
  label,
  enabled = true,
  onPress,
}: {
  label: string;
  enabled?: boolean;
  onPress?: () => void;
}) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => {
          if (enabled && onPress) onPress();
        }}
      >
        <Text style={enabled ? styles.text : styles.textDisabled}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 150,
    height: 55,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    backgroundColor: '#005500',
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  textDisabled: {
    color: '#AAAAAA',
    fontSize: 16,
  },
});
