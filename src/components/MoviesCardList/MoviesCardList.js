import React from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';


function MoviesCardList({ foundMovies, savedMovies, checkIsLiked, onSave, onDelete, isLoading, searchMessage, ...props }) {
  const { pathname } = useLocation();


  return (
    <section className='movies-list'>
      {
        isLoading ? <Preloader />
        :
        <>
          <ul className='movies-list__grid'>
            {
              foundMovies.map((item) => (
                <MoviesCard
                  key={item.movieId}
                  card={item}
                  checkIsLiked={checkIsLiked}
                  onDelete={onDelete}
                  onSave={onSave}
                />
              ))
            }
          </ul>
          {
            (pathname === '/movies' && !props.isSliced && !isLoading) || (props.isSliced && foundMovies.length === 0)
              ? ((foundMovies.length === 0)
                ? <p>{searchMessage}</p>
                : <button
                  className='movies-list__expand'
                  type='button'
                  aria-label='Ещё'
                  onClick={props.onExpand}
                >
                  Ещё
                </button>
              )
            : <></>
          }
        </>
      }
    </section>
  );
}

export default MoviesCardList;
