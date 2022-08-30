import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function CardRemovePopup(props){
  const {isOpen : isCardRemovePopupOpen, onClose: closeAllPopups, isLoading} = props;

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onCardRemove(props.cardId);
  } 
  
  return (
    <PopupWithForm
      name="remove"
      formTitle="Вы уверены?"
      formButtonText="Да"
      isOpen={isCardRemovePopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
      isLoading={isLoading}      
    />)
}