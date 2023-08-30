import React from 'react';

function LandingNavTab() {
  const handleClick = (evt, target) => {
    evt.preventDefault();
    const targetElement = document.getElementById(target);

    if (targetElement) {
      targetElement.scrollIntoView();
    }
  };

  return (
    <nav className='landing-navigation'>
      <ul className='landing-navigation__list'>
        <li className='landing-navigation__item'>
          <a
            className='landing-navigation__link hover-link'
            href='/#'
            onClick={(evt) => handleClick(evt, 'about')}
          >О проекте
          </a>
        </li>
        <li className='landing-navigation__item'>
          <a
            className='landing-navigation__link hover-link'
            href='/#'
            onClick={(evt) => handleClick(evt, 'techs')}
          >Технологии
          </a>
        </li>
        <li className='landing-navigation__item'>
          <a
            className='landing-navigation__link hover-link'
            href='/#'
            onClick={(evt) => handleClick(evt, 'about-me')}
          >Студент
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default LandingNavTab;
