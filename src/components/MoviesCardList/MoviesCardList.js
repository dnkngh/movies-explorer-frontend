import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({ list, savedMovies }) {
  return (
    <section className='movies-list'>
      <ul className='movies-list__grid'>
        {
          list.map((item) => (
            <MoviesCard
              key={item.id}
              card={item}
              savedmovies={savedMovies}
            />
          ))
        }
      </ul>
      {
        savedMovies ? (
          <button
            className='movies-list__expand'
            type='button'
            aria-label='Ещё'
          >
            Ещё
          </button>
        ) : null
      }
    </section>
  );
}

export default MoviesCardList;
