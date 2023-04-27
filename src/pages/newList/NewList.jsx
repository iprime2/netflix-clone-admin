import { useContext, useState } from 'react'
import './newList.css'
import { createList } from '../../context/listContext/apiCalls'
import { ListContext } from '../../context/listContext/ListContext'

export default function NewProduct() {
  const [newMovieData, setNewMovieData] = useState(null)

  const { dispatch } = useContext(ListContext)

  const handleMovie = (e) => {
    const name = e.target.name
    const value = e.target.value

    setNewMovieData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createList(newMovieData, dispatch)
  }

  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Movie</h1>
      <form>
        <div className='addProductForm'>
          <div className='addProductItem'>
            <label>List Title</label>
            <input
              type='text'
              placeholder='Horror Movie'
              name='title'
              onChange={handleMovie}
            />
          </div>
          <div className='addProductItem'>
            <label>Type</label>
            <input
              type='text'
              placeholder='movies or series'
              name='type'
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
        </div>
        <button className='addProductButton' onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  )
}
