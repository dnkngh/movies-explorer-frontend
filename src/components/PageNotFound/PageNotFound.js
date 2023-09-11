function PageNotFound({ handlePreviousPage }) {

  return (
    <main className='page-not-found'>
      <h2 className='page-not-found__title'>
        404
      </h2>
      <p className='page-not-found__text'>
        Страница не найдена
      </p>
      <button
       className='page-not-found__button hover-link'
       type='button'
       onClick={handlePreviousPage}
      >
        Назад
      </button>
    </main>
  );
}

export default PageNotFound;
