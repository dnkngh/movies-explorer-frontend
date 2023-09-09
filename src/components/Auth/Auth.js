import { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';

import { ERROR_MESSAGES } from '../../utils/constants';


function Auth({ title, subtitle, subLink, subLinkName, onSubmit, buttonText, toggleSubmit, ...props}) {
  const [ serverErrorMessage, setServerErrorMessage ] = useState('');
  const [ isFetching, setIsFetching ] = useState(false)

  const handleSubmit = (evt) => {
    setIsFetching(true);
    evt.preventDefault();
    setServerErrorMessage('');

    onSubmit()
      .then(() => setServerErrorMessage(''))
      .catch((error) => {
        console.log(error)

        if (error === 400) {
          return setServerErrorMessage(ERROR_MESSAGES.validation);
        }
        if (error === 401) {
          return setServerErrorMessage(ERROR_MESSAGES.incorrectAuthData);
        }
        if (error === 409) {
          return setServerErrorMessage(ERROR_MESSAGES.duplicate);
        }
        if (error === 500) {
          return setServerErrorMessage(ERROR_MESSAGES.internalError);
        }
      })
      .finally(
        () => setIsFetching(false)
      );
  };

  return (
    <main className='auth'>
      <Logo />
      <h1 className='auth__title'>{title}</h1>
      <form className='auth__form' noValidate onSubmit={handleSubmit}>
        <>{props.children}</>
        <span className='auth__submit-error'>{serverErrorMessage}</span>

        <button
          className='auth_button auth__button_type_submit hover-button'
          type='submit'
          disabled={(!toggleSubmit || isFetching)}
        >
          {buttonText}
        </button>
        <p className='auth__text'>
          {subtitle}
          <Link className='auth__link hover-link' to={subLink}>{subLinkName}</Link>
        </p>
      </form>
    </main>
  );
}

export default Auth;
