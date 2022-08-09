import React from 'react';
import SignForm from './SignForm';
import { useForm } from '../hooks/useForm';

function Login({ onLogin }) {

  const {
    values,
    handleChange,
    setValues
  } = useForm({ email: '', password: '' });

  function handleSubmit(event) {
    event.preventDefault();

    if (values.email && values.password) {
      onLogin({ email: values.email, password: values.password });
    }
  }

  React.useEffect(() => {
    setValues({ email: values.email, password: values.password });
  }, [onLogin]);

  return (
    <SignForm
      onSubmit={handleSubmit}
      name='login'
      title='Вход'
      buttonCaption='Войти'
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

export default Login;