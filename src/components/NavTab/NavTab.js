import React from 'react';

function NavTab() {
  return (
    <nav className='navigation'>
      <ul className='navigation__list'>
        <li className='navigation__item'>
          <a
            className='navigation__link'
            href='/#'
          >О проекте
          </a>
          <a
            className='navigation__link'
            href='/#'
          >Технологии
          </a>
          <a
            className='navigation__link'
            href='/#'
          >Автор
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default NavTab;
