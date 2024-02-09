import { createContext } from 'react';
import type { Auth, User } from '../lib/api';
import { FormEvent } from 'react';

type AppContentValues = {
  user: User | undefined;
  token: string | undefined;
  level: number | undefined;
  cardTheme: string;
  star: number;
  handleSignIn: (auth: Auth) => void;
  handleSignOut: () => void;
  handleLevelAndTheme: (event: FormEvent<HTMLFormElement>) => void;
};

export const AppContext = createContext<AppContentValues>({
  user: undefined,
  token: undefined,
  level: undefined,
  cardTheme: 'pokeball',
  star: 0,
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
  handleLevelAndTheme: () => undefined,
});
