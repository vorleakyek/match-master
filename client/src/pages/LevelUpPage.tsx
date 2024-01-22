import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from '../components/AppContext';
import { updateLevelOnDB } from "../lib/data";
import { FaStar } from 'react-icons/fa';

// type Props = {
//   onNextLevel: (level:number)=>void;
// };

export function LevelUpPage( {onNextLevel} ) {
  const { token,level } = useContext(AppContext);
  const navigate = useNavigate();

  const numStars = 5;

  function handlePlayAgain() {
    console.log('Play Again');
    navigate('/game-page');
  }

  async function handleNextLevel() {
    if (level < 3) {
      const updatedLevel = level +1;
      onNextLevel(updatedLevel);

      //update the database
      await updateLevelOnDB(token, updatedLevel);
      navigate('/game-page')
    }
  }

  return (
    <>
      <div className="container">
        <h1>Well done! </h1>
        <p>Number of stars: </p>
        {
          Array.from({length: numStars}).map((_,index)=>(
            <FaStar key={index} className="star filled" />
          ))
        }

        <div className="row">
          <div className="column-full">
            <button className="btn-1" onClick={handlePlayAgain}>
              Play Again
            </button>
            {(level===1 || level===2) && <button className="btn-1" onClick={handleNextLevel}>
              Next Level
            </button>}
            <label>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
