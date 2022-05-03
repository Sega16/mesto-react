import React from "react";

function Card({ card, onCardClick }) {
  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <div className="card">
      <button
        className="card__delete"
        type="button"
        aria-label="удалить"
      ></button>

      <img
        className="card__img"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      <div className="card__text">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like-block">
          <button className="card__like" type="button"></button>
          <span className="card__like-count">{card.likes.length}</span>
        </div>

      </div>
    </div>
  );
}

export default Card;