import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AppContext } from './components/AppContext';
import { NavBar } from './components/NavBar';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';
import './App.css';
import { Auth, User } from './lib/api';
import { LevelUpPage } from './pages/LevelUpPage';
import { type LevelAndTheme, addLevelAndTheme } from './lib/data';
import { FormEvent } from 'react';

const tokenKey = 'react-context-jwt';

export default function App() {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [level, setLevel] = useState<number>();
  const [cardTheme, setCardTheme] = useState<string>('pokeball');
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // If user logged in previously on this browser, authorize them
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const a = JSON.parse(auth);
      setUser(a.user);
      setToken(a.token);
    }
    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

  function handleSignIn(auth: Auth) {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
    navigate('/sign-in');
  }

  async function handleLevelAndTheme(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const level = Number(formData.get('level'));
      const cardTheme = formData.get('cardTheme');
      const levelAndTheme = { level, cardTheme };

      await addLevelAndTheme(token as string, levelAndTheme as LevelAndTheme);
      setLevel(level);
      setCardTheme(cardTheme as string);
      navigate('/game-page');
    } catch (err) {
      console.log(err);
    }
  }

  const contextValue = {
    user,
    token,
    level,
    cardTheme,
    score,
    handleSignIn,
    handleSignOut,
    handleLevelAndTheme,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route
            path="game-page"
            element={
              <GamePage onUpdateScore={(newScore:number) => setScore(newScore)} />
            }
          />
          <Route path="sign-in" element={<AuthPage action="sign-in" />} />
          <Route path="sign-up" element={<AuthPage action="sign-up" />} />
          <Route
            path="level-up"
            element={
              <LevelUpPage
                onNextLevel={(updateLevel:number) => setLevel(updateLevel)}
              />
            }
          />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}
