import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";
import { useContext } from "react";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper" onClick={onEditAvatar}>
          <img src={currentUser.avatar} className="profile__avatar" alt="аватар" />
        </div>

        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            className="profile__btn-edit link"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__btn-add link"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <ul className="cards">
          {cards.map((card) => {
            return (
              <Card
                key={card.cardId}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}   
    </ul>
    </main >
  );
}

export default Main;