// Роуты
export const ROUTES = {
  HOME: "/",
  MOVIES: "/movies",
  SAVED_MOVIES: "/saved-movies",
  PROFILE: "/profile",
  SIGNUP: "/signup",
  SIGNIN: "/signin",
  SIGNOUT: "/signout",
  ERROR: "/404",
  UNKNOWN: "/*",
};

// переводим время из 'минут' в 'часы и минуты'
export const convertDurationToHourlyFormat = (movie) => {
  const duration = movie.duration; // длительность фильма
  const remainder = (duration % 60) // остаток от деления на 60
  const durationToHour = (duration / 60); // целое от деления на 60
  if (duration >= 60) { // если больше часа по времени
    return `${Math.floor(durationToHour)}ч ${remainder}м`
  } else { // если меньше часа - в минутах
    return `${remainder}м`;
  }
}

// точки перестроения экрана
export const LAPTOP = '(max-width: 1024px)';
export const TABLET = '(max-width: 768px)';
export const MOBILE = '(max-width: 550px)';

// длительность короткометражек - менее 40мин включительно
export const SHORT_MOVIES = movie => movie.duration <= 40;

// число карточек в ряду
export const CARDS_PER_ROW = {
  mobile: 1,
  tablet: 2,
  laptop: 3,
  desktop: 4,
};

// сколько рядов карточек показывать
export const ROWS_TO_SHOW = {
  mobile: 5,
  others: 4,
};