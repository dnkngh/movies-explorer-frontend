import { NavLink } from 'react-router-dom';

import myPhoto from '../../images/my_photo.svg';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__container'>
        <div className='about-me__description'>
          <h3 className='about-me__name'>Никита</h3>
          <p className='about-me__profession'>
            Фронтенд-разработчик, 30 лет
          </p>
          <p className='about-me__text'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании
            «СКБ Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <NavLink
            className='about-me__link'
            to='https://github.com/dnkngh'
            target='_blank'
          >
            GitHub
          </NavLink>
        </div>
        <div className='about-me__photo-container'>
          <img
            className='about-me__photo'
            src={myPhoto}
            alt='Фото'
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
