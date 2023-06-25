import React from "react";
import { useLocation } from "react-router-dom";
export default function InfoTooltip({ isOpen, onClose, errorMassege }) {
  const location = useLocation();
  return (
    <div className={isOpen ? `popup  popup_opened` : `popup`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__exit"
          onClick={onClose}
        ></button>
        <div
          className={
            location.pathname === "/sign-up"
              ? "popup__registred"
              : "popup__logined"
          }
        ></div>
        <div className="popup__content">
          <h2 className="popup__registred-title ">
            {location.pathname === "/sign-up"
              ? "Вы успешно зарегистрировались!" 
              : "Что-то пошло не так! Попробуйте еще раз."}
          </h2>
          
        </div>
      </div>
    </div>
  );
}
