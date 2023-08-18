import {Routes, Route, NavLink} from 'react-router-dom';

function Footer() {
  return (
    <Routes>
      <Route
        exact
        path='/'
        element={
          <footer className='footer'>
            <h4 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <div className='footer__container'>
              <p className='footer__year'>&copy; 2023</p>
              <ul className='footer__links'>
                <li className='footer__item'>
                  <NavLink
                    className='footer__link'
                    target='_blank'
                    to='https://praktikum.yandex.ru/'
                  >
                    Яндекс.Практикум
                  </NavLink>
                </li>
                <li className='footer__item'>
                  <NavLink
                    className='footer__link'
                    target='_blank'
                    to='https://github.com/dnkngh/'
                  >
                    GitHub
                  </NavLink>
                </li>
              </ul>
            </div>
          </footer>
        }
      >

      </Route>
    </Routes>
  );
}

export default Footer;
