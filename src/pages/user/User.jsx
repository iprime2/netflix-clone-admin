import PublishIcon from '@mui/icons-material/Publish'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './user.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useContext, useState } from 'react'
import Avatar from '../../images/noAvatar.png'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import SuccessModal from '../../components/SuccessModal/SuccessModal'
import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { UserContext } from '../../context/userContext/UserContext'
import { getUser, updateUser } from '../../context/userContext/apiCalls'

export default function User() {
  const history = useNavigate()

  const location = useLocation()
  const user = location.state.user
  const [updateUserData, setUpdateUserData] = useState({})
  const [profilePic, setProfilePic] = useState()
  const [uploaded, setUploaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const { dispatch, isFetching, users } = useContext(UserContext)

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(false)
    //window.location.reload(false)
  }

  const handleInput = (e) => {
    e.preventDefault()

    const name = e.target.name
    const value = e.target.value

    setUpdateUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      updateUser(updateUserData, dispatch, user._id)
      getUser(dispatch)
      setOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()
    upload({ file: profilePic, label: 'profilePicture' })
  }

  const upload = (item) => {
    setUploading(true)
    console.log(item)
    const fileName = new Date().getTime() + item.label
    const storage = getStorage()
    const storageRef = ref(storage, `/items/${fileName}`)
    const uploadTask = uploadBytesResumable(storageRef, item.file)
    if (profilePic) {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          console.log('Upload is ' + progress + ' % done')
          setProgress(progress)
        },
        (err) => {
          console.log(err)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUpdateUserData((prev) => {
              return {
                ...prev,
                [item.label]: downloadURL,
              }
            })
            setUploaded(true)
          })
        }
      )
    } else {
      console.log('No file to upload')
      setProgress('None')
      setUploaded(true)
    }
    //setUploading(false)
  }

  return (
    <div className='user'>
      <SuccessModal
        open={open}
        handleOpen={handleOpen}
        modalBody='User has benn updated Successfully!!'
      />
      <Topbar />
      <div className='container'>
        <Sidebar />

        <div className='subContainer'>
          <div className='userTitleContainer'>
            <h1 className='userTitle'>Edit User</h1>
            <Link to='/newUser'>
              <button className='userAddButton'>Create</button>
            </Link>
          </div>
          <div className='userContainer'>
            <div className='userShow'>
              <div className='userShowTop'>
                <img
                  src={user.profilePicture ? user.profilePicture : Avatar}
                  alt=''
                  className='userShowImg'
                />
                <div className='userShowTopTitle'>
                  <span className='userShowUsername'>{user.username}</span>
                </div>
              </div>
              <div className='userShowBottom'>
                <div className='userShowInfo'>
                  <span className='userShowInfoTitle'>username: </span>
                  <span className='userShowInfoDetails'>{user.username}</span>
                </div>
                <div className='userShowInfo'>
                  <span className='userShowInfoTitle'>email: </span>
                  <span className='userShowInfoDetails'>{user.email}</span>
                </div>
                <div className='userShowInfo'>
                  <span className='userShowInfoTitle'>Admin: </span>
                  <span className='userShowInfoDetails'>
                    {user.isAdmin ? (
                      <CheckCircleIcon
                        className='userShowAdminIcon'
                        style={{ color: 'green' }}
                      />
                    ) : (
                      <CancelIcon style={{ color: 'red' }} />
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className='userUpdate'>
              <span className='userUpdateTitle'>Edit</span>
              <form className='userUpdateForm'>
                <div className='userUpdateLeft'>
                  <div className='userUpdateItem'>
                    <label>Username</label>
                    <input
                      name='username'
                      onChange={handleInput}
                      type='text'
                      placeholder={user.username}
                      className='userUpdateInput'
                    />
                  </div>
                  <div className='userUpdateItem'>
                    <label>Full Name</label>
                    <input
                      name='fullName'
                      onChange={handleInput}
                      type='text'
                      placeholder={user.fullName}
                      className='userUpdateInput'
                    />
                  </div>
                  <div className='userUpdateItem'>
                    <label>Email</label>
                    <input
                      name='email'
                      onChange={handleInput}
                      type='text'
                      placeholder={user.email}
                      className='userUpdateInput'
                    />
                  </div>
                  <div className='userUpdateItem'>
                    <label>Admin</label>
                    <select type='text' name='isAdmin' onChange={handleInput}>
                      <option>Select</option>
                      <option selected={user.isAdmin} value={true}>
                        True
                      </option>
                      <option selected={!user.isAdmin} value={false}>
                        False
                      </option>
                    </select>
                  </div>
                </div>
                <div className='userUpdateRight'>
                  <div className='userUpdateUpload'>
                    {profilePic && (
                      <CancelOutlinedIcon
                        className='shareCancelImg'
                        onClick={() => setProfilePic()}
                      />
                    )}
                    <img
                      className='userUpdateImg'
                      src={
                        profilePic
                          ? URL.createObjectURL(profilePic)
                          : user.profilePicture
                          ? user.profilePicture
                          : Avatar
                      }
                      alt=''
                    />
                    <label htmlFor='file'>
                      <PublishIcon className='userUpdateIcon' />
                    </label>
                    <input
                      onChange={(e) => setProfilePic(e.target.files[0])}
                      type='file'
                      id='file'
                      style={{ display: 'none' }}
                    />
                  </div>
                  {uploaded ? (
                    <button onClick={handleSubmit} className='newUserButton'>
                      {isFetching ? (
                        <CircularProgress
                          style={{ fontSize: '12px', color: 'white' }}
                        />
                      ) : (
                        'Update'
                      )}
                    </button>
                  ) : (
                    <button onClick={handleUpload} className='newUserButton'>
                      {uploading ? (
                        <CircularProgressWithLabel
                          value={progress}
                          style={{ fontSize: '12px', color: 'white' }}
                        />
                      ) : (
                        'Upload'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant='determinate'
        {...props}
        style={{ color: 'lightgreen', fontWeight: '600', fontSize: '18px' }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='caption'
          component='div'
          color='white'
          style={{ fontWeight: '600' }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
}
