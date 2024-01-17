import {createContext} from 'react';
import type {Auth, User} from '../lib/api';

type AppContentValues = {
  user: User | undefined;
  token: string | undefined;
  handleSignIn: (auth:Auth) => void;
  handleSignOut: () => void;
}

export const AppContext = createContext<AppContentValues>({
  user: undefined,
  token: undefined,
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
});