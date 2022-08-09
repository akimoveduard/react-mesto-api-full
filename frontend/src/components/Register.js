import React from 'react';
import { Link } from 'react-router-dom';
import SignForm from './SignForm';
import { useForm } from '../hooks/useForm';

function Register({ onRegistration }) {

  const {
    values,
    handleChange,
    setValues
  } = useForm({ email: '', password: '' });

  function handleSubmit(event) {
    event.preventDefault();
    
    if (values.email && values.password) {
      onRegistration({ email: values.email, password: values.password });
    }
  }

  React.useEffect(() => {
    setValues({ email: values.email, password: values.password });
  }, [onRegistration]);

  return (
    <SignForm
      onSubmit={handleSubmit}
      name='register'
      title='Регистрация'
      buttonCaption='Зарегистрироваться'
      afterformMarkup={(
        <p className="signform__text">Уже зарегистрированы? <Link className="signform__link" to="/sign-in">Войти</Link></p>
      )}
    >
      <input
        className="signform__input"
        type="email"
        name="email"
        value={values.email}
        required
        placeholder="Email"
        aria-label="Электронная почта"
        autoComplete="off"
        onChange={handleChange}
      />
      <input
        className="signform__input"
        type="password"
        name="password"
        value={values.password}
        required
        placeholder="Пароль"
        aria-label="Пароль"
        autoComplete="off"
        onChange={handleChange}
      />
    </SignForm>
  );
}

export default Register;