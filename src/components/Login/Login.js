import Auth from '../Auth/Auth';
import useValidation from '../../utils/useValidation';
import { Navigate } from 'react-router-dom';
import {INITIAL_STATE} from "../../utils/constants";

function Login({ isLoggedIn, onSubmit }) {
  const { formValues, handleChange } = useValidation({
    email: INITIAL_STATE,
    password: INITIAL_STATE,
  });

  const handleSubmit = () => {
    return onSubmit({
      email: formValues.email.value,
      password: formValues.password.value,
    });
  };

  if (isLoggedIn) {
    return ( <Navigate to={'/'} />);
  }

  return (
    <Auth
      title='Рады видеть!'
      link='/movies'
      buttonText='Войти'
      linkText='Войти'
      subtitle='Ещё не зарегистрированы?'
      subLink='/signup'
      subLinkName='Регистрация'
      toggleSubmit={formValues.password.isValid() && formValues.email.isValid()}
      onSubmit={handleSubmit}
    >
      <label className='auth__label'>
        E-mail
        <input
          className={`auth__input ${formValues.email.isValid() ? 'auth__input_valid' : 'auth__input_invalid'}`}
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

export default Login;
