import React from "react";
import PopupWithForm from "./PopupWithForm.js";
export default function DeleteCardPopup({isOpen,onClose,onSubmit,onDeleteCard}){
    function hundleSubmit(evt){
        evt.preventDefault();
        onDeleteCard()
    }
    return(
        <PopupWithForm
        name="type_add-cards"
        title="Вы уверены?"
        submitText='Да'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={hundleSubmit}
      >
        
      </PopupWithForm>)
    
}