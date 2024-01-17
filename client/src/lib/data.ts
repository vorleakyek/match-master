export async function addLevelAndTheme(levelAndTheme) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify(levelAndTheme),
  };

  const res = await fetch('/api/level-and-theme',req);

  if(!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}


export async function getPokemonData() {
  const req = {
    method: 'GET'
    // headers: {
    //   Authorization: `Bearer ${sessionStorage.getItem('token')}`
    // }
  };
  const res = await fetch('api/pokemon',req);
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
//     // console.log("pokemon from data.ts", pokemon);
//     return pokemon;
//   })

//   // console.log('arrPromise',arrPromise);
//   // return arrPromise;
// }


// export async function savePokemonImgUrlToDB() {

//   console.log('running savePokemonImgUrlToDB')
//   try {
//     const pokemonArr = await fetchPokemonData();
//     // console.log('pokemonArr', pokemonArr)

//     const req = {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({pokemonArr})
//     }
//     console.log(req.body)

//     console.log('req from data.ts', req)

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
