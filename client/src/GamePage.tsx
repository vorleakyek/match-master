import pikachuImg from './assets/pikachu.png';
import {getPokemonData} from './data';
import {useEffect, useState} from 'react';

export function GamePage() {

  const [pokemonItems, setPokemonItems] = useState([]);

  useEffect(()=>{
    async function fetchPokemon(){
      try{
        const pokemonData = await getPokemonData();
        const copyPokemonData = pokemonData.map((item)=>({...item, id:`${item.id}-copy`}))
        console.log(copyPokemonData)
        const pokemonArray = [pokemonData,copyPokemonData]
        const shufflePokemonArray = pokemonArray.flat().sort(()=>Math.random()-0.5);
        setPokemonItems(shufflePokemonArray);
        console.log(shufflePokemonArray)
      } catch (err) {
        console.error(err);
      }
    }
    fetchPokemon();
  },[]);

  return(
    <>
      <h2>Match the cards</h2>

      <div className="row justify-content-space-between " >

        {pokemonItems.map((item)=>(
          <div className="column-third" key={item.id}>
            <img className = "card-image" src={item.imageUrl}/>
          </div>
        ))}

      </div>

      <button className="btn-1">New Game</button>
    </>
  )
}

//each card should be an array of object with the properties of cardFlip(T/F), img-url,
//use the map function to transform and iterater

//need to add the img-src as a prop and then use the map method
// store a list of pokemon img url from the api in an array
// use randomly selected some images from the array and display on the card
// each card should have the img source pointing to the url

//querry over the database and radomly select 6 rows

// function Card() {
//   return(
//     <div className="card">
//       <img className = "card-image hidden" src={pikachuImg} alt="card1" />
//     </div>
//   )
// }

// function Cards() {
//   return(
//     <>
//        <div className="row justify-content-space-between" >
//         <div className="column-third">
//           <Card/>
//         </div>
//         <div className="column-third">
//           <Card/>
//         </div>
//         <div className="column-third">
//           <Card/>
//         </div>
//       </div>
//     </>
//   )
// }
