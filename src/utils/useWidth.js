import { useEffect, useState } from 'react';


function useWidth() {
  const [ width, setWidth ] = useState(window.innerWidth);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  function widthHandler() {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }

  useEffect(widthHandler);

  return width;
}

export default useWidth;
