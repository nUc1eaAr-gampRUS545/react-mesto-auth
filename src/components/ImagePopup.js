import React from "react";
import { useEffect } from "react";
export default function ImagePopup({ card, onClose }) {
  useEffect(() => {
    if (!card) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
}, [card, onClose]);
const handleOverlay = (e) => {
  if (e.target === e.currentTarget) {
      onClose();
  }
}
  return (
    <div className={`popup popup_type_image ${card ? "popup_opened" : ""}` } onClick={handleOverlay}>
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
