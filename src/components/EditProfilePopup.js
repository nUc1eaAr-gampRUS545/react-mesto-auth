import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
export default function EditProfilePopup({isOpen,onClose,onUpdateUser}){
    const currentUser = React.useContext(CurrentUserContext);
    const [name,setName]=React.useState('');
    const [description,setDescription]=React.useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
          name:name,
          about: description,
        });
      } 
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser,isOpen]); 
    return ( 
    <PopupWithForm
        name="type_profile"
        title="Редактировать профиль"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit} 
        submitText='Сохранить' 
      >
        <label className="popup__form">
          <input
            className="popup__input popup__input_type_profile"
            minLength="2"
            required
            maxLength="40"
            id="name"
            name="name"
            value={name}
            type="text"
            placeholder="Имя"
            onChange={(e)=>{setName(e.target.value)}}
          />
          <span className="popup__message-error popup__message-error_name"></span>
        </label>
        <label className="popup__form">
          <input
            className="popup__input popup__input_type_profile"
            minLength="2"
            required
            maxLength="200"
            id="job"
            value={description}
            name="job"
            type="text"
            placeholder="Работа"
            onChange={(e)=>{setDescription(e.target.value)}}
          />
          <span className="popup__message-error popup__message-error_job"></span>
        </label>
      </PopupWithForm>)
}