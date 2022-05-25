import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeclick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `card__delete ${isOwn ? "" : 'card__delete_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like ${isLiked && "card__like_active"
    }`;

  return (
    <li className="card">
      <button
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
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
          <button
            onClick={handleLikeclick}
            className={cardLikeButtonClassName}
            type="button">
          </button>
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;