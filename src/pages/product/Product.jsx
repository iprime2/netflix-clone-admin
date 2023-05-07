import { Link, useLocation } from 'react-router-dom'
import './product.css'
import PublishIcon from '@mui/icons-material/Publish'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext, useState } from 'react'
import { MovieContext } from '../../context/movieContext/MovieContext'
import { updateMovie } from '../../context/movieContext/apiCalls'
import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import SuccessModal from '../../components/SuccessModal/SuccessModal'

export default function Product() {
  const location = useLocation()
  const movie = location.state.movie
  const [movieData, setMovieData] = useState()
  const { isFetching, dispatch } = useContext(MovieContext)
  const [img, setImg] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [video, setVideo] = useState(null)
  const [Uploaded, setUploaded] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)

  const handleInput = (e) => {
    e.preventDefault()

    const name = e.target.name
    const value = e.target.value

    setMovieData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleOpen = () => {
    setOpen(false)
    window.location.reload(false)
  }

  const handleUpload = (e) => {
    e.preventDefault()
    upload([{ file: img, label: 'img' }])
    upload([{ file: img, label: 'imgTitle' }])
    upload([{ file: img, label: 'imgSm' }])
    upload([{ file: trailer, label: 'trailer' }])
    upload([{ file: video, label: 'video' }])
  }

  const upload = (items) => {
    setUploading(true)
    items.forEach((item) => {
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
            setMovieData((prev) => {
              return {
                ...prev,
                [item.label]: downloadURL,
              }
            })
            setUploaded((prev) => prev + 1)
          })
        }
      )
    })
    //setUploading(false)
  }
  const handleUpdate = (e) => {
    e.preventDefault()
    updateMovie(dispatch, movieData, movie._id)
  }

  return (
    <div className='product'>
      <SuccessModal
        open={open}
        handleOpen={handleOpen}
        modalBody='Movie/Series Updated Successfully !!'
      />
      <Topbar />
      <div className='container'>
        <Sidebar />
        <div className='subContainer'>
          <div className='productTitleContainer'>
            <h1 className='productTitle'>Movie</h1>
            <Link to='/newproduct'>
              <button className='productAddButton'>Create</button>
            </Link>
          </div>
          <div className='productTop'>
            <div className='productTopRight'>
              <div className='productInfoTop'>
                <img src={movie?.img} alt='' className='productInfoImg' />
                <span className='productName'>{movie?.title}</span>
              </div>
              <div className='productInfoBottom'>
                <div className='productInfoItem'>
                  <span className='productInfoKey'>id:</span>
                  <span className='productInfoValue'>{movie?._id}</span>
                </div>
                <div className='productInfoItem'>
                  <span className='productInfoKey'>desc:</span>
                  <span className='productInfoValue'>{movie?.desc}</span>
                </div>
                <div className='productInfoItem'>
                  <span className='productInfoKey'>genre:</span>
                  <span className='productInfoValue'>{movie?.genre}</span>
                </div>
                <div className='productInfoItem'>
                  <span className='productInfoKey'>year:</span>
                  <span className='productInfoValue'>{movie?.year}</span>
                </div>
                <div className='productInfoItem'>
                  <span className='productInfoKey'>limit:</span>
                  <span className='productInfoValue'>{movie?.limit}+</span>
                </div>
              </div>
            </div>
          </div>
          <div className='productBottom'>
            <form className='productForm'>
              <div className='productFormLeft'>
                <label>Movie Name</label>
                <input
                  name='title'
                  onChange={handleInput}
                  type='text'
                  placeholder={movie?.title}
                />
                <label>Desc</label>
                <input
                  name='desc'
                  onChange={handleInput}
                  type='text'
                  placeholder={movie?.desc}
                />
                <label>Year</label>
                <input
                  name='year'
                  onChange={handleInput}
                  type='text'
                  placeholder={movie?.year}
                />
                <label>Genre</label>
                <input
                  name='genre'
                  onChange={handleInput}
                  type='text'
                  placeholder={movie?.genre}
                />
                <label>Limit</label>
                <input
                  name='limit'
                  onChange={handleInput}
                  type='text'
                  placeholder={movie?.limit}
                />
                <label>Series</label>
                <select
                  name='isSeries'
                  id='isSeries'
                  className='selectInput'
                  onChange={handleInput}
                >
                  <option>Select</option>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
                <label>Trailer</label>
                <input type='file' placeholder={movie?.trailer} />
                <label>Video</label>
                <input type='file' placeholder={movie?.video} />
              </div>
              <div className='productFormRight'>
                <div className='productUpload'>
                  <label></label>
                  <img
                    src={img ? URL.createObjectURL(img) : movie?.img}
                    alt=''
                    className='productUploadImg'
                  />
                  <label for='file'>
                    <PublishIcon />
                  </label>
                  <input type='file' id='file' style={{ display: 'none' }} />
                </div>
                {Uploaded === 5 ? (
                  <button className='addProductButton' onClick={handleUpdate}>
                    {isFetching ? <CircularProgress /> : 'Update'}
                  </button>
                ) : (
                  <button className='addProductButton' onClick={handleUpload}>
                    {uploading ? (
                      <CircularProgressWithLabel value={progress} />
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
