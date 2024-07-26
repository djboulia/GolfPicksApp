import { StyleSheet, View, Pressable } from 'react-native';

export default function LinkContainer({
  style,
  onPress,
  children,
}: {
  style?: any;
  onPress?: () => void;
  children: any;
}) {
  const containerStyle = style ? style : styles.link;

  return (
    <View>
      <Pressable style={containerStyle} onPress={onPress}>
        {children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  linkContainer: {},
  link: {},
});
