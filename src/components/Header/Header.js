import { Route, Routes, useLocation } from 'react-router-dom';

import Logo from '../Logo/Logo';
import GlobalNavigation from '../GlobalNavigation/GlobalNavigation';
import Menu from '../Menu/Menu';


function Header({ isLoggedIn }) {
  const { pathname } = useLocation();

  if (isLoggedIn) {
    return (
      <header className='header'>
        <Logo/>
        <Menu/>
      </header>
    )
  } else {
    if (pathname === '/') {
      return (
        <header className='header header_type_main'>
          <Logo/>
          <GlobalNavigation/>
        </header>
      )
    }
    return (
      <></>
    )
  }
}

export default Header;
