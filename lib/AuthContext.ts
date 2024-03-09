import React from 'react';

const authContext = {
  signIn: async () => {
    // In a production app, we need to send some data (usually username, password) to server and get a token
    // We will also need to handle errors if sign in failed
    // After getting token, we need to persist the token using `SecureStore`
    // In the example, we'll use a dummy token
  },
  signOut: () => {},
};

export const AuthContext = React.createContext(authContext);
