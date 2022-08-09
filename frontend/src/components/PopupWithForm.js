import React from 'react';
import Popup from './Popup';

function PopupWithForm({isOpen, onClose, onSubmit, name, title, buttonCaption='Сохранить', children}) {

  return (
      <Popup 
        isOpen={isOpen}
        name={name}
        onClose={onClose}
      >
        <h2 className="popup__title">{title}</h2>
        <form
          className="form popup__form"
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className="button button_type_submit popup__button"
            name={`${name}-submit`}
          >
            {buttonCaption}
          </button>
        </form>
      </Popup>
  );
}

export default PopupWithForm;
