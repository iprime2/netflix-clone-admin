import {
  createListFailure,
  createListStart,
  createListSuccess,
  getListsFailure,
  getListsStart,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsSuccess,
  updateListStart,
  updateListSuccess,
  updateListFailure,
} from './ListActions'

import axios from 'axios'

export const getLists = async (dispatch) => {
  dispatch(getListsStart())
  try {
    const res = await axios.get(process.env.REACT_APP_API_URL + 'lists', {
      headers: {
        token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
      },
    })
    dispatch(getListsSuccess(res.data))
  } catch (error) {
    dispatch(getListsFailure())
    console.log(error)
  }
}

export const createList = async (list, dispatch) => {
  dispatch(createListStart())
  try {
    const res = await axios.post(
      process.env.REACT_APP_API_URL + 'lists',
      list,
      {
        headers: {
          token:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
      }
    )
    console.log(res)
    dispatch(createListSuccess(list))
  } catch (error) {
    dispatch(createListFailure())
    console.log(error)
  }
}

export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart())
  try {
    const res = await axios.delete(
      process.env.REACT_APP_API_URL + 'lists/' + id,
      {
        headers: {
          token:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
      }
    )
    console.log(res)
    dispatch(deleteListSuccess(id))
  } catch (error) {
    dispatch(deleteListFailure())
    console.log(error)
  }
}

export const updateList = async (list, dispatch, id) => {
  //dispatch()
  try {
    const res = await axios.put(
      process.env.REACT_APP_API_URL + 'lists/' + id,
      list,
      {
        headers: {
          token:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
      }
    )
    console.log(res)
    dispatch(updateListSuccess(list))
  } catch (error) {
    dispatch(updateListFailure())
    console.log(error)
  }
}
