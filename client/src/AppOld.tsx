import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

export default function App() {
  const [serverData, setServerData] = useState('');

  useEffect(() => {
    async function readServerData() {

      const res = await fetch('https://pokeapi.co/api/v2/pokemon/700');
      const data = await res.json();

      console.log('Data from server:', data);

      setServerData(data.sprites['front_default']);
    }

    readServerData();
  }, []);


  const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
    });
};

fetchPokemon();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
          <img src={serverData} className="pokemon" alt="React logo" />
        </a>
      </div>
      <h1>{serverData}</h1>
    </>
  );
}




// export function GamePage() {

//   const [pokemonItems, setPokemonItems] = useState([]);

//   const [prevImgCard, setPrevImgCard] = useState(null);
//   const [currentImgCard, setCurrentImgCard] = useState(null);
//   const [activeIndex1, setActiveIndex1] = useState(null);
//   const [activeIndex2, setActiveIndex2] = useState(null);


//   useEffect(()=>{
//     async function fetchPokemon(){
//       try{
//         const pokemonData = await getPokemonData();
//         const copyPokemonData = pokemonData.map((item)=>({...item, id:`${item.id}-copy`}))
//         console.log(copyPokemonData)
//         const pokemonArray = [pokemonData,copyPokemonData]
//         const shufflePokemonArray = pokemonArray.flat().sort(()=>Math.random()-0.5);
//         setPokemonItems(shufflePokemonArray);
//         console.log(shufflePokemonArray)
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     fetchPokemon();
//   },[]);




//   function handleCardFlip(item, index) {

//     setPrevImgCard(currentImgCard);
//     setCurrentImgCard(item.imageUrl)
//     setActiveIndex1(activeIndex2);
//     setActiveIndex2(index);

//     // console.log('previous vs current' , prevImgCard,currentImgCard)
//     if (prevImgCard !== currentImgCard) {

//       setTimeout(()=>{
//         setActiveIndex1(null);
//         setActiveIndex2(null);
//         setPrevImgCard(null);
//         setCurrentImgCard(null);
//       }, 3500);

//     }

//     // console.log('flip', item.imageUrl );
//     // console.log('clicked' ,index, activeIndex1);

//     }




    //  console.log('previous vs current' , prevImgCard,currentImgCard)

  return(
    <>
      <div className="container">
        <h2>Match the cards</h2>

        <div className="row justify-content-space-between " >

          {pokemonItems.map((item,index)=>(
            <div className="card" key={item.id}>
              <Card item={item} onFlip={()=>handleCardFlip(item, index)} isActive={activeIndex1 === index || activeIndex2 === index}/>
            </div>
          ))}

        </div>

        <button className="btn-1">New Game</button>
        </div>

    </>
  )
}


function Card({item, onFlip, isActive}) {

  return (
    <div className={`card-inner column-third ${isActive? 'flip' : ''}`} id={item.id} onClick={onFlip}>
      <div className="card-front"/>
      <div className="card-back">
        <img className = "card-image" src={item.imageUrl}/>
      </div>
    </div>
  )
}





    // Click on card A > flip (i.e. the isActive=true - setActiveIndex1=index)  > set prevImgCard = null and currentImgCard = item.imageUrl  > card is not clickable anymore

    // Click on card B > flip (i.e. the isActive=true - setActiveIndex2=index) > set prevImageCard = currentImgCard and currentImgCard = item.imageUrl > card is not clickable anymore


    // Click on card B > flip > set currentClickedCardId
    // If card B does not match with card A, then flip both cards back. Reset the states for prev and current to null

    // Click on card A > flip > set previousClickedCardId
    // Click on card B > flip > set currentClickedCardId
    // If card B matches with card A, then both cards stay flip
    // and can't be flipping back. Reset the states for prev and current to null



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



{/* <div>
        <NavBar onNavigate={handleNavigate} />
        {page === 'sign-up' && <RegistrationForm />}
        {page === 'sign-in' && <SignInForm />}
        {page === 'home-page' && <HomePage />}
        {page === 'game-page' && <GamePage />}
      </div> */}
