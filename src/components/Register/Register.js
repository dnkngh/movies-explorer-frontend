import Auth from '../Auth/Auth';

function Register() {
  return (
    <Auth
      title='Добро пожаловать!'
      link='/signin'
      linkText='Зарегистрироваться'
      subtitle='Уже зарегистрированы?'
      subLink='/signin'
      subLinkName='Войти'
    >
      <label className='auth__label'>
        Имя
        <input
          className='auth__input'
          id='name'
          type='name'
          name='name'
          minLength='2'
          maxLength='30'
          required
          placeholder='Имя'
        />
        <span className='auth__input-error'>asdf</span>
      </label>
    </Auth>
  );
}

export default Register;
