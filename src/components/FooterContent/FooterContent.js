import { NavLink } from 'react-router-dom';


function FooterContent() {
  return(
    <footer className='footer'>
    <h4 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      <div className='footer__container'>
      <p className='footer__year'>&copy;2023</p>
        <ul className='footer__links'>
          <li className='footer__item'>
            <NavLink
              className='footer__link hover-link'
              target='_blank'
              to='https://praktikum.yandex.ru/'
              >
              Яндекс.Практикум
            </NavLink>
          </li>
            <li className='footer__item'>
            <NavLink
              className='footer__link hover-link'
              target='_blank'
              to='https://github.com/dnkngh/'
              >
              Github
            </NavLink>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default FooterContent;
