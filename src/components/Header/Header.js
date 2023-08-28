import {Route, Routes} from 'react-router-dom';

import Logo from '../Logo/Logo';
import GlobalNavigation from '../GlobalNavigation/GlobalNavigation';
import Menu from '../Menu/Menu';


function Header(props) {
  return (
      <Routes>
        <Route
          exact
          path='/'
          element={
            <header className='header header_type_main'>
              <Logo />
              <GlobalNavigation />
            </header>
          }
        >
        </Route>
        <Route
          exact
          path='/movies'
          element={
            <header className='header'>
              <Logo />
              <Menu />
            </header>
          }
        ></Route>
        <Route
          exact
          path='/saved-movies'
          element={
            <header className='header'>
              <Logo />
              <Menu />
            </header>
          }
        ></Route>
        <Route
          exact
          path='/profile'
          element={
            <header className='header'>
              <Logo />
              <Menu />
            </header>
          }
        ></Route>
      </Routes>
  )
}

export default Header;
