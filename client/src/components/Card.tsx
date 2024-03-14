export function Card({ card, onClick, cardTheme }) {
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
      className={`card-inner ${card.isFlipped ? 'flipped' : ''}`}
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
