function AboutProject() {
  return (
    <section className='about'>
      <h2 className='about__header'>О Проекте</h2>
      <div className='about__info'>
        <div className='about__container'>
          <h3 className='about__title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about__text'>
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='about__container'>
          <h3 className='about__title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about__text'>
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className='about__timeline'>
        <p className='about__stage-duration about__stage-duration_type_one-week'>
          1 неделя
        </p>
        <p className='about__stage-duration about__stage-duration_type_four-week'>
          4 недели
        </p>
        <p className='about__stage-name about__stage-name_color_white'>Back-end</p>
        <p className='about__stage-name about__stage-name_color_black'>Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
