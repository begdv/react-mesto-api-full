import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import CurrentUserContext from '../contexts/CurrentUserContext';
import {api} from '../utils/Api';
import {apiAuth} from '../utils/ApiAuth';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import CardRemovePopup from './CardRemovePopup';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [typeInfo, setTypeInfo] = React.useState('');
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isCardRemovePopupOpen, setIsCardRemovePopupOpen] = React.useState(false);
  const [cardRemove, setCardRemove] = React.useState(0);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    verifyToken();
  }, []); // eslint-disable-line

  React.useEffect(() => {
    if(isLoggedIn) {
      api.getProfile()
      .then(user => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if(isLoggedIn) {
      api.getInitialCards()
      .then(items => {
        setCards(items);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [isLoggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  const handleUpdateUser = (user) => {
    setIsLoading(true);
    api.saveProfile(user)
    .then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }
  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api.saveAvatar(avatar)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
    });
  }

  function handleCardDelete(card) {
    setCardRemove(card._id);
    setIsCardRemovePopupOpen(true);
  }

  function handleCardDeleteSubmit(cardId) {
    setIsLoading(true);
    api.removeCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleRegister(data) {
    apiAuth.register(data).then((res) => {
      setTypeInfo('ok');
      navigate("/signin", { replace: true });
    }).catch((err) => {
      setTypeInfo('error');
    });
  }

  function handleLogin(data) {
    apiAuth.login(data).then((res) => {
      if (res.token){
        localStorage.setItem('token', res.token);
        setIsLoggedIn(true);
        navigate("/");
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  function verifyToken() {
    const token = localStorage.getItem('token');
    if (token){
      apiAuth.verifyToken(token).then((res) => {
        if (res){
          setIsLoggedIn(true);
          navigate("/");
        }
      }).catch((err) => {
        localStorage.setItem('token', '');
        navigate("/signin");
      });
    } else {
      localStorage.setItem('token', '');
      navigate("/signin");
    }
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.setItem('token', '');
    navigate("/signin", { replace: true });
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardRemovePopupOpen(false);
    setSelectedCard(null);
  }

  const closeInfoTooltip = () => {
    setTypeInfo('');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={isLoggedIn} email={currentUser ? currentUser.email : ''} onSignOut={handleSignOut}/>
        <Routes>
          <Route
            index
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                {currentUser && <Main
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />}
              </ProtectedRoute>
            }
          />
          <Route
            path="signin"
            element={
              <Login
                onLogin={handleLogin}
              />
            }
          />
          <Route
            path="signup"
            element={
              <Register
                onRegister={handleRegister}
              />
            }
          />
          <Route
            path="*"
            element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />}
          />
        </Routes>
        <Footer/>
        {currentUser &&
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
        />}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <CardRemovePopup
          isOpen={isCardRemovePopupOpen}
          cardId={cardRemove}
          onClose={closeAllPopups}
          onCardRemove={handleCardDeleteSubmit}
          isLoading={isLoading}
       />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          typeInfo={typeInfo}
          onClose={closeInfoTooltip}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;