import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from './AuthActions'
import { useState } from 'react'

export const useLogin = () => {
  const [loading, setLoading] = useState(false)

  const login = async (user, dispatch) => {
    setLoading(true)
    dispatch(loginStart())
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + 'auth/login',
        user
      )
      console.log(res)
      res.data.isAdmin && dispatch(loginSuccess(res.data))
    } catch (error) {
      dispatch(loginFailure())
    }
    setLoading(false)
  }
  return { loading, login }
}
