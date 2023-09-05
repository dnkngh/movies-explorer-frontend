import { Navigate } from 'react-router-dom';

import Auth from '../Auth/Auth';

import useValidation from '../../utils/useValidation';
import initValidState from '../../utils/initValidState';


function Register({ onSubmit, isLoggedIn }) {

  const { formValues, handleChange } = useValidation({
    name: initValidState,
    email: initValidState,
    password: initValidState,
  });

  const handleSubmit = () => {
    return onSubmit({
      name: formValues.name.value,
      email: formValues.email.value,
      password: formValues.password.value,
    });
  };

  if (isLoggedIn) {
    return ( <Navigate to={'/'} />);
  }

  return (
    <Auth
      title='Добро пожаловать!'
      link='/signin'
      buttonText='Зарегистрироваться'
      subtitle='Уже зарегистрированы?'
      subLink='/signin'
      subLinkName='Войти'
      toggleSubmit={(formValues.name.isValid() && formValues.email.isValid() && formValues.password.isValid())}
      onSubmit={handleSubmit}
    >
      <label className='auth__label'>
        Имя
        <input
          className={`auth__input ${formValues.email.isValid() ? 'auth__input_valid' : 'auth__input_invalid'}`}
          id='name'
          type='name'
          name='name'
          minLength='2'
          maxLength='30'
          required
          placeholder='Введите имя'
          onChange={handleChange}
          value={formValues.name.value}
        />
        <span className='auth__input-error'>{formValues.name.validationMessage}</span>
      </label>
      <label className='auth__label'>
        E-mail
        <input
          className='auth__input'
          id='email'
          type='email'
          name='email'
          minLength='5'
          maxLength='30'
          required
          onChange={handleChange}
          value={formValues.email.value}
        />
        <span className='auth__input-error'>{formValues.email.validationMessage}</span>
      </label>
      <label className='auth__label'>
        Пароль
        <input
          className='auth__input'
          id='password'
          type='password'
          name='password'
          minLength='4'
          maxLength='30'
          required
          onChange={handleChange}
          value={formValues.password.value}
          autoComplete='on'
        />
        <span className='auth__input-error'>{formValues.password.validationMessage}</span>
      </label>
    </Auth>
  );
}

export default Register;
