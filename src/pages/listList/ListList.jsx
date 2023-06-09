import './listList.css'
import { DataGrid } from '@mui/x-data-grid'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { getLists, deleteList } from '../../context/listContext/apiCalls'
import { ListContext } from '../../context/listContext/ListContext'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'

export default function ListList() {
  const { lists, dispatch } = useContext(ListContext)

  useEffect(() => {
    getLists(dispatch)
  }, [dispatch])

  const handleDelete = (id) => {
    deleteList(id, dispatch)
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'genre', headerName: 'Genre', width: 150 },
    { field: 'type', headerName: 'type', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/list/' + params.row._id} state={{ list: params.row }}>
              <EditIcon
                style={{ color: 'gray', marginRight: '10px', fontSize: '20px' }}
              />
            </Link>
            <DeleteOutlineIcon
              className='productListDelete'
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        )
      },
    },
  ]

  return (
    <div className='productList'>
      <Topbar />
      <div className='container'>
        <Sidebar />
        <div className='subContainer'>
          <Link to='/newlist'>
            <button className='productAddButtonListTable'>Create</button>
          </Link>
          {lists && (
            <DataGrid
              rows={lists}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              checkboxSelection
              getRowId={(row) => row._id}
            />
          )}
        </div>
      </div>
    </div>
  )
}
