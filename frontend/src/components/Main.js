import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {cards} = props;
  const handleEditAvatarClick = props.onEditAvatar;
  const handleEditProfileClick = props.onEditProfile;
  const handleAddPlaceClick = props.onAddPlace;
  const handleCardClick = props.onCardClick;
  const handleCardLike = props.onCardLike;
  const handleCardDelete = props.onCardDelete;

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div 
          className="profile__avatar"
          onClick={handleEditAvatarClick}
        >
          <img 
            className="profile__avatar-image" src={currentUser.avatar} alt={currentUser.name}
          />
        </div>  
        <div className="profile__header">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button 
            type="button" 
            className="profile__edit"  
            title="Редактировать профиль"
            onClick={handleEditProfileClick}
          />
        </div>
        <p className="profile__about">{currentUser.about}</p>
        <button 
          type="button" 
          className="profile__add-mesto" 
          title="Добавить место"
          onClick={handleAddPlaceClick}          
        />
      </section>
      <section>
        <ul className="cards"> 
         {cards && cards.map(card => 
            <Card 
              key={card._id} 
              card={card} 
              onCardClick={handleCardClick} 
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            /> 
          )}
        </ul>
      </section>
    </main>
  );
}  