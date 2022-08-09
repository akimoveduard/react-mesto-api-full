import React from "react";
import Card from "./Card";
import noPhoto from "../images/nophoto.png";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete
}) {

  const currentUser = React.useContext(CurrentUserContext);
 
  return (
    <div className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__avatar-wrapper">
          <img
            className="profile__avatar"
            src={
              currentUser.avatar === undefined || currentUser.avatar === null
                ? noPhoto
                : currentUser.avatar
            }
            alt="Аватар пользователя"
          />
          <button
            className="button button_type_avatar"
            name="avatar-button-open"
            type="button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__username">
              {currentUser.name === undefined || currentUser.name === null
                ? " "
                : currentUser.name}
            </h1>
            <button
              className="button button_type_edit"
              name="profile-button-open"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__about">
            {currentUser.about === undefined || currentUser.about === null
              ? " "
              : currentUser.about}
          </p>
        </div>
        <button
          className="button button_type_add"
          name="addcard-button-open"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="photo-grid" aria-label="Карточки мест">
        <ul className="photo-grid__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Main;