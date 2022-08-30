import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const {isOpen, onClose: closeAllPopups, isLoading} = props;
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);  

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');  

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
      name="profile"
      formTitle="Редактировать профиль"
      formButtonText="Сохранить"
      isOpen={isOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
      isLoading={isLoading}      
    >  
      <input 
        type="text" 
        className="form__input form__input_type_popup form__input_field_profile-name" 
        id="profile-name"
        name="name" 
        placeholder="Имя" 
        minLength="2" 
        maxLength="40" 
        required
        value={name}
        onChange={handleChangeName}
      />
      <span className="form__input-error form__input-error_field_profile-name"></span>
      <input 
        type="text" 
        className="form__input form__input_type_popup form__input_field_profile-about" 
        id="profile-about" 
        name="about" 
        placeholder="О себе" 
        minLength="2" 
        maxLength="2000" 
        required
        value={description}
        onChange={handleChangeDescription}        
      />
      <span className="form__input-error  form__input-error_field_profile-about"></span>      
    </PopupWithForm>    
  )  
}  