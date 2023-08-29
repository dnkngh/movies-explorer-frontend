import { NavLink, Route, Routes } from 'react-router-dom';

function GlobalNavigation() {
  return (
    <section className='global-navigation'>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <div className='global-navigation__link'>
              <NavLink
                className='global-navigation__button button_opacity_eighty'
                to='/signup'
              >
                Регистрация
              </NavLink>
              <NavLink
                className='global-navigation__button global-navigation__button_signin button_opacity_seventy'
                to='/signin'
              >
                Войти
              </NavLink>
            </div>
          }
        >
        </Route>
      </Routes>
    </section>
  );
}

export default GlobalNavigation;
