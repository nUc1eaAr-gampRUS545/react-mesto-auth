import React from "react";
export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_image">
        <button
          className="popup__exit popup__exit_type_image"
          type="button"
          onClick={onClose}
        ></button>
        <img
          src={card?.link}
          alt={card?.name}
          className="popup__image popup__image_type_image"
        />
        <h2 className="popup__caption">{card?.name}</h2>
      </div>
    </div>
  );
}
