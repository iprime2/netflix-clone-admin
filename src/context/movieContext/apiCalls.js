import {
  createMoviesFailure,
  createMoviesStart,
  createMoviesSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure,
} from './MovieActions'

import axios from 'axios'

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart())
  try {
    const res = await axios.get(process.env.REACT_APP_API_URL + 'movies', {
      headers: {
        token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
      },
    })
    dispatch(getMoviesSuccess(res.data))
  } catch (error) {
    dispatch(getMoviesFailure())
    console.log(error)
  }
}

export const createMovie = async (movie, dispatch) => {
  dispatch(createMoviesStart())

  try {
    const res = await axios.post(
      process.env.REACT_APP_API_URL + 'movies',
      movie,
      {
        headers: {
          token:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
      }
    )
    console.log(res)
    dispatch(createMoviesSuccess(movie))
  } catch (error) {
    dispatch(createMoviesFailure())
    console.log(error)
  }
}

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart())
  try {
    const res = await axios.delete(
      process.env.REACT_APP_API_URL + 'movies/' + id,
      {
        headers: {
          token:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
      }
    )
    console.log(res)
    dispatch(deleteMovieSuccess(id))
  } catch (error) {
    dispatch(deleteMovieFailure())
    console.log(error)
  }
}

export const updateMovie = async (movie, dispatch) => {
  dispatch(updateMovieStart())

  try {
    const res = await axios.put(
      process.env.REACT_APP_API_URL + 'movies',
      movie,
      {
        headers: {
          token:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
      }
    )
    console.log(res)
    dispatch(updateMovieSuccess(movie))
  } catch (error) {
    dispatch(updateMovieFailure())
    console.log(error)
  }
}
