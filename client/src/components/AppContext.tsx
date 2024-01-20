import {createContext} from 'react';
import type {Auth, User} from '../lib/api';

type AppContentValues = {
  user: User | undefined;
  token: string | undefined;
  level: number | undefined;
  cardTheme: string;
  handleSignIn: (auth: Auth) => void;
  handleSignOut: () => void;
  handleLevelAndTheme: () => void;
};

export const AppContext = createContext<AppContentValues>({
  user: undefined,
  token: undefined,
  level: undefined,
  cardTheme: 'pokeball',
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
  handleLevelAndTheme: () => undefined
});
