import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
  const {isOpen : isEditAvatarPopupOpen, onClose: closeAllPopups, isLoading} = props;
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isEditAvatarPopupOpen]);


  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 

  return (
    <PopupWithForm
      name="avatar"
      formTitle="Обновить аватар"
      formButtonText="Сохранить"
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
      isLoading={isLoading}      
    >
      <input 
        type="url" 
        className="form__input form__input_type_popup form__input_field_avatar-href" 
        id="avatar-href"
        name="avatar" 
        placeholder="Ссылка на аватар" 
        required
        ref={avatarRef}
      />
      <span className="form__input-error form__input-error_field_avatar-href"></span>        
    </PopupWithForm>   
  )  
}  