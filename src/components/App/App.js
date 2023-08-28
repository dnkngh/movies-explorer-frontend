import { Route, Routes } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import NotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies';

import { moviesList } from '../../utils/movies';


function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies list={moviesList} />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/saved-movies' element={<SavedMovies list={moviesList} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
