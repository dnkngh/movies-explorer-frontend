import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  const [isLiked, setLiked] = useState(false);
  const location = useLocation();

  function handleCardLike() {
    setLiked(!isLiked);
  }

  const cardLikeButtonClassName = `movie__liked ${isLiked ? 'movie__liked_active' : ''}`;

  function formatTime(timeInput) {
    let hours = Math.trunc(timeInput / 60);
    let minutes = timeInput % 60;

    return `${hours}ч${minutes}м`;
  }

  return (
    <li className='movie'>
      <img
        className='movie__picture'
        src={props.card.image}
        alt={props.card.nameRU}
      />
      <div className='movie__info'>
        <div className='movie__header'>
          <h2 className='movie__title'>{props.card.nameRU}</h2>
          <p className='movie__duration'>{formatTime(props.card.duration)}</p>
        </div>
        {
          location.pathname === '/movies' ? (
            <button
              className={cardLikeButtonClassName}
              type='button'
              onClick={handleCardLike}
            ></button>
          ) : (
            <button
              className='movie__like-delete'
              type='button'
            ></button>
          )
        }
      </div>
    </li>
  );
}

export default MoviesCard;
