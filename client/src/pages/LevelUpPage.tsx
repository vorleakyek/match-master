import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from '../components/AppContext';
import { updateLevelOnDB } from "../lib/data";
import { FaStar } from 'react-icons/fa';

type Props = {
  onNextLevel: (updateLevel: number) => void;
};

export function LevelUpPage( {onNextLevel}: Props ) {
  const { token,level,score } = useContext(AppContext);
  const navigate = useNavigate();

  const numStars = score;

  function handlePlayAgain() {
    console.log('Play Again');
    navigate('/game-page');
  }

  async function handleNextLevel() {
    if (level !== undefined && level < 3) {
      const updatedLevel = level + 1;
      onNextLevel(updatedLevel);
      token && await updateLevelOnDB(token, updatedLevel);
      navigate('/game-page')
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="color-blue">Well done! </h1>
        {Array.from({ length: numStars }).map((_, index) => (
          <FaStar key={index} className="star filled" />
        ))}

        <div className="row">
          <div className="column-full">
            <button className="btn-1" onClick={handlePlayAgain}>
              Play Again
            </button>
            {(level === 1 || level === 2) && (
              <button className="btn-1" onClick={handleNextLevel}>
                Next Level
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
