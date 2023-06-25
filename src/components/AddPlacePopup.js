import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function AddPlacePopup({ onClose, isOpen, onAddPlaceSubmit }) {
  const [name,setName] = React.useState('');
  const [link,setLink] = React.useState('');
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlaceSubmit({
      name: name,
      link: link,
    });
  }
  React.useEffect(() => {
    setName('');
    setLink('');
}, [isOpen]);
  return (
    <PopupWithForm
      name="type_add-cards"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Сохранить"
    >
      <label className="popup__form">
        <input
          className="popup__input popup__input_type_add-cards"
          id="text"
          name="name"
          minLength="2"
          required
          value={name}
          maxLength="40"
          type="text"
          onChange={(e)=>{setName(e.target.value)}}
          placeholder="Название"
        />
        <span className="popup__message-error popup__message-error_text"></span>
      </label>
      <label className="popup__form">
        <input
          id="url"
          className="popup__input popup__input_type_add-cards"
          required
          value={link}
          name="link"
          type="url"
          onChange={(e)=>{setLink(e.target.value)}}
          placeholder="Ссылка на картинку"
        />
        <span className="popup__message-error popup__message-error_url"></span>
      </label>
    </PopupWithForm>
  );
}
