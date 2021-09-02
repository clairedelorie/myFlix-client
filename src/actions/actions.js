export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_USER = "SET_USER";

export function setMovies(movies) {
  return { type: SET_MOVIES, value: movies };
}

export function setFilter(visibilityFilter) {
  return { type: SET_FILTER, value: visibilityFilter };
}

export function setUser(user) {
  return { type: SET_MOVIES, value: user };
}
