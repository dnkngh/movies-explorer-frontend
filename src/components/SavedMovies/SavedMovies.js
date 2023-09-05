import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ movies, foundMovies, onDelete, searchMessage, ...props }) {

  return (
    <main className='saved-movies'>
      <SearchForm { ...props} />
      <MoviesCardList
        foundMovies={foundMovies}
        savedMovies={true}
        onDelete={onDelete}
        searchMessage={searchMessage}
      />
    </main>
  );
}

export default SavedMovies;
