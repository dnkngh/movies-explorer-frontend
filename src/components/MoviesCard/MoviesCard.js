import {Link, useLocation} from 'react-router-dom';

function MoviesCard({ onDelete, onSave, ...props }) {
  const location = useLocation();

  const isLiked = props.checkIsLiked ? props.checkIsLiked(props.card) : true;

  const cardLikeButtonClassName = location.pathname === '/saved-movies'
      ? 'movie__like-delete hover-button'
      : `movie__liked hover-button ${isLiked ? 'movie__liked-active' : ''}`

  const formatTime = (timeInput) => {
    let hours = Math.trunc(timeInput / 60);
    let minutes = timeInput % 60;

    return `${hours}ч${minutes}м`;
  };

  const createMovieSrcValue = (movieTitle) => {
    return `Постер фильма "${movieTitle}"`;
  };

  const handleCardLike = () => {
    if (isLiked) {
      onDelete(props.card);
    } else {
      onSave(props.card);
    }
  };

  return (
    <li className='movie'>
      <Link
        className='hover-button'
        to={props.card.trailerLink}
        target='_blank'
      >
        <img
          className='movie__picture'
          src={props.card.image}
          alt={createMovieSrcValue(props.card.nameRU)}
        />
      </Link>

      <div className='movie__info'>
        <div className='movie__header'>
          <h2 className='movie__title'>{props.card.nameRU}</h2>
          <p className='movie__duration'>{formatTime(props.card.duration)}</p>
        </div>

        <button
          className={cardLikeButtonClassName}
          type='button'
          onClick={handleCardLike}
        ></button>



        {/*{*/}
        {/*  location.pathname === '/movies' ? (*/}
        {/*    <button*/}
        {/*      className={cardLikeButtonClassName}*/}
        {/*      type='button'*/}
        {/*      onClick={handleCardLike}*/}
        {/*    ></button>*/}
        {/*  ) : (*/}
        {/*    <button*/}
        {/*      className='movie__like-delete'*/}
        {/*      type='button'*/}
        {/*    ></button>*/}
        {/*  )*/}
        {/*}*/}
      </div>
    </li>
  );
}

export default MoviesCard;
