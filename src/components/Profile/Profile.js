import { useContext, useEffect, useState } from 'react';

import useValidation from '../../utils/useValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ERROR_MESSAGES, INITIAL_STATE } from '../../utils/constants';


function Profile({ onSubmit, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const { formValues, handleChange, resetForm } = useValidation({
    name: { ...INITIAL_STATE, value: currentUser.name },
    email: { ...INITIAL_STATE, value: currentUser.email },
  });

  const isValidInput = formValues.name.isValid() && formValues.email.isValid();

  const [ serverErrorMessage, setServerErrorMessage ] = useState('');
  const [isInEditMode, setIsInEditMode] = useState(false);
  const isNotEdited = formValues.name.value === currentUser.name && formValues.email.value === currentUser.email;
  const toggleSubmitButton = isNotEdited || !isValidInput;


  const handleSubmit = (evt) => {
    setServerErrorMessage('');
    evt.preventDefault();

    onSubmit({
      name: formValues.name.value,
      email: formValues.email.value,
    })
      .then(() => {
        setServerErrorMessage(ERROR_MESSAGES.profileUpdated);
      })
      .catch((error) => {
        if (error === 400) {
          return setServerErrorMessage(ERROR_MESSAGES.incorrectData);
        }
        if (error === 409) {
          return setServerErrorMessage(ERROR_MESSAGES.duplicate);
        }
        if (error === 500) {
          return setServerErrorMessage(ERROR_MESSAGES.internalError);
        }
      })
      .finally(
        setIsInEditMode(false)
      )
  };

  const handleEdit = () => {
    setIsInEditMode(true);
    setServerErrorMessage('');
  }

  useEffect(() => resetForm({
    name: { ...INITIAL_STATE, value: currentUser.name, isDirty: true, isValid: () => true },
    email: { ...INITIAL_STATE, value: currentUser.email, isDirty: true, isValid: () => true },
  }), [currentUser]);


  return (
    <main className='profile'>
      <h2 className='profile__header'>{`Привет, ${currentUser.name}!`}</h2>

      <form className='profile__form' onSubmit={handleSubmit} noValidate>
        <label className='profile__label'>
          Имя
          <input
            className='profile__input'
            id='name'
            type='text'
            name='name'
            minLength='2'
            maxLength='30'
            required
            value={formValues.name.value || ''}
            onChange={handleChange}
            disabled={!isInEditMode}
          />
        </label>
        <span className='profile__input-error'>{formValues.name.validationMessage}</span>
        <label className='profile__label'>
          Email
          <input
            className='profile__input'
            id='email'
            type='email'
            name='email'
            minLength='5'
            maxLength='30'
            required
            value={formValues.email.value || ''}
            onChange={handleChange}
            disabled={!isInEditMode}
          />
        </label>
        <span className='profile__input-error'>{formValues.email.validationMessage}</span>

        {isInEditMode &&
          <>
            <button
              className='profile__button hover-button profile__button_type_submit'
              type='submit'
              disabled={toggleSubmitButton}
            >
              Сохранить
            </button>
          </>
        }
      </form>

      {!isInEditMode &&
        <>
          <button
            className='profile__button profile__button_type_edit hover-link'
            type='button'
            onClick={handleEdit}
          >Редактировать</button>
          <button
            className='profile__button profile__button-link profile__button_type_logout hover-link'
            type='button'
            onClick={onLogout}
          >
            Выйти из аккаунта
          </button>
        </>
      }
    </main>
  );
}

export default Profile;
