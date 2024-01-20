import { getPokemonData, getLevelAndTheme } from '../lib/data';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../components/AppContext';
import { useNavigate } from 'react-router-dom';

export function GamePage() {
  const [cards, setCards] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [numFlippedCards, setNumFlippedCards] = useState(0);
  // const [level, setLevel] = useState(null);

  const { user, token, level } = useContext(AppContext);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchPokemon() {
      try {
        const pokemonData = await getPokemonData(token);
        const { level } = await getLevelAndTheme(token);
        const distinctCardsLevels = { 1: 3, 2: 6, 3: 9 };
        const distinctCards = pokemonData.slice(0, distinctCardsLevels[level]);
        const doublePokemonData = distinctCards.concat(distinctCards);
        const pokemonArray = doublePokemonData.map((item, index) => ({
          ...item,
          cardId: `${index}`,
          flipped: false,
        }));
        const shufflePokemonArray = pokemonArray.sort(
          () => Math.random() - 0.5
        );
        setCards(shufflePokemonArray);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPokemon();
  }, []);


  useEffect(() => {
    if (flippedCount === 2) {
      const [card1, card2] = flippedCards;
      if (card1.imageUrl === card2.imageUrl) {
        setCards((cards) =>
          cards.map((card) =>
            card.cardId === card1.cardId || card.cardId === card2.cardId
              ? { ...card, flipped: true }
              : card
          )
        );

        setNumFlippedCards(numFlippedCards + 2);
        setFlippedCards([]);
        setFlippedCount(0);

        // console.log('cards.length', cards.length);
        if (numFlippedCards === cards.length - 2) {
        console.log('level-up', numFlippedCards);

        setTimeout(()=>{navigate('/level-up')},800)
         }

      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setFlippedCount(0);
          setCards(
            cards.map((card) =>
              card.cardId === card1.cardId || card.cardId === card2.cardId
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 500);
      }
    }
  }, [flippedCards, flippedCount]);


  // useEffect(()=>{
  //   if (numFlippedCards === cards.length) {
  //     console.log('level-up', numFlippedCards);
  //     navigate('/level-up');
  //   }
  // }, [numFlippedCards]);


  const handleCardClick = (clickedCard) => {
    // console.log(clickedCard);

    if (flippedCount < 2 && !clickedCard.flipped) {
      setFlippedCards([...flippedCards, clickedCard]);
      setFlippedCount(flippedCount + 1);
      setCards(
        cards.map((card) =>
          card.cardId === clickedCard.cardId ? { ...card, flipped: true } : card
        )
      );
    }
  };

  return (
    <>
      <div className="container">
        <h2>Match the cards</h2>
        <p>Level: {level}</p>
        <p>Username: {user?.username}</p>

        <div className="card-container row justify-content-space-between ">
          {cards.map((card) => (
            <div className="card" key={card.cardId}>
              <Card
                card={card}
                onClick={() => {
                  handleCardClick(card);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Card({ card, onClick }) {
  console.log(card)
  return (
    <div
      className={`card-inner column-third ${card.flipped ? 'flipped' : ''}`}
      id={card.id}
      onClick={onClick}>
      <div className="card-front"></div>
      <div className="card-back">
          <img className="card-image" src={card.imageUrl} />
          <p className="no-margin">{card.name}</p>
      </div>
    </div>
  );
}
