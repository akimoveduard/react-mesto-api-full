import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import api from "../utils/Api";
import * as auth from '../utils/auth';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';

import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {

  const history = useHistory();

  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);

  const [userEmail, setUserEmail] = React.useState('');

  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: ''
  });

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const isPopupOpened = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link || isInfoTooltipPopupOpen;

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function getInitialData() {
    Promise.all([
      api.getCards(),
      api.getUserInfo()
    ])
      .then((result) => {
        const [cards, user] = result;
        setCurrentUser(user);
        setCards(cards);
      })
      .catch ((error) => {
        console.log(error)
      })
  }

  function handleUpdateUser(user) {
    api.updateProfile(user.name, user.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      })      
  }

  function handleUpdateAvatar(url) {
    api.updateAvatar(url)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    api.changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleLogin(data) {
    auth.login(data.email, data.password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        checkToken();
      })
      .catch(error => {
        setSuccess(false);
        setIsInfoTooltipPopupOpen(true);        
        console.log(error);
      });
  }

  function handleRegistration(data) {
    auth.register(data.email, data.password)
      .then((res) => {
        setSuccess(true);
        history.push('/sign-in');
      })
      .catch(error => {
        setSuccess(false);
        console.log(error);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  };

  function checkToken() {
    console.log(localStorage);
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
      .then((res)=> {
        setUserEmail(res.data.email)
        setLoggedIn(true);
        getInitialData();
        history.push('/');        
      })
      .catch(error => {
        setSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(error);
      });
    }
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  React.useEffect(() => {
    checkToken();
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header 
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          userEmail={userEmail}
        />
        <Switch>
          <Route path="/sign-up">
            <Register
              onRegistration={handleRegistration}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onLogin={handleLogin}
            />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={isLoggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
