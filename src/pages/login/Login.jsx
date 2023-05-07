import React, { useContext, useState } from 'react'
import './login.scss'
import { AuthContext } from '../../context/authContext/AuthContext'
import { useLogin } from '../../context/authContext/apicalls'
import CircularProgress from '@mui/material/CircularProgress'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isFetching, dispatch,error } = useContext(AuthContext)

  const { loading, login } = useLogin()

  const handleClick = (e) => {
    e.preventDefault()
    login({ email, password }, dispatch)
  }

  return (
    <div className='login'>
      <div className='loginForm'>
        <p className='loginTitle'>Login Into Movie Streaming Admin Panel</p>
        <input
          type='text'
          className='loginInput'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          className='loginInput'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='loginBtn'
          onClick={handleClick}
          disabled={isFetching}
        >
          {loading ? (
            <CircularProgress style={{ fontSize: '12px' }} />
          ) : (
            'Login'
          )}
        </button>

        <span className='loginInfo'>
          Demo Account (id:"demo@demo.com" password:"123456")
          {error && (
          <span style={{ color: 'red', fontWeight: 'bold', fontSize: '22px' }}>
            Something Went Wrong
          </span>
        )}
        </span>
      </div>
    </div>
  )
}

export default Login
