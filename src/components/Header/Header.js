import {Route, Routes, useLocation} from 'react-router-dom';

import Logo from '../Logo/Logo';
import GlobalNavigation from '../GlobalNavigation/GlobalNavigation';
import Menu from '../Menu/Menu';


function Header(props) {
  const {isLoggedIn} = props;
  const {pathname} = useLocation();

  if (!isLoggedIn) {
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
  } else {
    return (
      <header className='header'>
        <Logo/>
        <Menu/>
      </header>
    )
  }
}

export default Header;
