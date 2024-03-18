import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Link({
  label,
  style,
  onPress,
}: {
  label: string;
  style?: any;
  onPress: () => void;
}) {
  const textStyle = style ? style : styles.linkLabel;

  return (
    <View style={styles.linkContainer}>
      <Pressable style={styles.link} onPress={onPress}>
        <Text style={textStyle}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  linkContainer: {},
  link: {},
  linkLabel: {},
});
