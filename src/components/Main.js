import React, { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Card from "./Card.js";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getProfile()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((cardList) => {
        const usersCard = cardList.map((card) => {
          return {
            name: card.name,
            link: card.link,
            likes: card.likes,
            cardId: card._id,
          };
        });
        setCards(usersCard);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
          <div className="profile__wrapper" onClick={onEditAvatar}>
            <img src={userAvatar} className="profile__avatar" alt="аватар" />
          </div>

          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__title">{userName}</h1>
              <p className="profile__subtitle">{userDescription}</p>
              <button
                className="profile__btn-edit link"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            
          </div>
        <button
          className="profile__btn-add link"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
        <section className="cards">
          {cards.map((card) => {
            return (
              <Card key={card.cardId} card={card} onCardClick={onCardClick} />
            );
          })}
        </section>
    </main>
  );
}

export default Main;