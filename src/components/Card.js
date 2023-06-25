import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
export default function Card({ card, onCardClick,onCardLike,onDeleteCard}) {
  const currentUser = React.useContext(CurrentUserContext);
  const handleCardLike = () => {
    onCardLike(card); 
  };
  const handleDeleteClick=()=>{
    onDeleteCard(card)
  }
  const handleCardClick = () => {
    onCardClick(card); 
  };

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `card__button ${isLiked && 'card__button_active'}` 
  );
  return (
      <article className="card">
        {isOwn && <button className='card__bascket popup_opened' type="button" onClick={handleDeleteClick}/ >} 
        <img
          className="card__photography"
          src={`${card.link}`}
          alt={`${card.name}`}
          onClick={handleCardClick}
        />
        <div className="card__info">
        
          <h2 className="card__title">{card.name}</h2>
          <div className="card__group">
            <button className={cardLikeButtonClassName} type="button" onClick={handleCardLike}></button>
            <h3 className="card__likes" id="countLikes">
              {card.likes.length}
            </h3>
          </div>
        </div>
        <button className="card__bascket"></button>
      </article>
    
  );
}


