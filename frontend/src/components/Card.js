import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete
}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwner = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(user => user._id === currentUser._id);
  const cardLikeButtonClassName = (
    `${isLiked ? 'button_type_like button_type_liked' : 'button_type_like'}`
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      {
        isOwner && <button
          className={`button button_type_delete`}
          type="button"
          onClick={handleCardDelete}
        ></button>
      }
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="card__info">
        <h2 className="card__caption">{card.name}</h2>
        <figure className="card__likes">
          <button
            className={`button ${cardLikeButtonClassName}`}
            type="button"
            onClick={handleCardLike}
          ></button>
          <figcaption
            className="card__likes-counter"
            aria-label="Количество лайков"
          >
            {card.likes.length}
          </figcaption>
        </figure>
      </div>
    </li>
  );
}

export default Card;