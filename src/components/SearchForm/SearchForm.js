function SearchForm({ searchValue, handleChange, handleCheck, isShortMovie, onSubmit }) {

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(searchValue.search.value, isShortMovie);
  };

  return (
    <section className='search-form'>
      <form className='search-form__container' noValidate onSubmit={handleSubmit}>
        <div className='search-form__icon'></div>
        <input
          className='search-form__input'
          type='text'
          name='search'
          placeholder='Фильм'
          required
          value={searchValue.search.value}
          onChange={handleChange}
        />
        <button
          className='search-form__button hover-button'
          type='submit'
        ></button>

        <span className='search-form__separator'></span>

        <label className='search-form__filter'>
          <input
            className='search-form__checkbox'
            type='checkbox'
            checked={isShortMovie}
            onChange={handleCheck}
          />
          <span
            className='search-form__checkbox-visible'
            hidden
          ></span>
          <span className='search-form__filter-name'>
            Короткометражки
          </span>
        </label>
      </form>
    </section>
  );
}

export default SearchForm;
