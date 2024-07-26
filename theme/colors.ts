import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export function getTheme(dark: boolean) {
  return dark
    ? { ...DarkTheme, colors: { ...DarkTheme.colors, primary: '#007700' } }
    : { ...DefaultTheme, colors: { ...DefaultTheme.colors, primary: '#005500' } };
}

export function getCustomColors(dark: boolean) {
  return dark
    ? { leaderboardText: '#DDDDDD', border: '#444444', subHeader: '#c2d1bc', top5Header: '#145ba3' }
    : { leaderboardText: '#fff', border: 'gray', subHeader: '#dff0d8', top5Header: '#1e90ff' };
}
