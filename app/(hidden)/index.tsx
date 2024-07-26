import React from 'react';
import { Redirect, useRouter } from 'expo-router';
import { useSession } from '@/hooks/SessionProvider';

export default function DefaultScreen() {
  const session = useSession();
  const router = useRouter();

  console.log('DefaultScreen isLoggedIn ', session.isLoggedIn, 'isLoaded ', session.isLoading);

  if (session.isLoading) {
    return null;
  }

  if (session.isLoggedIn) {
    // router.push('/games');
    // return null;
    return <Redirect href="/games" />;
  } else {
    return <Redirect href="/login" />;
  }
}
