import type { topPlayerData } from "../lib/data";

export function TopPlayerList({
  level,
  players,
}: {
  level: number;
  players: topPlayerData[];
}) {
  return (
    <div className="container row">
      <div className="column-full">
        <div className="row">
          <h3 className="d-block level-heading">Level: {level}</h3>
        </div>
        <div className="row">
          <table className="table-style">
            <thead>
              <tr>
                <th className="padding-R-10">Username</th>
                <th className="padding-R-10">Time (Sec)</th>
                <th className="padding-R-10">Clicks</th>
                <th className="padding-R-10">Score</th>
                <th className="padding-R-10">Stars</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={Math.random()}>
                  <td>{player.username}</td>
                  <td>{player.completedTime.toFixed(2)}</td>
                  <td>{player.totalClicked}</td>
                  <td>{player.score.toFixed(2)}</td>
                  <td>{player.star}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
