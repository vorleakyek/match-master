import { getPokemonData, getLevelAndTheme } from '../lib/data';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../components/AppContext';
import { useNavigate } from 'react-router-dom';

export function GamePage() {
  const [cards, setCards] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [numOfCorrectFlippedCards, setNumOfCorrectFlippedCards] = useState(0);
  const [totalNumCardsClicked, setTotalNumCardsClicked] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [timeSpentInSecond, setTimeSpentInSecond] = useState(0);
  const [timeSpentInMinutes, setTimeSpentInMinutes] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [score, setScore] = useState(0);
  const [stopTiming, setStopTiming] = useState(false);

  const { user, token, level, cardTheme } = useContext(AppContext);
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


  useEffect(()=>{
      const intervalId = setInterval(() => {
        const endTime = new Date();
        const timeSpent = (endTime - startTime) / 1000;

        if (!stopTiming) {
          setTotalTimeSpent(timeSpent);
          setTimeSpentInMinutes(Math.floor((timeSpent / 60) % 60));
          setTimeSpentInSecond(Math.floor(timeSpent % 60));
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    },[startTime, stopTiming])


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

        setNumOfCorrectFlippedCards(numOfCorrectFlippedCards + 2);
        setFlippedCards([]);
        setFlippedCount(0);

        if (numOfCorrectFlippedCards === cards.length - 2) {
          setStopTiming(true);
          setScore(calculateStars(level, totalNumCardsClicked, totalTimeSpent));
          setTimeout(() => {
            navigate('/level-up');
          }, 800);
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

  const handleCardClick = (clickedCard) => {
    setTotalNumCardsClicked(totalNumCardsClicked + 1);
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

  const calculateStars = (level, numberClicks, totalTimeSpent) => {

    let maxClicks = 0;
    let maxTotalTimeSpent = 0;

    if (level === 1) {
      maxClicks = 30;
      maxTotalTimeSpent = 120;
    } else if (level === 2) {
      maxClicks = 60;
      maxTotalTimeSpent = 240;
    } else if (level === 3) {
      maxClicks = 90;
      maxTotalTimeSpent = 360;
    }

    const clicksPercentage = (maxClicks - numberClicks) / maxClicks * 100;
    const timePercentage = (maxTotalTimeSpent - totalTimeSpent)/maxTotalTimeSpent * 100;

    const overallPercentage = (clicksPercentage + timePercentage) / 2 ;

    console.log(clicksPercentage,timePercentage,overallPercentage)

    if (overallPercentage >=80) {
      return 5;
    } else if (overallPercentage >= 70) {
      return 4;
    } else if (overallPercentage >= 50) {
      return 3;
    } else if (overallPercentage >= 30) {
      return 2;
    } else if (overallPercentage >= 10) {
      return 1;
    } else {
      return 0;
    }
  }

  return (
    <>
      <div className="container">
        <h2>Match the cards</h2>
        <p>Level: {level}</p>
        <p>Number of stars: {score} , totalTimeSpent: {totalTimeSpent.toFixed(0)}</p>
        <p>Username: {user?.username}</p>
        <p>Time: {timeSpentInMinutes.toString().padStart(2,'0')} : {timeSpentInSecond.toString().padStart(2,'0')} </p>
        <p>Number of cards Clicked: {totalNumCardsClicked} </p>

        <div className="card-container row justify-content-space-between ">
          {cards.map((card) => (
            <div className="card" key={card.cardId}>
              <Card
                card={card}
                cardTheme = {cardTheme}
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

function Card({ card, onClick, cardTheme }) {
  const cardCover = (theme) => {
    if (theme === 'island') {
      return 'poke-island-theme';
    }
    if (theme === 'pokeball') {
      return 'pokemon-card-theme';
    } else {
      return 'Ash-and-Pika-theme';
    }
  };

  return (
    <div
      className={`card-inner column-third ${card.flipped ? 'flipped' : ''}`}
      id={card.id}
      onClick={onClick}>
      <div className={`card-front ${cardCover(cardTheme)}`}></div>
      <div className="card-back">
        <img className="card-image" src={card.imageUrl} />
        <p className="no-margin">{card.name}</p>
      </div>
    </div>
  );
}
