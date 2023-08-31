import { NavLink, Routes, Route } from 'react-router-dom';

import FooterContent from '../FooterContent/FooterContent';


function Footer() {
  return (
    <Routes>
      <Route
        path='/'
        element={<FooterContent/>}
        exact
      ></Route>

      <Route
        path='/movies/*'
        element={<FooterContent/>}
      ></Route>

      <Route
        path='/saved-movies/*'
        element={<FooterContent/>}
      ></Route>
    </Routes>
  );
}

export default Footer;
