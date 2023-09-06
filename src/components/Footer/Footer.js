import { Routes, Route, useLocation } from 'react-router-dom';

import FooterContent from '../FooterContent/FooterContent';


function Footer() {
  const { pathname } = useLocation();

  if (pathname === '/profile' || pathname === '/signin' || pathname === '/signup') {
    return (<></>);
  }

  return (
    <FooterContent />
  );
}

export default Footer;
