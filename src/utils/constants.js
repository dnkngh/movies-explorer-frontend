const MOVIES_API_BASE_URL = 'https://api.nomoreparties.co';

const SHORT_MOVIE_LENGTH = 40;

const SLICE_PARAMETERS = {
  FOUR_ON_ROW: {
    MIN_WIDTH: 1280,
    MOVIES_AMOUNT: 16,
    MOVIES_ON_ROW: 4,
  },
  THREE_ON_ROW: {
    MIN_WIDTH: 1010,
    MOVIES_AMOUNT: 12,
    MOVIES_ON_ROW: 3,
  },
  TWO_ON_ROW: {
    MIN_WIDTH: 630,
    MOVIES_AMOUNT: 8,
    MOVIES_ON_ROW: 2,
  },
  ONE_ON_ROW: {
    MOVIES_AMOUNT: 5,
    MOVIES_ON_ROW: 2
  },
};

const ERROR_MESSAGES = {
  validation: 'Некорректный запрос',
  incorrectData: 'Вы ввели неправильный логин или пароль.',
  incorrectAuthData: 'Вы ввели неправильный логин или пароль.',
  tokenError: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
  tokenNotFound: 'При авторизации произошла ошибка. Переданный токен некорректен.',
  notFound: 'Страница по указанному маршруту не найдена.',
  duplicate: 'Пользователь с таким email уже существует.',
  internalError: 'На сервере произошла ошибка.',
  profileUpdated: 'Данные профиля обновлены',
}

const INITIAL_STATE = {
  value: '',
  validationMessage: '',
  isValidValue: true,
  isEmpty: true,
  isDirty: false,
  isValid: () => false,
}

export {
  MOVIES_API_BASE_URL,
  SHORT_MOVIE_LENGTH,
  SLICE_PARAMETERS,
  ERROR_MESSAGES,
  INITIAL_STATE,
};
