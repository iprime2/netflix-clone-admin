import React, { useContext, useState } from 'react'
import './login.scss'
import { AuthContext } from '../../context/authContext/AuthContext'
import { login } from '../../context/authContext/apicalls'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isFetching, dispatch } = useContext(AuthContext)

  const handleClick = (e) => {
    e.preventDefault()
    login({ email, password }, dispatch)
  }

  return (
    <div className='login'>
      <div className='loginForm'>
        <input
          type='text'
          className='loginInput'
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          className='loginInput'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='loginBtn'
          onClick={handleClick}
          disabled={isFetching}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
