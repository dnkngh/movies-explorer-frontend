import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';


function Menu() {
  const [isEnabled, setEnabled] = useState(false);

  function handleClick() {
    setEnabled(!isEnabled);
    document.querySelector('.header').classList.toggle('header_menu-enabled', !isEnabled);
  }

  return (
    <nav className={`menu ${isEnabled ? 'menu_enabled' : ''}`}>
      <button
        className={isEnabled ? 'menu__close-button hover-button' : 'menu__open-button'}
        onClick={handleClick}
      ></button>

      <div className={`menu__content ${isEnabled ? 'menu__content-visible' : ''}`}>
        <NavLink
          className='menu__homepage hover-link'
          to='/'
          onClick={handleClick}
        >
          Главная
        </NavLink>

        <div className='menu__movies'>
          <NavLink
            className={({isActive}) => 'menu__all-movies hover-link' + (isActive ? ' menu__active-link' : '')}
            to='/movies'
            onClick={handleClick}
          >
            Фильмы
          </NavLink>
          <NavLink
            className={({isActive}) => 'menu__saved-movies hover-link' + (isActive ? ' menu__active-link' : '')}
            to='/saved-movies'
            onClick={handleClick}
          >
            Сохраненные фильмы
          </NavLink>
        </div>

        <NavLink
          className='menu__profile hover-button'
          to='/profile'
          onClick={handleClick}
        >
          <div className='menu__profile-icon' />
          Аккаунт
        </NavLink>

      </div>
    </nav>
  );
}

export default Menu;
