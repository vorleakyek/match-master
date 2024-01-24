import { createContext } from 'react';
import type { Auth, User } from '../lib/api';

type AppContentValues = {
  user: User | undefined;
  token: string | undefined;
  level: number | undefined;
  cardTheme: string;
  score: number;
  handleSignIn: (auth: Auth) => void;
  handleSignOut: () => void;
  handleLevelAndTheme: () => void;
};

export const AppContext = createContext<AppContentValues>({
  user: undefined,
  token: undefined,
  level: undefined,
  cardTheme: 'pokeball',
  score: 0,
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
  handleLevelAndTheme: () => undefined,
});
