import { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const namePlaceholder = 'Виталий';
  const emailPlaceholder = 'pochta@yandex.ru'

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
            id='username'
            type='text'
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
            maxLength='30'
            required
            placeholder=''
            value={email || ''}
            onChange={handleChangeEmail}
          />
        </label>
      </form>
      <button
        className='profile__button profile__button_type_submit hover-link'
        type='submit'
      >Редактировать</button>
      <button
        className='profile__button profile__button_type_logout hover-link'
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
