import { useContext, useState } from 'react';
import { Link, Outlet} from 'react-router-dom';
import { AppContext } from './AppContext';
import { FaGear } from 'react-icons/fa6';

export function NavBar() {
  const { handleSignOut } = useContext(AppContext);
  const [isHidden, setIsHidden] = useState(true);
  const showSetting = !['/sign-up', '/sign-in'].includes(window.location.pathname);

  function handleSignOutAndReset() {
    setIsHidden(true);
    handleSignOut();
  }

  return (
    <header>
      <nav>
        <div className="container blue-background">
          <div className="row">
            <div className="column-four-fifth">
              <h1 className="app-title">MatchMaster</h1>
            </div>
            {showSetting && (
              <div className="setting-container column-one-fifth">
                <button className="gear-btn">
                  <FaGear
                    className="gear-icon"
                    onClick={() => {
                      setIsHidden(!isHidden);
                    }}
                  />
                </button>
                <div className={`setting ${isHidden ? 'hidden' : ''}`}>
                  <p>
                    <Link
                      className="link-style"
                      to="/leader-board"
                      onClick={() => {
                        setIsHidden(true);
                      }}>
                      Leader Board
                    </Link>
                  </p>
                  <p>
                    <Link
                      className="link-style"
                      to=""
                      onClick={() => {
                        setIsHidden(true);
                      }}>
                      Homepage
                    </Link>
                  </p>
                  <p>
                    <Link
                      className="link-style"
                      to="/sign-in"
                      onClick={handleSignOutAndReset}>
                      Sign out
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </header>
  );
}
