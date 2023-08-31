import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ list }) {
  const myMovies = list.filter((item) => !item.owner);

  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList
        list={myMovies}
        savedMovies={false}
      />
    </main>
  );
}

export default SavedMovies;
