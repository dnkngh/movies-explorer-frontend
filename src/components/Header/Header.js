import Logo from '../Logo/Logo';
import {Route, Routes} from "react-router-dom";
import GlobalNavigation from "../GlobalNavigation/GlobalNavigation";

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
      </Routes>
  )
}

export default Header;
