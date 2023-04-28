import { useContext, useEffect, useState } from 'react'
import './newList.css'
import { createList } from '../../context/listContext/apiCalls'
import { ListContext } from '../../context/listContext/ListContext'
import { MovieContext } from '../../context/movieContext/MovieContext'
import { getMovies } from '../../context/movieContext/apiCalls'
import { useHistory } from 'react-router-dom'

export default function NewProduct() {
  const [list, setList] = useState(null)

  const { dispatch } = useContext(ListContext)
  const { movies, dispatch: dispatchMovies } = useContext(MovieContext)

  const history = useHistory()

  useEffect(() => {
    getMovies(dispatchMovies)
  }, [dispatchMovies])

  const handleMovie = (e) => {
    const name = e.target.name
    const value = e.target.value

    setList((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createList(list, dispatch)
    history.push('/lists')
  }

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value)
    setList({ ...list, [e.target.name]: value })
  }

  console.log(list)

  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Movie</h1>
      <form>
        <div className='addProductForm'>
          <div className='formLeft'>
            <div className='addProductItem'>
              <label>Title</label>
              <input
                type='text'
                placeholder='Horror Movie'
                name='title'
                onChange={handleMovie}
              />
            </div>
            <div className='addProductItem'>
              <label>Type</label>
              <select type='text' name='type' onChange={handleMovie}>
                <option>Select type</option>
                <option value='movie'>Movie</option>
                <option value='series'>Series</option>
              </select>
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
          </div>
          <div className='formRight'>
            <div className='addProductItem'>
              <label>Content</label>
              <select
                multiple
                style={{ height: '200px' }}
                name='content'
                onChange={handleSelect}
              >
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button className='addProductButton' onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  )
}
