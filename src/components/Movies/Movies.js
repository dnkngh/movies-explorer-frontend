import { useEffect, useState } from 'react';
import useWidth from '../../utils/useWidth';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import { MIN_DESKTOP_WIDTH, MIN_TABLET_WIDTH, SLICE_PARAMETERS } from '../../utils/constants';


function Movies({ movies, foundMovies, onSave, checkIsLiked, onDelete, searchMessage, isLoading, ...props }) {


  const [ sliceAmount, setSliceAmount ] = useState(0);
  const [ slicedList, setSlicedList ] = useState([]);

  const [ moviesOnRow, setMoviesOnRow ] = useState(3);
  const [ moviesAmount, setMoviesAmount ] = useState(6);

  const [ isSliced, setIsSliced ] = useState(true);

  const width = useWidth();

  function handleWidth() {
    if (width > MIN_DESKTOP_WIDTH) {
      setMoviesAmount(SLICE_PARAMETERS.DESKTOP.MOVIES_AMOUNT);
      setMoviesOnRow(SLICE_PARAMETERS.DESKTOP.MOVIES_ON_ROW);
    } else if (width > MIN_TABLET_WIDTH) {
      setMoviesAmount(SLICE_PARAMETERS.TABLET.MOVIES_AMOUNT);
      setMoviesOnRow(SLICE_PARAMETERS.TABLET.MOVIES_ON_ROW);
    } else {
      setMoviesAmount(SLICE_PARAMETERS.MOBILE.MOVIES_AMOUNT);
      setMoviesOnRow(SLICE_PARAMETERS.MOBILE.MOVIES_ON_ROW);
    }
  }

  function handleMoviesAmount() {
    setSliceAmount(moviesAmount);
  }

  function handleSliceList() {
    setSlicedList(foundMovies.slice(0, sliceAmount));
  }

  useEffect(handleWidth, [width]);
  useEffect(handleMoviesAmount, [foundMovies]);
  useEffect(handleSliceList, [sliceAmount, foundMovies]);
  useEffect(() => setIsSliced(foundMovies.length === slicedList.length), [foundMovies, sliceAmount, slicedList]);

  function handleExpandList() {
    if (sliceAmount % moviesOnRow !== 0) {
      setSliceAmount(amount => amount += (moviesOnRow - (sliceAmount % moviesOnRow)));
      return;
    }

    setSliceAmount(amount => amount += moviesOnRow);
  }

  return (
    <main className='movies'>
      <SearchForm { ...props } />
      <MoviesCardList
        foundMovies={slicedList}
        onSave={onSave}
        checkIsLiked={checkIsLiked}
        onDelete={onDelete}
        onExpand={handleExpandList}
        isSliced={isSliced}
        searchMessage={searchMessage}
        isLoading={isLoading}
      />
    </main>
  );
}

export default Movies;
