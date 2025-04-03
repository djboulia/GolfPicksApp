import React from 'react';
import { StyleSheet, View, Pressable, type StyleProp } from 'react-native';

export default function LinkContainer({
  style,
  onPress,
  children,
}: {
  style?: StyleProp<any>;
  onPress?: () => void;
  children: React.ReactNode;
}) {
  const containerStyle = style ?? styles.link;

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
