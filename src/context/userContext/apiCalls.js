import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
} from './UserActions'

import axios from 'axios'

export const getUser = async (dispatch) => {
  dispatch(getUsersStart())
  try {
    const res = await axios.get(process.env.REACT_APP_API_URL + 'users', {
      headers: {
        token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
      },
    })
    dispatch(getUsersSuccess(res.data))
  } catch (error) {
    dispatch(getUsersFailure())
    console.log(error)
  }
}

export const createUser = async (user, dispatch) => {
  dispatch(createUserStart())

  try {
    const res = await axios.post(
      process.env.REACT_APP_API_URL + 'auth/register',
      user,
      {
        headers: {
          token:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
      }
    )
    console.log(res)
    dispatch(createUserSuccess(user))
  } catch (error) {
    dispatch(createUserFailure())
    console.log(error)
  }
}

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart())
  try {
    const res = await axios.delete(
      process.env.REACT_APP_API_URL + 'users/' + id,
      {
        headers: {
          token:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
      }
    )
    console.log(res)
    dispatch(deleteUserSuccess(id))
  } catch (error) {
    dispatch(deleteUserFailure())
    console.log(error)
  }
}

export const updateUser = async (user, dispatch, id) => {
  dispatch(updateUserStart())
  try {
    const res = await axios.put(
      process.env.REACT_APP_API_URL + 'users/' + id,
      user,
      {
        headers: {
          token:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
      }
    )
    console.log(res)
    dispatch(updateUserSuccess(user))
  } catch (error) {
    dispatch(updateUserFailure())
    console.log(error)
  }
}
