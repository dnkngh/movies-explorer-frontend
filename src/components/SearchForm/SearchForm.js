import React, { useState } from 'react';

function SearchForm() {
  const [checked, setChecked] = useState(false);

  function hangleClick() {
    setChecked(!checked);
  }

  return (
    <section className='search-form'>
      <form className='search-form__container'>
        <div className='search-form__icon'></div>
        <input
          className='search-form__input'
          type='text'
          placeholder='Фильм'
          required
        />
        <button className='search-form__button button_opacity_eighty'></button>

        <span className='search-form__separator'></span>

        <label className='search-form__filter'>
          <input
            className='search-form__checkbox'
            type='checkbox'
            checked={checked}
            onChange={hangleClick}
          />
          <span
            className='search-form__checkbox-visible'
            hidden
          ></span>
          <p className='search-form__filter-name'>
            Короткометражки
          </p>
        </label>
      </form>
    </section>
  );
}

export default SearchForm;
