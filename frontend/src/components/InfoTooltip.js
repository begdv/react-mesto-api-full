import React from 'react';
import {typeInfoMessage} from '../utils/const';
import error from '../images/header/error.svg';
import ok from '../images/header/ok.svg';

export default function InfoToolTip(props){
  const {typeInfo, onClose : handleClosePopupClick} = props;
  const typeInfoIcon =  typeInfo ? (typeInfo === 'ok' ? ok : error) : null;
  return (
    <div className={`popup popup_type_info${typeInfo ? ' popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_info ">
        <button className="popup__button-close" type="button" onClick={handleClosePopupClick}></button>
        <div className="info-popup">
          <img className="info-popup__icon" src={typeInfoIcon} alt={typeInfoMessage[typeInfo]}/>
          <p className="info-popup__message">{typeInfoMessage[typeInfo]}</p>
        </div>
      </div>      
    </div>
  );
}