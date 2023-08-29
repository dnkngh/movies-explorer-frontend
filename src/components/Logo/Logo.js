import { Link } from 'react-router-dom';
import React from 'react';

import headerLogo from '../../images/logo-movies.svg';

function Logo() {
  return (
    <Link to='/' className='logo button_opacity_seventy'>
      <img src={headerLogo} alt='Лого' className='logo__img hover-button'></img>
    </Link>
  );
}

export default Logo;
