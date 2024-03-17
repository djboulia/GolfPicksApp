import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Link({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <View style={styles.linkContainer}>
      <Pressable style={styles.link} onPress={onPress}>
        <Text style={styles.linkLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  linkContainer: {},
  link: {},
  linkLabel: {
    color: '#005500',
  },
});
