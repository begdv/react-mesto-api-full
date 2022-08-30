import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const {card} = props;
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__button-trash${isOwn ? '' : ' card__button-trash_hidden'}`
  ); 

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__button-like${isLiked ? ' card__button-like_active' : ''}`
  ); 

  const handleCardClick = () => {
    props.onCardClick(card);
  };

  const handleCardLike = () => {
    props.onCardLike(card);
  };

  const handleCardDelete = () => {
    props.onCardDelete(card);
  };  

  return (
    <li className="card">
      <img className="card__photo" onClick={handleCardClick} src={card.link} alt={card.name}/> 
        <div className="card__info">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like">
            <button className={cardLikeButtonClassName} type="button" onClick={handleCardLike}></button>
            <span className="card__likes">{card.likes.length}</span>
          </div>
        </div> 
        <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete}></button>
      </li>
  );  
}