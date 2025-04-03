import React from 'react';
import { Redirect } from 'expo-router';
import { useSession } from '@/hooks/SessionProvider';

export default function DefaultScreen() {
  const session = useSession();

  console.log('DefaultScreen isLoggedIn ', session.isLoggedIn, 'isLoaded ', session.isLoading);

  if (session.isLoading) {
    return null;
  }

  if (session.isLoggedIn) {
    return <Redirect href="/games" />;
  }

  return <Redirect href="/login" />;
}
