import './userList.css'
import { DataGrid } from '@mui/x-data-grid'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { UserContext } from '../../context/userContext/UserContext'
import { deleteUser, getUser } from '../../context/userContext/apiCalls'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Avatar from '../../images/noAvatar.png'

export default function UserList() {
  const { users, dispatch, isFetching } = useContext(UserContext)
  const flag = true

  useEffect(() => {
    // window.location.reload(false)
  }, [1])

  useEffect(() => {
    getUser(dispatch)
  }, [dispatch])

  const handleDelete = (id) => {
    deleteUser(id, dispatch)
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 190 },
    {
      field: 'user',
      headerName: 'User',
      width: 110,
      renderCell: (params) => {
        return (
          <div className='userListUser'>
            <img
              className='userListImg'
              src={
                params.row.profilePicture ? params.row.profilePicture : Avatar
              }
              alt=''
            />
            {params.row.username}
          </div>
        )
      },
    },
    { field: 'fullName', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'isAdmin',
      headerName: 'Admin',
      width: 120,
      renderCell: (params) => {
        return (
          <span>
            {params.row.isAdmin ? (
              <CheckCircleIcon style={{ color: 'green' }} />
            ) : (
              <CancelIcon style={{ color: 'red' }} />
            )}
          </span>
        )
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/user/' + params.row._id} state={{ user: params.row }}>
              <button className='userListEdit'>Edit</button>
            </Link>
            <DeleteOutlineIcon
              className='userListDelete'
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        )
      },
    },
  ]

  return (
    <div className='userList'>
      <Topbar />
      <div className='container'>
        <Sidebar />
        <div className='subContainer'>
          <DataGrid
            rows={users}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </div>
      </div>
    </div>
  )
}
