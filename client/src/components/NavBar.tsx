import{Link, Outlet} from 'react-router-dom';

export type PageType = 'sign-in' | 'sign-up' | 'home-page' | 'game-page' | 'level-up-page' ;

export function NavBar() {
  return (
    <header>
      <nav>
        <div className="container blue-background">
          <div className="row">
            <div className="column-80 align-center">
                <h1 className="app-title">MatchMaster</h1>
            </div>
            <div className="column-20 align-center">
              <Link to="">setting</Link>
            </div>
          </div>
        </div>
      </nav>
      <Outlet/>
    </header>
  );
}
