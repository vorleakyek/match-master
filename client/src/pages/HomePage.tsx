import pikachuImg from '../assets/pikachu.png';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../components/AppContext';

export function HomePage() {
  const { user, handleLevelAndTheme } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/sign-in');
  }, [user, navigate]);

  return (
    <div className="container font-size-16">
      <div className="row">
        <div className="column-full">
          <p className="color-blue bold font-size-24">
            Welcome to the matching cards game, {user?.username.toUpperCase()}!
          </p>
        </div>
      </div>

      <div className="row">
        <div className="column-95">
          <div className="row">
            <div className="row column-half pika-large-screen">
              <img
                src={pikachuImg}
                alt="Pikachu"
                className="img-default-size"
              />
            </div>
            <div className="column-half">
              <form onSubmit={handleLevelAndTheme}>
                <div className="row">
                  <div className="column-full">
                    <p className="font-size-18 margin-top-bottom-10">
                      Which level and card theme would you like to play?
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="column-full">
                    <label>
                      <h3 className="margin-top-bottom-10">Level:</h3>
                      <select name="level" className="font-size-14">
                        <option value="">Select a level</option>
                        <option value="1">Level 1: 6 cards</option>
                        <option value="2">Level 2: 12 cards</option>
                        <option value="3">Level 3: 18 cards</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="column-full">
                    <h3 className="margin-bottom-10">Select the card theme:</h3>

                    <div className="row">
                      <div className="column-third">
                        <label className=" radioGroup">
                          <input
                            type="radio"
                            name="cardTheme"
                            value="pokeball"
                            defaultChecked={true}
                          />
                          Pokeball
                        </label>
                        <label className="radioGroup">
                          <input type="radio" name="cardTheme" value="island" />
                          Island
                        </label>
                        <label className="radioGroup">
                          <input
                            type="radio"
                            name="cardTheme"
                            value="AshAndPika"
                          />
                          Ash & Pikachu
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="column-full">
                    <button className="btn-1">Play</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
