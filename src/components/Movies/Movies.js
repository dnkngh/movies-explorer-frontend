import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';


function Movies({ list }) {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList list={list} savedMovies='123' />
    </main>
  );
}

export default Movies;
