import React, { useContext } from 'react'
import './topbar.css'
import { NotificationsNone, Language, Settings } from '@mui/icons-material'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext/AuthContext'
import Avatar from '../../images/noAvatar.png'
export default function Topbar() {
  const { user } = useContext(AuthContext)
  return (
    <div className='topbar'>
      <div className='topbarWrapper'>
        <div className='topLeft'>
          <span className='logo'>lamaadmin</span>
        </div>
        <div className='topRight'>
          <div className='topbarIconContainer'>
            <NotificationsNone />
            <span className='topIconBadge'>2</span>
          </div>
          <div className='topbarIconContainer'>
            <Language />
            <span className='topIconBadge'>2</span>
          </div>
          <div className='topbarIconContainer'>
            <Settings />
          </div>
          <img
            src={user.profilePicture ? user.profilePicture : Avatar}
            alt=''
            className='topAvatar'
          />
          <Link to='/logout' style={{ textDecoration: 'none', color: 'black' }}>
            <LogoutIcon className='icon' />
          </Link>
        </div>
      </div>
    </div>
  )
}
