// Роуты
export const ROUTES = {
  HOME: "/",
  MOVIES: "/movies",
  SAVED_MOVIES: "/saved-movies",
  PROFILE: "/profile",
  SIGNUP: "/signup",
  SIGNIN: "/signin",
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