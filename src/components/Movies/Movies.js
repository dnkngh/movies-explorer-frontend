import { useEffect, useState } from 'react';
import useWidth from '../../utils/useWidth';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import { SLICE_PARAMETERS } from '../../utils/constants';


function Movies({ movies, foundMovies, onSave, checkIsLiked, onDelete, searchMessage, isLoading, ...props }) {


  const [ sliceAmount, setSliceAmount ] = useState(0);
  const [ slicedList, setSlicedList ] = useState([]);

  const [ moviesOnRow, setMoviesOnRow ] = useState(4);
  const [ moviesAmount, setMoviesAmount ] = useState(16);

  const [ isSliced, setIsSliced ] = useState(true);

  const width = useWidth();

  function handleWidth() {
    if (width >= SLICE_PARAMETERS.FOUR_ON_ROW.MIN_WIDTH) {
      setMoviesAmount(SLICE_PARAMETERS.FOUR_ON_ROW.MOVIES_AMOUNT);
      setMoviesOnRow(SLICE_PARAMETERS.FOUR_ON_ROW.MOVIES_ON_ROW);
    } else if (width >= SLICE_PARAMETERS.THREE_ON_ROW.MIN_WIDTH) {
      setMoviesAmount(SLICE_PARAMETERS.THREE_ON_ROW.MOVIES_AMOUNT);
      setMoviesOnRow(SLICE_PARAMETERS.THREE_ON_ROW.MOVIES_ON_ROW);
    } else if (width >= SLICE_PARAMETERS.TWO_ON_ROW.MIN_WIDTH) {
      setMoviesAmount(SLICE_PARAMETERS.TWO_ON_ROW.MOVIES_AMOUNT);
      setMoviesOnRow(SLICE_PARAMETERS.TWO_ON_ROW.MOVIES_ON_ROW);
    } else {
      setMoviesAmount(SLICE_PARAMETERS.ONE_ON_ROW.MOVIES_AMOUNT);
      setMoviesOnRow(SLICE_PARAMETERS.ONE_ON_ROW.MOVIES_ON_ROW);
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
