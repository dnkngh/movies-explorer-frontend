import { NavLink } from 'react-router-dom';

import linkArrow from '../../images/link_arrow.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__project-list'>
        <li className='portfolio__project'>
          <NavLink
            className='portfolio__link'
            to='https://github.com/dnkngh/how-to-learn'
            target='_blank'
          >
          <p className='portfolio__subtitle'>Статичный сайт</p>
          <img
            className='portfolio__arrow'
            src={linkArrow}
            alt='Статичный сайт'
          />
          </NavLink>
        </li>
        <li className='portfolio__project'>
          <NavLink
            className='portfolio__link'
            to='https://github.com/dnkngh/russian-travel'
            target='_blank'
          >
          <p className='portfolio__subtitle'>Адаптивный сайт</p>
          <img
            className='portfolio__arrow'
            src={linkArrow}
            alt='Адаптивный сайт'
          />
          </NavLink>
        </li>
        <li className='portfolio__project'>
          <NavLink
            className='portfolio__link'
            to='https://github.com/dnkngh/react-mesto-api-full-gha'
            target='_blank'
          >
          <p className='portfolio__subtitle'>Одностраничное приложение</p>
          <img
            className='portfolio__arrow'
            src={linkArrow}
            alt='Одностраничное приложение'
          />
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
