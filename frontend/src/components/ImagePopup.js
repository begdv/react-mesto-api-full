export default function ImagePopup(props) {
  const {card, onClose : handleClosePopupClick} = props;
  return (
    <div className={`popup popup_type_image${card ? ' popup_opened' :''}`}>
      <div className="popup__container popup__container_type_image ">
        <button className="popup__button-close" type="button" onClick={handleClosePopupClick}></button>
        <div className="image-popup">
          <img className="image-popup__photo" src={card?.link} alt={card?.name}/> 
          <p className="image-popup__title">{card?.name}</p>
        </div>
      </div>      
    </div>
  );  
}