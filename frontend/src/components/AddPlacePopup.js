import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const {
    values,
    handleChange,
    setValues
  } = useForm({ caption: '', link: '' });

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: values.caption,
      link: values.link
    });
  }

  React.useEffect(() => {
    setValues({ caption: '', link: '' });
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onAddPlace={onAddPlace}
      name="addcard"
      title="Новое место"
      buttonCaption="Создать"
    >
      <input
        onChange={handleChange}
        value={values.caption}
        className="popup__input"
        type="text"
        name="caption"
        required
        minLength="2"
        maxLength="30"
        autoFocus
        placeholder="Название"
        aria-label="Название места"
        autoComplete="off"
      />
      <span className="popup__error caption-input-error"></span>
      <input
        onChange={handleChange}
        value={values.link}
        className="popup__input"
        type="url"
        name="link"
        required
        placeholder="Ссылка на картинку"
        aria-label="Ссылка на картинку"
        autoComplete="off"
      />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;