import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { AppContext } from '../components/AppContext';
import { addLevelAndTheme } from '../lib/data';

type Props = {
  onNextLevel: (updateLevel: number) => void;
};

export function LevelUpPage({ onNextLevel }: Props) {
  const { token, level, star, cardTheme } = useContext(AppContext);
  const navigate = useNavigate();

  const numStars = star;

  function handlePlayAgain() {
    navigate('/game-page');
  }

  async function handleNextLevel() {
    if (level !== undefined && level < 3) {
      const updatedLevel = level + 1;
      onNextLevel(updatedLevel);
      const levelAndTheme = { level: updatedLevel, cardTheme: cardTheme };
      token && (await addLevelAndTheme(token, levelAndTheme));
      navigate('/game-page');
    }
  }

  const resultMessage = (numStars) => {
    if (numStars === 5) {
      return 'Excellent!';
    } else if (numStars === 4) {
      return 'Well Done!';
    } else if (numStars === 3) {
      return 'Good!';
    } else if (numStars === 2 || numStars === 1) {
      return 'Nice Try!';
    } else {
      return 'Try Again!';
    }
  };

  return (
    <>
      <div className="container margin-top-0">
        <h1 className="color-blue">{resultMessage(numStars)}</h1>
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
