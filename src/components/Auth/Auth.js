import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';


function Auth({ title, link, linkText, subtitle, subLink, subLinkName, ...props}) {
  return (
    <main className='auth'>
      <Logo />
      <h1 className='auth__title'>{title}</h1>
      <form className='auth__form'>
        <>{props.children}</>
        <label className='auth__label'>
          Email
          <input
            className='auth__input'
            id='email'
            type='email'
            name='email'
            minLength='5'
            maxLength='30'
            required
            placeholder='Адрес электронной почты'
          />
          <span className='auth__input-error'>asdf</span>
        </label>
        <label className='auth__label'>
          Пароль
          <input
            className='auth__input'
            id='password'
            type='password'
            name='password'
            minLength='1'
            required
            placeholder='Пароль'
          />
          <span className='auth__input-error'>asdf</span>
        </label>
      </form>

      <button className='auth__button_type_submit button_opacity_eighty' type='submit'>
        <Link className='auth__button_type_link' to={link}>{linkText}</Link>
      </button>

      <p className='auth__text'>
        {subtitle}
        <Link className='auth__link button_opacity_seventy' to={subLink}>{subLinkName}</Link>
      </p>
    </main>
  );
}

export default Auth;
