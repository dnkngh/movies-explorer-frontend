import Auth from '../Auth/Auth';

function Login() {
  return (
    <Auth
      title='Рады видеть!'
      link='/movies'
      linkText='Войти'
      subtitle='Ещё не зарегистрированы?'
      subLink='/signup'
      subLinkName='Регистрация'
    >

    </Auth>
  );
}

export default Login;
