import { Redirect } from 'expo-router';

export const ErrorRedirect = ({ errorMsg }: { errorMsg: string }) => {
  console.log('could not load games due to error: ', errorMsg, ', redirecting');

  if (errorMsg?.includes('Authentication Failed')) {
    return <Redirect href="/login" />;
  }

  // any non-auth errors, redirect to error page
  return <Redirect href={`/error?message=${errorMsg}`} />;
};
