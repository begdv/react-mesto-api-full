export default function PopupWithForm(props) {
  const {name, formTitle, formButtonText, isOpen, onClose: handleClosePopupClick, onSubmit: handleSubmit,isLoading} = props;
  return (
    <div className={`popup popup_type_${name} ${(isOpen) ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_form">
        <button 
          className="popup__button-close" 
          type="button"
          onClick={handleClosePopupClick}
          ></button>
        <form className={`form form_type_popup ${name}-form`} name={`${name}-form`} onSubmit={handleSubmit} noValidate>
          <h2 className="form__title form__title_type_popup">{formTitle}</h2>
          {props.children}
          <button className="form__button form__button_type_popup form__button-save" type='submit'>{isLoading ? 'Сохраняется...' : formButtonText}</button>
        </form>        
      </div>      
    </div>
  );  
}