import { useContext, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './newUser.css'
import { createUser } from '../../context/userContext/apiCalls'
import { UserContext } from '../../context/userContext/UserContext'
import PublishIcon from '@mui/icons-material/Publish'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '../../images/noAvatar.png'
import SuccessModal from '../../components/SuccessModal/SuccessModal'

export default function NewUser() {
  const [user, setUser] = useState({})
  const [profilePicture, setProfilePicture] = useState()
  const [uploaded, setUploaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const { dispatch, isFetching } = useContext(UserContext)

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(false)
    window.location.reload(false)
  }

  const handleInput = (e) => {
    e.preventDefault()

    const name = e.target.name
    const value = e.target.value

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      createUser(user, dispatch)
      setOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()
    upload({ file: profilePicture, label: 'profilePicture' })
  }

  const upload = (item) => {
    setUploading(true)
    console.log(item)
    const fileName = new Date().getTime() + item.label
    const storage = getStorage()
    const storageRef = ref(storage, `/items/${fileName}`)
    const uploadTask = uploadBytesResumable(storageRef, item.file)
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
          setUser((prev) => {
            return {
              ...prev,
              [item.label]: downloadURL,
            }
          })
          setUploaded(true)
        })
      }
    )
    //setUploading(false)
  }

  return (
    <div className='newUser'>
      <SuccessModal
        open={open}
        handleOpen={handleOpen}
        modalBody='List Created Successfully!!'
      />
      <Topbar />
      <div className='container'>
        <Sidebar />
        <div className='subContainer'>
          <h1 className='newUserTitle'>New User</h1>
          <form className='newUserForm'>
            <div className='newUserItem-sub'>
              {profilePicture && (
                <CancelOutlinedIcon
                  className='shareCancelImg'
                  onClick={() => setProfilePicture()}
                />
              )}
              <img
                className='userProfileImg'
                src={
                  profilePicture ? URL.createObjectURL(profilePicture) : Avatar
                }
                alt=''
              />
              <label htmlFor='file'>
                <PublishIcon className='userUpdateIcon' />
              </label>
              <input
                onChange={(e) => setProfilePicture(e.target.files[0])}
                type='file'
                id='file'
                style={{ display: 'none' }}
              />
            </div>
            <div className='newUserItem'>
              <label>Username</label>
              <input
                name='username'
                onChange={handleInput}
                type='text'
                placeholder='john'
              />
            </div>
            <div className='newUserItem'>
              <label>Full Name</label>
              <input
                name='fullName'
                onChange={handleInput}
                type='text'
                placeholder='John Smith'
              />
            </div>
            <div className='newUserItem'>
              <label>Email</label>
              <input
                name='email'
                onChange={handleInput}
                type='email'
                placeholder='john@gmail.com'
              />
            </div>
            <div className='newUserItem'>
              <label>Password</label>
              <input
                name='password'
                onChange={handleInput}
                type='password'
                placeholder='password'
              />
            </div>
            <div className='newUserItem'>
              <label>Admin</label>
              <select type='text' name='isAdmin' onChange={handleInput}>
                <option>Select</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>

            {uploaded ? (
              <button onClick={handleSubmit} className='newUserButton'>
                {isFetching ? (
                  <CircularProgress
                    style={{ fontSize: '12px', color: 'white' }}
                  />
                ) : (
                  'Create'
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
          </form>
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
