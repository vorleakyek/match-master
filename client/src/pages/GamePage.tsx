import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaVolumeXmark, FaVolumeLow } from 'react-icons/fa6';

import flippedSound from '../assets/flipcard.mp3';
import matchSound from '../assets/correct.mp3';
import winSound from '../assets/level-win.mp3';

import { AppContext } from '../components/AppContext';
import { Card } from '../components/Card';
import {
  getLevelAndTheme,
  updateGameProgressData,
  fetchPokemonData,
  calculateScore,
  calculateStar,
  gameLevel,
} from '../lib/data';

type Cards = {
  cardId: string;
  isFlipped: boolean;
  imageUrl: string;
  name: string;
};

export function GamePage({ updateStarLevelTheme }) {
  const [cards, setCards] = useState<Cards[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Cards[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);

  const [startTime, setStartTime] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isStopTiming, setIsStopTiming] = useState(false);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const { user, token, level, cardTheme } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function generateCards() {
      try {
        const pokemonDataArr = await fetchPokemonData(); //Get 9 distinct images and the names
        const { level, cardTheme } = await getLevelAndTheme(token as string);
        updateStarLevelTheme(0, level, cardTheme);
        const distinctCardsLevels = { 1: 3, 2: 6, 3: 9 };
        const distinctCards = pokemonDataArr.slice(
          0,
          distinctCardsLevels[level as number]
        );
        const doublePokemonData = distinctCards.concat(distinctCards);
        const pokemonArray = doublePokemonData.map((item, index) => ({
          ...item,
          cardId: `${index}`,
          isFlipped: false,
        }));
        const shufflePokemonArray = pokemonArray.sort(
          () => Math.random() - 0.5
        );
        setCards(shufflePokemonArray);
      } catch (err) {
        console.error(err);
      }
    }
    generateCards();
    setStartTime(new Date().getTime());
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const endTime = new Date().getTime();
      const timeSpent = (endTime - startTime) / 1000;

      if (!isStopTiming) {
        setTotalTimeSpent(timeSpent);
        setMinutes(Math.floor((timeSpent / 60) % 60));
        setSeconds(Math.floor(timeSpent % 60));
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime, isStopTiming]);

  useEffect(() => {
    async function compareCards() {
      if (flippedCount === 2) {
        const [card1, card2] = flippedCards;
        if (card1.imageUrl === card2.imageUrl) {
          setCards((cards) =>
            cards.map((card) =>
              card.cardId === card1.cardId || card.cardId === card2.cardId
                ? { ...card, isFlipped: true }
                : card
            )
          );

          setRevealedCount(revealedCount + 2);
          setFlippedCards([]);
          setFlippedCount(0);
          isMuted && new Audio(matchSound).play();

          if (revealedCount === cards.length - 2) {
            isMuted && new Audio(winSound).play();
            setIsStopTiming(true);

            const score = calculateScore(
              level as number,
              totalClicks,
              totalTimeSpent
            );

            const star = calculateStar(score);
            updateStarLevelTheme(star, level, cardTheme);

            token &&
              (await updateGameProgressData(
                token,
                level!,
                star,
                score,
                totalTimeSpent,
                totalClicks,
                isMuted
              ));

            setTimeout(() => {
              navigate('/level-up');
            }, 1000);
          }
        } else {
          setTimeout(() => {
            setFlippedCards([]);
            setFlippedCount(0);
            setCards(
              cards.map((card) =>
                card.cardId === card1.cardId || card.cardId === card2.cardId
                  ? { ...card, isFlipped: false }
                  : card
              )
            );
          }, 500);
        }
      }
    }
    compareCards();
  }, [flippedCards, flippedCount]);

  const handleCardClick = (clickedCard: Cards) => {
    isMuted && new Audio(flippedSound).play();
    !clickedCard.isFlipped && setTotalClicks(totalClicks + 1);
    if (flippedCount < 2 && !clickedCard.isFlipped) {
      setFlippedCards([...flippedCards, clickedCard]);
      setFlippedCount(flippedCount + 1);
      setCards(
        cards.map((card) =>
          card.cardId === clickedCard.cardId
            ? { ...card, isFlipped: true }
            : card
        )
      );
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-space-between paddingLR-20 ">
          <div className="column-third text-align-left">
            <p className="level">Level: {level}</p>
            <p className="color-blue">Total Clicks: {totalClicks} </p>
          </div>
          <div className="column-two-third text-align-right">
            <p className="username uppercase">{user?.username.toUpperCase()}</p>
            <p className="color-blue">
              Time: {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </p>
          </div>
        </div>
        <div className="row justify-content-space-between margin-left-20 ">
          <div className="d-flex justify-content-start column-one-fifth ">
            <button
              className="sound-btn"
              onClick={() => {
                setIsMuted(!isMuted);
              }}>
              {isMuted ? (
                <FaVolumeLow className="sound-icon" />
              ) : (
                <FaVolumeXmark className="sound-icon" />
              )}
            </button>
          </div>
          <div className="column-three-fifth text-align-left">
            <h2 className="uppercase font-size-18 padding-10 text-align-center">
              Match the cards
            </h2>
          </div>
          <div className="column-one-fifth"></div>
        </div>

        <div className="card-container row justify-content-center ">
          <div
            className={`row ${gameLevel(level)} justify-content-space-around`}>
            {cards.map((card) => (
              <div className="card card-size" key={card.cardId}>
                <Card
                  card={card}
                  cardTheme={cardTheme}
                  onClick={() => {
                    handleCardClick(card);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
