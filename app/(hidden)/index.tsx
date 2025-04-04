import React from 'react';
import { Redirect } from 'expo-router';
import { useSession } from '@/hooks/SessionProvider';
import { isTestEnvironment } from '@/lib/util/test';

export default function DefaultScreen() {
  const { isLoading, isLoggedIn } = useSession();
  console.log('DefaultScreen isLoggedIn ', isLoggedIn, 'isLoaded ', isLoading);

  const test = isTestEnvironment();
  if (test) {
    console.log('test environment, redirecting to test page');
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
