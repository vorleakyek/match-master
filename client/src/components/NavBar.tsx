import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppContext } from './AppContext';
import { FaGear } from 'react-icons/fa6';

export function NavBar() {
  const { handleSignOut } = useContext(AppContext);
  let isHidden = 'false'; // Need to use the state hook

  return (
    <header>
      <nav>
        <div className="container blue-background">
          <div className="row">
            <div className="column-80 align-center">
              <h1 className="app-title">MatchMaster</h1>
            </div>
            <div className="setting column-20 align-center">
              <FaGear
                className="gear-icon"
                onClick={() => {
                  isHidden = '';
                  // console.log(isHidden);
                }}
              />
              <div>
                <button className={isHidden} onClick={handleSignOut}>
                  Sign out
                </button>
                <Link to=''>Homepage</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </header>
  );
}
