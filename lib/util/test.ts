export function isTestEnvironment() {
  const test = process.env.EXPO_PUBLIC_TEST;
  if (test === 'true') {
    console.log('test environment enabled');
    return true;
  }

  return false;
}
