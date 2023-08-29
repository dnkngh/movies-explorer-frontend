import { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const namePlaceholder = 'Жак-Ив';
  const emailPlaceholder = 'asdf@asdf.com'

  const [userName, setUserName] = useState(namePlaceholder);
  const [email, setEmail] = useState(emailPlaceholder);

  function handleChangeUserName(evt) {
    setUserName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  return (
    <main className='profile'>
      <h2 className='profile__header'>{`Привет, ${namePlaceholder}!`}</h2>

      <form className='profile__form'>
        <label className='profile__label'>
          Имя
          <input
            className='profile__input'
            id='name'
            type='name'
            name='name'
            minLength='2'
            maxLength='30'
            required
            placeholder=''
            value={userName || ''}
            onChange={handleChangeUserName}
          />
        </label>
        <label className='profile__label'>
          Email
          <input
            className='profile__input'
            id='email'
            type='email'
            name='email'
            minLength='5'
            required='30'
            placeholder=''
            value={email || ''}
            onChange={handleChangeEmail}
          />
        </label>
      </form>
      <button
        className='profile__button profile__button_type_submit button_opacity_seventy'
        type='submit'
      >Редактировать</button>
      <button
        className='profile__button profile__button_type_logout button_opacity_seventy'
      >
        <Link
          className='profile__button-link'
          to='/'
        >Выйти из аккаунта</Link>
      </button>
    </main>
  );
}

export default Profile;
