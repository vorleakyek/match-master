import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from '../components/AppContext';
import { updateLevelOnDB } from "../lib/data";

// type Props = {
//   onNextLevel: (level:number)=>void;
// };

export function LevelUpPage( {onNextLevel} ) {
  const { token,level,cardTheme } = useContext(AppContext);
  const navigate = useNavigate();

  console.log('current level', level);

  function handlePlayAgain() {
    console.log('Play Again');
    navigate('/game-page');
  }

  // function handleNextLevel() {
  //   // update to 1 level higher
  //   if (level) {
  //     // const updateLevel = level + 1;
  //     // console.log(updateLevel);
  //     onNextLevel();
  //   }



    // update the state to the new level


    // onNextLevel(updateLevel);
  // }

  async function handleNextLevel() {

    if (level < 3) {
      const updatedLevel = level +1;
      onNextLevel(updatedLevel);

      //update the database
      await updateLevelOnDB(token, updatedLevel,cardTheme);



      navigate('/game-page')
    }
  }

  // need to hide "Next Level" button if the current level is 3

  return (
    <>
      <div className="container">
        <h1>Well done! </h1>
        <div className="row">
          <div className="column-full">
            <button className="btn-1" onClick={handlePlayAgain}>
              Play Again
            </button>
            <button className="btn-1" onClick={handleNextLevel}>
              Next Level
            </button>
            <label>
              {/* <h3>Choose Level:</h3>
              <select name="level">
                <option value="">Select a level</option>
                <option value="1">Level 1: 6 cards</option>
                <option value="2">Level 2: 12 cards</option>
                <option value="3">Level 3: 18 cards</option>
              </select> */}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
