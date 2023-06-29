import React from "react";
import Popup from "./Popup";

export default function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  onSubmit,
  isLoading
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
        <form className="popup__content" onSubmit={onSubmit}>
          <h2 className="popup__title ">{title}</h2>
          {children}
          <button type="submit" className="popup__saved">
          {isLoading? 'Сохранение...' : 'Сохранить'}
          
          </button>
        </form>
        </Popup>
  );
}
