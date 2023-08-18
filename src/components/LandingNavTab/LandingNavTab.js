import React from 'react';

function LandingNavTab() {
  return (
    <nav className='landing-navigation'>
      <ul className='landing-navigation__list'>
        <li className='landing-navigation__item'>
          <a
            className='landing-navigation__link'
            href='/#'
          >О проекте
          </a>
        </li>
        <li className='landing-navigation__item'>
          <a
            className='landing-navigation__link'
            href='/#'
          >Технологии
          </a>
        </li>
        <li className='landing-navigation__item'>
          <a
            className='landing-navigation__link'
            href='/#'
          >Студент
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default LandingNavTab;
