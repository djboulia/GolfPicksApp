import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Link from './Link';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LeaderboardItem({
  item,
  onClick,
}: {
  item: any;
  onClick?: (id: string) => void;
}) {
  // console.log('item: ', item);

  return (
    <View style={styles.container}>
      <View style={styles.linkContainer}>
        <Link
          label={item?.name}
          style={styles.linkLabel}
          onPress={() => {
            console.log(`link ${item.eventid} pressed`);
            if (onClick) {
              onClick(item.objectId);
            }
          }}
        />

        <Ionicons name="chevron-down" size={30} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#BBBBBB',
    paddingVertical: 12,
    backgroundColor: '#005500',
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  linkLabel: {
    fontSize: 20,
    color: '#fff',
  },
});
