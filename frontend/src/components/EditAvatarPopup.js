import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar
}) {

  const {
    values,
    handleChange,
    setValues
  } = useForm({ avatar: '' });

  function handleSubmit(event) {
    event.preventDefault();
    
    onUpdateAvatar(values.avatar);
  }

  React.useEffect(() => {
    setValues({ avatar: '' });
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateAvatar={onUpdateAvatar}
      name="avatar"
      title="Обновить аватар"
    >
      <input
        className="popup__input"
        type="url"
        name="avatar"
        onChange={handleChange}
        value={values.avatar}
        required
        placeholder="Ссылка на аватар"
        aria-label="Ссылка на аватар"
        autoComplete="off"
      />
      <span className="popup__error avatar-input-error"></span>
    </PopupWithForm>
  );

}

export default EditAvatarPopup;