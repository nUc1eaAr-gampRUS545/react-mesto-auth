import React from "react";
import Card from "./Card";
import addButton from "../images/profile/addBotton.svg";
import { CurrentUserContext } from "../context/CurrentUserContext.js";


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick,cards,onCardLike,onDeleteCard}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-button"
          onClick={onEditAvatar}
        >
          <img className="profile__avatar" src={currentUser.avatar} alt="Иконка" />
        </button>

        <div className="profile__info">
          <div className="profile__info-block">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__button" type="button" onClick={onAddPlace}>
          <img
            className="profile__add-button"
            src={addButton}
            alt="кнопка 'Добавить'"
          />
        </button>
      </section>
      <ul className="elements">
        {cards.map((card) => (
          <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onDeleteCard={onDeleteCard}/>
        ))}
      </ul>
    </main>
  );
}
export default Main;
