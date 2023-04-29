import { useContext, useState } from 'react'
import './newProduct.css'
import { storage } from '../../firebase'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { createMovie } from '../../context/movieContext/apiCalls'
import { MovieContext } from '../../context/movieContext/MovieContext'

export default function NewProduct() {
  const [newMovieData, setNewMovieData] = useState(null)
  const [newMovieImg, setNewMovieImg] = useState(null)
  const [newMovieTitleImg, setNewMovieTitleImg] = useState(null)
  const [newMovieThumbImg, setNewMovieThumbImg] = useState(null)
  const [newMovieTrailer, setNewMovieTrailer] = useState(null)
  const [newMovieVideo, setNewMovieVideo] = useState(null)
  const [Uploaded, setUploaded] = useState(0)

  const { dispatch } = useContext(MovieContext)

  const handleMovie = (e) => {
    const name = e.target.name
    const value = e.target.value

    setNewMovieData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const upload = (items) => {
    items.forEach((item) => {
      console.log(item.file.name)
      const fileName = new Date().getTime() + item.label + item.file.name
      const storage = getStorage()
      const storageRef = ref(storage, `/items/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, item.file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '  % done')
        },
        (err) => {
          console.log(err)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setNewMovieData((prev) => {
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
  }

  const handleUpload = (e) => {
    e.preventDefault()
    upload([{ file: newMovieImg, label: 'img' }])
    upload([{ file: newMovieTitleImg, label: 'imgTitle' }])
    upload([{ file: newMovieThumbImg, label: 'imgSm' }])
    upload([{ file: newMovieTrailer, label: 'trailer' }])
    upload([{ file: newMovieVideo, label: 'video' }])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createMovie(newMovieData, dispatch)
  }

  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Movie</h1>
      <form>
        <div className='addProductForm'>
          <div className='addProductItem'>
            <label>Image</label>
            <input
              type='file'
              id='img'
              name='Image'
              onChange={(e) => setNewMovieImg(e.target.files[0])}
            />
          </div>
          <div className='addProductItem'>
            <label>Title Image</label>
            <input
              type='file'
              id='imgTitle'
              name='titleImg'
              onChange={(e) => setNewMovieTitleImg(e.target.files[0])}
            />
          </div>
          <div className='addProductItem'>
            <label>Thumbnail Image</label>
            <input
              type='file'
              id='imgThumbnail'
              name='imgThumb'
              onChange={(e) => setNewMovieThumbImg(e.target.files[0])}
            />
          </div>
          <div className='addProductItem'>
            <label>Title</label>
            <input
              type='text'
              placeholder='John Wick'
              name='title'
              onChange={handleMovie}
            />
          </div>
          <div className='addProductItem'>
            <label>Desc</label>
            <input
              type='text'
              placeholder='about movie'
              name='desc'
              onChange={handleMovie}
            />
          </div>
          <div className='addProductItem'>
            <label>Year</label>
            <input
              type='text'
              placeholder='Year'
              name='year'
              onChange={handleMovie}
            />
          </div>
          <div className='addProductItem'>
            <label>Genre</label>
            <input
              type='text'
              placeholder='Genre'
              name='genre'
              onChange={handleMovie}
            />
          </div>
          <div className='addProductItem'>
            <label>Duration</label>
            <input
              type='text'
              placeholder='Duration'
              name='duration'
              onChange={handleMovie}
            />
          </div>
          <div className='addProductItem'>
            <label>limit</label>
            <input
              type='text'
              placeholder='limit'
              name='limit'
              onChange={handleMovie}
            />
          </div>
          <div className='addProductItem'>
            <label>Series</label>
            <select name='isSeries' id='isSeries' onChange={handleMovie}>
              <option>Select</option>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          <div className='addProductItem'>
            <label>Trailer</label>
            <input
              type='file'
              id='trailer'
              name='trailer'
              onChange={(e) => setNewMovieTrailer(e.target.files[0])}
            />
          </div>
          <div className='addProductItem'>
            <label>Video</label>
            <input
              type='file'
              id='Video'
              name='video'
              onChange={(e) => setNewMovieVideo(e.target.files[0])}
            />
          </div>
        </div>
        {Uploaded === 5 ? (
          <button className='addProductButton' onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className='addProductButton' onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  )
}
