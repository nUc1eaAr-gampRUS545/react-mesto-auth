import React from "react";
import { useEffect } from "react";
export default function InfoTooltip({ isOpen, onClose,errorMassege}) {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
}, [isOpen, onClose])
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }
  return (
    <div className={isOpen ? `popup  popup_opened` : `popup`} onClick={handleOverlay}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__exit"
          onClick={onClose}
        ></button>
        <div
          className={
            errorMassege ?  "popup__logined" : "popup__registred"
          }
        ></div>
        <div className="popup__content">
          <h2 className="popup__registred-title ">
            {errorMassege ?  "Что-то пошло не так! Попробуйте еще раз." : "Вы успешно зарегистрировались!"}
          </h2>
          
        </div>
      </div>
    </div>
  );
}
