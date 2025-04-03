import React from 'react';
import { Redirect } from 'expo-router';
import { useSession } from '@/hooks/SessionProvider';

export default function DefaultScreen() {
  const { isLoading, isLoggedIn } = useSession();
  console.log('DefaultScreen isLoggedIn ', isLoggedIn, 'isLoaded ', isLoading);

  const test = process.env.EXPO_PUBLIC_TEST;
  if (test === 'true') {
    console.log('found test environment variable, redirecting to test page');
    return <Redirect href="/test" />;
  }

  if (isLoading) {
    return null;
  }

  if (isLoggedIn) {
    return <Redirect href="/games" />;
  }

  return <Redirect href="/login" />;
}
