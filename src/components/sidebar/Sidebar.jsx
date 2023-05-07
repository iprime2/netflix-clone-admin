import './sidebar.css'
import { Link } from 'react-router-dom'
import LineStyleIcon from '@mui/icons-material/LineStyle'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Dashboard</h3>
          <ul className='sidebarList'>
            <Link to='/' className='link'>
              <li className='sidebarListItem active'>
                <LineStyleIcon className='sidebarIcon' />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Quick Menu</h3>
          <ul className='sidebarList'>
            <Link to='/users' className='link'>
              <li className='sidebarListItem'>
                <PermIdentityIcon className='sidebarIcon' />
                Users
              </li>
            </Link>
            <Link to='/movies' className='link'>
              <li className='sidebarListItem'>
                <PlayArrowOutlinedIcon className='sidebarIcon' />
                Movies
              </li>
            </Link>
            <Link to='/lists' className='link'>
              <li className='sidebarListItem'>
                <FormatListBulletedIcon className='sidebarIcon' />
                List
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}
