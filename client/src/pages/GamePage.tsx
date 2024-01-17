import { getPokemonData } from '../lib/data';
import { useEffect, useState } from 'react';

export function GamePage() {
  const [cards, setCards] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const pokemonData = await getPokemonData();
        const doublePokemonData = pokemonData.concat(pokemonData);
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

  console.log(cards);

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

        setFlippedCards([]);
        setFlippedCount(0);

        console.log('matched!');
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setFlippedCount(0);
          setCards(cards.map((card) =>
              card.cardId === card1.cardId || card.cardId === card2.cardId
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 500);
      }
    }
  }, [flippedCards, flippedCount]);

  const handleCardClick = (clickedCard) => {
    console.log(clickedCard);

    if (flippedCount < 2 && !clickedCard.flipped) {
      setFlippedCards([...flippedCards, clickedCard]);
      setFlippedCount(flippedCount + 1);
      setCards(cards.map((card) =>
          card.cardId === clickedCard.cardId ? { ...card, flipped: true } : card
        )
      );
    }
  };

  return (
    <>
      <div className="container">
        <h2>Match the cards</h2>

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
  return (
    <div
      className={`card-inner column-third ${card.flipped ? 'flipped' : ''}`}
      id={card.id}
      onClick={onClick}>
      <div className="card-front">Front </div>
      <div className="card-back">
        <img className="card-image" src={card.imageUrl} />
      </div>
    </div>
  );
}
