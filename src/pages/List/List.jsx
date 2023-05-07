import { Link, useLocation } from 'react-router-dom'
import './list.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext, useState } from 'react'
import SuccessModal from '../../components/SuccessModal/SuccessModal'
import CircularProgress from '@mui/material/CircularProgress'
import { ListContext } from '../../context/listContext/ListContext'
import { updateList } from '../../context/listContext/apiCalls'

export default function List() {
  const location = useLocation()
  const list = location.state.list

  const { dispatch, isFetching, error } = useContext(ListContext)

  const [updateListData, setUpdateListData] = useState({})

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(false)
    //window.location.reload(false)
  }
  const handleInput = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value

    setUpdateListData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    updateList(dispatch, updateListData, list._id)
    if (error) console.log(error)
  }

  return (
    <div className='product'>
      <SuccessModal
        open={open}
        handleOpen={handleOpen}
        modalBody='User has been updated Successfully!!'
      />
      <Topbar />
      <div className='container'>
        <Sidebar />
        <div className='subContainer'>
          <div className='productTitleContainer'>
            <h1 className='productTitle'>List</h1>
            <Link to='/newlist'>
              <button className='productAddButton'>Create</button>
            </Link>
          </div>
          <div className='productTop'>
            <div className='productTopRight'>
              <div className='productInfoTop'>
                <span className='productName'>{list.title}</span>
              </div>
              <div className='productInfoBottom'>
                <div className='productInfoItem'>
                  <span className='productInfoKey'>id:</span>
                  <span className='productInfoValue'>{list._id}</span>
                </div>
                <div className='productInfoItem'>
                  <span className='productInfoKey'>genre:</span>
                  <span className='productInfoValue'>{list.genre}</span>
                </div>
                <div className='productInfoItem'>
                  <span className='productInfoKey'>type:</span>
                  <span className='productInfoValue'>{list.type}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='productBottom'>
            <form className='productForm'>
              <div className='productFormLeft'>
                <label>list Title</label>
                <input
                  onChange={handleInput}
                  name='title'
                  type='text'
                  placeholder={list.title}
                />
                <label>Type</label>
                <input
                  onChange={handleInput}
                  name='type'
                  type='text'
                  placeholder={list.type}
                />
                <label>Genre</label>
                <input
                  onChange={handleInput}
                  name='genre'
                  type='text'
                  placeholder={list.genre}
                />
              </div>
              <div className='productFormRight'>
                <button className='productButton' onClick={handleUpdate}>
                  {isFetching ? <CircularProgress /> : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
