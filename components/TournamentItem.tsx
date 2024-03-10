import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Link from './Link';

export default function TournamentItem({
  event,
  onClick,
}: {
  event: string;
  onClick?: () => void;
}) {
  const [focus, setFocus] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.linkContainer}>
        <Link
          label={event}
          onPress={() => {
            console.log('link pressed');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#005500',
    flexDirection: 'row',
    padding: 2,
  },
  linkContainer: {
    padding: 4,
  },
});
