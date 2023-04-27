import './sidebar.css'
import { Link } from 'react-router-dom'
import LineStyleIcon from '@mui/icons-material/LineStyle'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import BarChartIcon from '@mui/icons-material/BarChart'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import ReportIcon from '@mui/icons-material/Report'
import TimelineIcon from '@mui/icons-material/Timeline'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
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
            <li className='sidebarListItem'>
              <TimelineIcon className='sidebarIcon' />
              Analytics
            </li>
            <li className='sidebarListItem'>
              <TrendingUpIcon className='sidebarIcon' />
              Sales
            </li>
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
            <li className='sidebarListItem'>
              <BarChartIcon className='sidebarIcon' />
              Reports
            </li>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Notifications</h3>
          <ul className='sidebarList'>
            <li className='sidebarListItem'>
              <MailOutlineIcon className='sidebarIcon' />
              Mail
            </li>
            <li className='sidebarListItem'>
              <DynamicFeedIcon className='sidebarIcon' />
              Feedback
            </li>
            <li className='sidebarListItem'>
              <ChatBubbleOutlineIcon className='sidebarIcon' />
              Messages
            </li>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Staff</h3>
          <ul className='sidebarList'>
            <li className='sidebarListItem'>
              <WorkOutlineIcon className='sidebarIcon' />
              Manage
            </li>
            <li className='sidebarListItem'>
              <TimelineIcon className='sidebarIcon' />
              Analytics
            </li>
            <li className='sidebarListItem'>
              <ReportIcon className='sidebarIcon' />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
