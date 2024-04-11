import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LinkContainer from './LinkContainer';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function GolferItem({
  name,
  rank,
  index,
  selected = false,
  enabled = true,
  onClick,
}: {
  name: string;
  rank: string;
  index: number;
  enabled?: boolean;
  selected?: boolean;
  onClick?: (index: number) => void;
}) {
  // console.log('name: ', name);

  const style =
    enabled || selected
      ? index <= 10
        ? styles.top10Text
        : styles.defaultText
      : styles.disabledText;

  const backgroundColor = selected ? styles.selected : styles.unselected;

  const iconColor = enabled || selected ? (index <= 10 ? top10Color : defaultColor) : disabledColor;
  const showIcon = enabled || selected;

  return (
    <View style={[styles.container, backgroundColor]}>
      <LinkContainer
        style={styles.linkContainer}
        onPress={() => {
          const clickable = enabled || selected;

          console.log(`click on player ${name} and index ${index}, clickable: ${clickable}`);

          if (clickable && onClick) {
            onClick(index);
          }
        }}
      >
        <View style={[styles.icon]}>
          {showIcon && (
            <Ionicons name={!selected ? 'add' : 'checkmark'} size={30} color={iconColor} />
          )}
        </View>

        <Text style={[style, styles.name]} numberOfLines={1}>
          {name}
        </Text>

        <Text style={[style, styles.rank]}>{rank}</Text>
      </LinkContainer>
    </View>
  );
}

const defaultFontSize = 18;
const defaultColor = '#000';
const top10Color = '#0000ff';
const disabledColor = '#AAAAAA';

const textBase = {
  fontSize: defaultFontSize,
  paddingRight: 10,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#BBBBBB',
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  defaultText: {
    ...textBase,
    color: defaultColor,
  },
  top10Text: {
    ...textBase,
    color: top10Color,
  },
  disabledText: {
    ...textBase,
    color: disabledColor,
  },
  icon: {
    flex: 1,
    height: 30,
  },
  name: {
    flex: 5,
  },
  rank: {
    flex: 1,
  },
  selected: {
    backgroundColor: '#dff0d8',
  },
  unselected: {
    backgroundColor: '#fff',
  },
});
