import React from 'react';
import Popup from './Popup';
import iconSuccess from '../images/icon-success.svg';
import iconError from '../images/icon-error.svg';

function InfoTooltip({
  isOpen,
  onClose,
  isSuccess
}) {

  return (
    <Popup
      isOpen={isOpen}
      name="infotooltip"
      onClose={onClose}
    >
        <img className="popup__icon" src={isSuccess ? iconSuccess : iconError} alt={isSuccess ? 'Успешная регистрация' : 'Неудачная регистрация'} />
        <p className="popup__message">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
    </Popup>
  );

}

export default InfoTooltip;