import { getTopPlayers, type topPlayerData } from '../lib/data';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../components/AppContext';
import { TopPlayerList } from '../components/TopPlayerList';

export function LeaderBoardPage() {
  const { token } = useContext(AppContext);
  const [topPlayersArr, setTopPlayerArr] = useState<topPlayerData[]>([]);

  useEffect(() => {
    async function fetchTopPlayers() {
      const topPlayers = await getTopPlayers(token as string);
      setTopPlayerArr(topPlayers);
    }
    fetchTopPlayers();
  }, []);

  const maxNumTopPlayers = 5;
  const level1PlayersSort = topPlayersEachLevel(
    topPlayersArr,
    1,
    maxNumTopPlayers
  );
  const level2PlayersSort = topPlayersEachLevel(
    topPlayersArr,
    2,
    maxNumTopPlayers
  );
  const level3PlayersSort = topPlayersEachLevel(
    topPlayersArr,
    3,
    maxNumTopPlayers
  );

  function topPlayersEachLevel(topPlayersArr: topPlayerData[],level:number, maxNumTopPlayers:number) {
    const sortByScoreDesc = (a:topPlayerData, b:topPlayerData) => b.score - a.score;
    return topPlayersArr
      .filter((topPlayer: topPlayerData) => topPlayer.level === level)
      .sort(sortByScoreDesc)
      .slice(0, maxNumTopPlayers);
  }

  return (
    <>
      <div className="container color-blue">
        <h1 className="no-margin padding-top-10">Leadership Board</h1>
        <h2>Top players</h2>
        <TopPlayerList level={1} players={level1PlayersSort} />
        <TopPlayerList level={2} players={level2PlayersSort} />
        <TopPlayerList level={3} players={level3PlayersSort} />
      </div>
    </>
  );
}
