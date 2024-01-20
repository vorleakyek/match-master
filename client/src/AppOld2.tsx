import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppContext } from './components/AppContext';
import { NavBar, type PageType } from './components/NavBar';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
// import { GamePage } from './GamePage';
import type { Auth, User } from '../lib/api';

const tokenKey = 'react-context-jwt';

export default function App() {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  // const [page, setPage] = useState<PageType>('sign-in');

  // function handleNavigate(page: PageType){
  //   setPage(page);
  //   console.log(page);
  // }

  useEffect(() => {
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
    sessionStorage.setItem('token', JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  const contextValue = { user, token, handleSignIn };

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path="sign-in" element={<AuthPage />} />
          <Route path="sign-up" element={<AuthPage />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}



// import { AuthPage } from './pages/AuthPage';
// import { GamePage } from './pages/GamePage';


// export default function App() {
//   return (
//     <>
//       <GamePage/>
//       <AuthPage/>
//     </>
//   );
// }
