export type LevelAndTheme = {
  level: number;
  cardTheme: string;
};

export type PokemonData = {
  imageUrl: string;
  name: string;
};

export type GameProgressData = {
  token: string;
  level: number;
  star: number;
  score: number;
  completedTime: number;
  totalClick: number;
  sound: boolean;
};

export type topPlayerData = {
  username: string;
  level: number;
  score: number;
  totalClicked: number;
  star: number;
  completedTime: number;
};


export async function addLevelAndTheme(
  token: string,
  levelAndTheme: LevelAndTheme
): Promise<LevelAndTheme> {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(levelAndTheme),
  };

  const res = await fetch('/api/level-and-theme', req);

  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function updateLevelOnDB(
  token: string,
  newLevel: number
): Promise<LevelAndTheme> {
  const req = {
    method: 'Put',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ level: newLevel }),
  };

  const res = await fetch('/api/update-level', req);

  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}


export async function updateGameProgressData(
  token: string,
  currentLevel: number,
  numStars: number,
  rawScore: number,
  timeCompleted: number,
  numClicked: number,
  sound: boolean
): Promise<GameProgressData> {
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      level: currentLevel,
      star: numStars,
      score: rawScore,
      completedTime: timeCompleted,
      totalClick: numClicked,
      sound
    }),
  };

  const res = await fetch('/api/update-user-game-progress', req);

  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function getLevelAndTheme(token: string): Promise<LevelAndTheme> {
  const req = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch('api/level-and-theme', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function getTopPlayers(token: string): Promise<topPlayerData[]> {
  const req = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch('/api/leadership-board', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function getPokemonData(token: string): Promise<PokemonData[]> {
  const req = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch('api/pokemon', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/***************** CODE FOR POKEMON DATA in the DATABASE *****************/

//RUN THIS CODES ONCE TO UPLOAD THE POKEMON DATA IN THE DATABASE

// export function fetchPokemonData () {
//   const promises = [];
//   for (let i = 1; i<=150; i++) {
//     const url=`https://pokeapi.co/api/v2/pokemon/${i}`;
//     promises.push(fetch(url).then(res=>res.json()));
//   }

//   return Promise.all(promises).then((results)=>{
//     const pokemon = results.map((result)=>({
//         name: result.name,
//         imageUrl: result.sprites['front_default'],
//         type: result.types.map((type)=>type.type.name).join(', '),
//         id: result.id
//     }));
//     return pokemon;
//   })
// }

// export async function savePokemonImgUrlToDB() {

//   console.log('running savePokemonImgUrlToDB')
//   try {
//     const pokemonArr = await fetchPokemonData();

//     const req = {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({pokemonArr})
//     }

//     const res = await fetch('/api/save-pokemon-data',req);
//     console.log(res);
//     if(!res.ok) throw new Error(`fetch Error ${res.status}`);

//     return await res.json();
//   } catch(err) {
//     console.error(err);
//     throw err;
//   }

// }

// savePokemonImgUrlToDB()
