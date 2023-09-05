import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import NotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { MOVIES_API_BASE_URL, SHORT_MOVIE_LENGTH } from '../../utils/constants';
import initValidState from '../../utils/initValidState';
import useValidation from '../../utils/useValidation';
import ProtectedRoute from "../../utils/ProtectedRoute";


function App() {
  const navigate = useNavigate();

  const [ currentUser, setCurrentUser ] = useState({ email: '', name: '' });
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ allMovies, setAllMovies ] = useState([]);
  const [ foundMovies, setFoundMovies ] = useState([]);
  const [ userMovies, setUserMovies ] = useState([]);
  const [ foundUserMovies, setFoundUserMovies ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ searchText, setSearchText ] = useState('');

  const [ isShortMovie, setIsShortMovie ] = useState(false);
  const [ isUserShortMovie, setIsUserShortMovie ] = useState(false);


  const { formValues: moviesFormValue, handleChange: handleMoviesChange, resetForm: resetMoviesForm } = useValidation({ search: initValidState })
  const { formValues: userMoviesFormValue, handleChange: handleUserMoviesChange, resetForm: resetUserMoviesForm } = useValidation({ search: initValidState });
  // Поле поиска
  const [ isFirstSearch, setFirstSearch ] = useState(true);
  const { pathname } = useLocation();

  const handleShortMovies = () => {
    setIsShortMovie(!isShortMovie);
  };

  const handleUserShortMovies = () => {
    setIsUserShortMovie(!isUserShortMovie);
  };

  const formatMovies = (arr) => arr.map(movie => {
    return {
      country: movie.country,
      description: movie.description,
      director: movie.director,
      duration: movie.duration,
      image: `${MOVIES_API_BASE_URL}${movie.image.url}`,
      movieId: movie.id,
      nameEN: movie.nameEN,
      nameRU: movie.nameRU,
      thumbnail: `${MOVIES_API_BASE_URL}${movie.image.formats.thumbnail.url}`,
      trailerLink: movie.trailerLink,
      year: movie.year,
    }
  });

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser({ email: '', name: '' });
    setUserMovies([]);
    setAllMovies([]);
    setFoundMovies([]);
    setFoundUserMovies([]);
    setIsShortMovie(false);
    setIsUserShortMovie(false);
    resetMoviesForm({ searchText: initValidState });
    resetUserMoviesForm({ searchText: initValidState });
    setFirstSearch(true);
    localStorage.clear();
    mainApi.setAuthHeader(null);
  };

  const errorHandler = (error) => {
    if (error === 401) handleLogout();
    console.log(error);
  };


  const checkToken = () => {
    mainApi.getUserInfo()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
        }
      })
      .catch(errorHandler)
      .finally(() => setIsLoading(false));
  };

  const checkTokenEffectHandler = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return setIsLoading(false);
    }
    mainApi.setAuthHeader(token);
    checkToken();
  };

  const handleLoggedInUser = () => {
    Promise.all([mainApi.getUserInfo(), mainApi.getUserMovies()])
      .then(([userData, moviesList]) => {
        setCurrentUser(userData);
        setUserMovies(moviesList);
        setFoundUserMovies(moviesList);

        const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
        const allMoviesFromStorage = JSON.parse(localStorage.getItem('movies'));

        if (allMoviesFromStorage) {
          setAllMovies(allMoviesFromStorage);
        } else {
          setSearchText('Нужно ввести ключевое слово');
        }
        if (lastSearch) {
          setFirstSearch(lastSearch.isFirstSearch);
          setFoundMovies(lastSearch.foundMovies);
          resetMoviesForm(lastSearch.searchText);
        }
      })
      .catch(errorHandler);
  };

  const loggedChangeHandler = () => {
    if (!isLoggedIn) {
      handleLoggedInUser();
    }
  };

  const handleFoundMoviesEffect = () => {
    if (!isFirstSearch) {
      const lastSearch = { isFirstSearch, foundMovies, searchText: moviesFormValue, isShort: isShortMovie };

      localStorage.setItem('lastSearch', JSON.stringify(lastSearch));
    }
  }

  const resetUserMoviesSearch = () => {
    if (isLoggedIn && pathname !== 'savedMovies') {
      resetUserMoviesForm();
      filterUserMovies();
      setIsUserShortMovie(false);
    }
  };

  useEffect(checkTokenEffectHandler, []);
  useEffect(loggedChangeHandler, [isLoggedIn]);
  useEffect(handleFoundMoviesEffect, [foundMovies]);
  useEffect(resetUserMoviesSearch, [isLoggedIn, pathname]);


  const filterMovieList = (searchText, isShort, moviesList) => {
    const filteredByLenght = moviesList.filter((movie) => isShort ? movie.duration <= SHORT_MOVIE_LENGTH: !isShort);
    const searchTextLowerCase = searchText.toLowerCase();

    return filteredByLenght.filter((movie) =>
      movie.nameEN.toLowerCase().includes(searchTextLowerCase) || movie.nameRU.toLowerCase().includes(searchTextLowerCase)
    );
  };


  const getAndSortAllMovies = () => {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((res) => {
        const movieListFormatted = formatMovies(res);
        setFirstSearch(false);

        setAllMovies(movieListFormatted);
        console.log('getAndSortAllMovies done')
        localStorage.setItem('movies', JSON.stringify(movieListFormatted));
      })
      .finally(() => setIsLoading(false));
  };


  const filterAllMovies = () => {
    const filteredList = filterMovieList(moviesFormValue.search.value, isShortMovie, allMovies);

    if (filteredList.length === 0) {
      setSearchText('Ничего не найдено');
    } else if (!moviesFormValue.search.value) {
      setSearchText('Введите название');
    }

    setFoundMovies(filteredList);
  }

  const filterUserMovies = () => {
    const filteredMovies = filterMovieList(userMoviesFormValue.search.value, isUserShortMovie, userMovies);
    setFoundUserMovies(filteredMovies);
  }

  const handleMoviesSearch = () => {
    if (!moviesFormValue.search.value) {
      setFoundMovies([]);
      setSearchText('Введите название');

      return ;
    }
    if (isLoggedIn) {
      if (isFirstSearch || allMovies.length < 1) {
        getAndSortAllMovies();
      } else {
        filterAllMovies();
      }
    }
  };

  const handleCheckBox = () => {
    if (allMovies.length === 0 && isFirstSearch) {
      setSearchText('Введите название');

      return ;
    }
    handleMoviesSearch();
  };



  const handleUserMoviesSearch = () => {
    filterUserMovies();
  };

  useEffect(handleMoviesSearch, [allMovies]);
  useEffect(handleCheckBox, [isShortMovie]);

  useEffect(handleUserMoviesSearch, [userMovies, isShortMovie]);


  const checkIsLiked = (movie) => userMovies.some((m) => m.movieId === movie.movieId);

  const getMoviesId = (movieId) => userMovies.find(movie => movie.movieId === movieId)._id;

  const deleteMovie = (movie) => {
    const id = movie._id ? movie._id : getMoviesId(movie.movieId);
    mainApi.deleteMovie(id)
      .then((m) => setUserMovies(state => state.filter(m => m._id !== id)))
    .catch(errorHandler);
  };

  const handleSaveMovie = (movie) => {
    console.log(movie);
    mainApi.saveUserMovie(movie)
      .then((movie) => setUserMovies([movie, ...userMovies]))
      .catch(errorHandler);
  };


  // useEffect(() => {
  //   Promise.all([moviesApi.getMovies()])
  //     .then(([movs]) => {
  //     setAllMovies(formatMovies(movs));
  //   })
  // }, [isLoggedIn])

  // useEffect(() => {
  //   getAllMovies();
  // }, [isLoggedIn])



  const handleLogin = (formValues) => {
    return mainApi.login(formValues)
      .then(({ token }) => {
        if (token) {
          setIsLoggedIn(true);
          localStorage.setItem('token', token);
          mainApi.setAuthHeader(token);
          navigate('/movies')
        }
      });
  };

  const handleRegister = (formValues) => {
    return mainApi.register(formValues)
      .then((res) => {
        if (res) {
          handleLogin({
            email: formValues.email,
            password: formValues.password,
          });
        }
      })
  }

  const handleEditUser = (formValues) => {
    return mainApi.setUserInfo(formValues)
      .then((res) => {
        if (res) {
          setCurrentUser(res);
        }
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path='/' element={<Main />} />

          <Route
            path='/movies'
            element={
              <ProtectedRoute
                element={Movies}
                handleChange={handleMoviesChange}
                isShortMovie={isShortMovie}
                handleCheck={handleShortMovies}
                searchValue={moviesFormValue}
                isLoggedIn={isLoggedIn}
                movies={allMovies}
                onSubmit={handleMoviesSearch}
                onDelete={deleteMovie}
                onSave={handleSaveMovie}
                foundMovies={foundMovies}
                checkIsLiked={checkIsLiked}
                searchMessage={searchText}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                element={SavedMovies}
                handleChange={handleUserMoviesChange}
                isShortMovie={isUserShortMovie}
                handleCheck={handleUserShortMovies}
                searchValue={userMoviesFormValue}
                isLoggedIn={isLoggedIn}
                movies={userMovies}
                onSubmit={handleUserMoviesSearch}
                foundMovies={foundUserMovies}
                onDelete={deleteMovie}
              />
            }
          />

          <Route path='/signin' element={<Login onSubmit={handleLogin} isLoggedIn={isLoggedIn} />} />
          <Route path='/signup' element={<Register onSubmit={handleRegister} isLoggedIn={isLoggedIn} />} />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                element={Profile}
                onSubmit={handleEditUser}
                onLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
            }
          />



          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
