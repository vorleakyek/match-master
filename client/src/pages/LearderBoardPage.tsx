import {getTopPlayers} from '../lib/data';
import {useContext, useEffect} from 'react';
import { AppContext } from '../components/AppContext';


export function LeaderBoardPage() {
  const {token} = useContext(AppContext);

  useEffect(()=>{
    async function fetchTopPlayers() {
      const topPlayersArr = await getTopPlayers(token as string);
      console.log(topPlayersArr)
    }
    fetchTopPlayers();
  },[]);


  return (
    <>
      <div className="container">
        <h1 className="no-margin padding-top-10">Leadership Board</h1>
        <h2>Top players</h2>

        <div className="row">
          <div className="column-one-forth">
            <p>Level 1</p>
          </div>
          <div className="column-one-forth">
            <p>Time</p>
          </div>
          <div className="column-one-forth">
            <p>Total Clicks</p>
          </div>
          <div className="column-one-forth">
            <p>Stars</p>
          </div>
        </div>
      </div>

    </>
  );
}
