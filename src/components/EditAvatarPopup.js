import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";
export default function EditAvatarPopup({isOpen,
    onClose,onUpdateAvatar}){

      const avatarRef=React.useRef();
     
    function handleSubmit(evt) {
      evt.preventDefault();
      onUpdateAvatar({
        avatar:avatarRef.current.value
      });
    } 
    return(
      <PopupWithForm
      name="type_profile-change"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText='Сохранить'
    >
      <label className="popup__form">
        <input
          className="popup__input popup__input_type_profile-change"
          id="avatar"
          name="avatar"
          type="url"
          required
          ref={avatarRef}
          placeholder="Ссылка"
        />
        <span className="popup__message-error popup__message-error_avatar"></span>
      </label>
    </PopupWithForm>
    )
}