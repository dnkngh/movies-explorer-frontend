import { NavLink, Route, Routes } from 'react-router-dom';

function GlobalNavigation() {
  return (
    <div className='global-navigation'>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <div className='global-navigation__link'>
              <NavLink
                className='global-navigation__button hover-button'
                to='/signup'
              >
                Регистрация
              </NavLink>
              <NavLink
                className='global-navigation__button global-navigation__button_signin hover-link'
                to='/signin'
              >
                Войти
              </NavLink>
            </div>
          }
        >
        </Route>
      </Routes>
    </div>
  );
}

export default GlobalNavigation;
