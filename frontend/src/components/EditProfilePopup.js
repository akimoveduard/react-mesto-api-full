import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext);

  const {
    values,
    handleChange,
    setValues
  } = useForm({ name: currentUser.name, about: currentUser.about });

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  React.useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateUser={onUpdateUser}
      name="profile"
      title="Редактировать профиль"
    >
      <input
        value={values.name}
        onChange={handleChange}
        className="popup__input"
        type="text"
        name="name"
        required
        autoFocus
        placeholder="Имя"
        aria-label="Имя"
        minLength="2"
        maxLength="40"
        autoComplete="off"
      />
      <span className="popup__error username-input-error"></span>
      <input
        value={values.about}
        onChange={handleChange}
        className="popup__input"
        type="text"
        name="about"
        required
        placeholder="О себе"
        aria-label="О себе"
        minLength="2"
        maxLength="200"
        autoComplete="off"
      />
      <span className="popup__error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;