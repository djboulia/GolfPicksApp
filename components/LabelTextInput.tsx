import { Theme, useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

export enum InputTypes {
  text = 'text',
  email = 'email',
  password = 'password',
}

export default function LabelTextInput({
  label,
  value,
  placeholder,
  type = InputTypes.text,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: InputTypes;
  onChange: (text: string) => void;
}) {
  const [focus, setFocus] = React.useState(false);
  const theme = useTheme();

  const styles = createStyles(theme);
  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={focus ? styles.inputFocused : styles.input}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChangeText={onChange}
          value={value}
          inputMode={type === 'email' ? 'email' : 'text'}
          autoCapitalize={type === 'email' || type === 'password' ? 'none' : undefined}
          placeholder={placeholder}
          secureTextEntry={type === 'password' ? true : false}
        />
      </View>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    inputContainer: {
      color: theme.colors.text,
      padding: 2,
    },
    inputLabel: {
      color: theme.colors.text,
    },
    input: {
      width: 300,
      height: 40,
      padding: 8,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: '#eaf0ea',
    },
    inputFocused: {
      width: 300,
      height: 40,
      padding: 8,
      borderColor: '#80aa80',
      borderWidth: 2,
      borderRadius: 5,
      backgroundColor: '#eaf0ea',
    },
  });
