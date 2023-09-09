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

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

import { MOVIES_API_BASE_URL, SHORT_MOVIE_LENGTH, INITIAL_STATE } from '../../utils/constants';
import useValidation from '../../utils/useValidation';
import ProtectedRoute from '../../utils/ProtectedRoute';
import Preloader from "../Preloader/Preloader";


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


  const {
    formValues: moviesFormValue,
    handleChange: handleMoviesChange,
    resetForm: resetMoviesForm
  } = useValidation({ search: INITIAL_STATE });

  const {
    formValues: userMoviesFormValue,
    handleChange: handleUserMoviesChange,
    resetForm: resetUserMoviesForm
  } = useValidation({ search: INITIAL_STATE });

  // movie search

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


  // auth

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ email: '', name: '' });
    setUserMovies([]);
    setAllMovies([]);
    setFoundMovies([]);
    setFoundUserMovies([]);
    setIsShortMovie(false);
    setIsUserShortMovie(false);
    resetMoviesForm({ search: INITIAL_STATE });
    resetUserMoviesForm({ search: INITIAL_STATE });
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
      .then(([user, movies]) => {
        setCurrentUser(user);
        setUserMovies(movies);
        setFoundUserMovies(movies);

        navigate('/movies');

        const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
        const storedMovies = JSON.parse(localStorage.getItem('movies'));

        if (storedMovies) {
          setAllMovies(storedMovies);
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
    if (isLoggedIn) {
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
    if (isLoggedIn && pathname !== '/saved-movies') {
      resetUserMoviesForm();
      filterUserMovies();
      setIsUserShortMovie(false);
    }
  };

  useEffect(checkTokenEffectHandler, []);
  useEffect(loggedChangeHandler, [isLoggedIn]);
  useEffect(handleFoundMoviesEffect, [foundMovies]);
  useEffect(resetUserMoviesSearch, [isLoggedIn, pathname]);

  // movies

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

        setAllMovies(movieListFormatted);
        setFirstSearch(false);
        localStorage.setItem('movies', JSON.stringify(movieListFormatted));
        console.log('getAndSortAllMovies done')
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
  };

  const filterUserMovies = () => {
    const filteredMovies = filterMovieList(userMoviesFormValue.search.value, isUserShortMovie, userMovies);
    setFoundUserMovies(filteredMovies);
  };

  const handleMoviesSearch = () => {

    console.log(`loggedin ${isLoggedIn}`);
    console.log(`formvalue ${moviesFormValue.search.value}`);
    console.log(`first search ${isFirstSearch}`);
    console.log(`allmovies ${allMovies.length}`);
    
    if (!moviesFormValue.search.value) {
      setFoundMovies([]);
      setSearchText('Введите название');
      console.log('ping3')
      return ;
    }
    if (isLoggedIn) {
      if (isFirstSearch || allMovies.length < 1) {
        getAndSortAllMovies();
        console.log('ping1')
      } else {
        filterAllMovies();
        console.log('ping2')
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


  // saved-movies

  const checkIsLiked = (m) => userMovies.some((movie) => movie.movieId === m.movieId);
  const getMoviesId = (movieId) => userMovies.find(movie => movie.movieId === movieId)._id;

  const handleSaveMovie = (movie) => {
    mainApi.saveUserMovie(movie)
      .then((movie) => setUserMovies([movie, ...userMovies]))
      .catch(errorHandler);
  };

  const handleDeleteMovie = (movie) => {
    const id = movie._id ? movie._id : getMoviesId(movie.movieId);
    console.log(movie._id)
    console.log(getMoviesId(movie.movieId));
    console.log(movie);
    mainApi.deleteMovie(id)
      .then((m) => setUserMovies(movies => movies.filter(m => m._id !== id)))
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

  const handleEditProfile = (formValues) => {
    return mainApi.setUserInfo(formValues)
      .then((res) => {
        if (res) {
          setCurrentUser(res);
        }
      });
  }

  if (!isLoggedIn && isLoading) return (<Preloader/>);

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
                onDelete={handleDeleteMovie}
                onSave={handleSaveMovie}
                foundMovies={foundMovies}
                isLoading={isLoading}
                checkIsLiked={checkIsLiked}
                searchMessage={searchText}
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
                onDelete={handleDeleteMovie}
              />
            }
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute
                element={Profile}
                onSubmit={handleEditProfile}
                onLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
            }
          />

          <Route path='/signin' element={<Login onSubmit={handleLogin} isLoggedIn={isLoggedIn} />} />
          <Route path='/signup' element={<Register onSubmit={handleRegister} isLoggedIn={isLoggedIn} />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
