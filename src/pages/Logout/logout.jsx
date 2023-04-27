import React, { useContext, useEffect } from 'react'
import { logout } from '../../context/authContext/AuthActions'
import { AuthContext } from '../../context/authContext/AuthContext'
import { Redirect } from 'react-router-dom'

const Logout = () => {
  const { dispatch } = useContext(AuthContext)

  useEffect(() => {
    dispatch(logout())
    localStorage.removeItem('user')
  }, [])

  return (
    <div>
      logout
      <Redirect to='/login' />
    </div>
  )
}

export default Logout
