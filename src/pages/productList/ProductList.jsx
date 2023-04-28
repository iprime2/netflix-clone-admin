import './productList.css'
import { DataGrid } from '@mui/x-data-grid'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { MovieContext } from '../../context/movieContext/MovieContext'
import { getMovies, deleteMovie } from '../../context/movieContext/apiCalls'

export default function ProductList() {
  const { movies, dispatch } = useContext(MovieContext)

  useEffect(() => {
    getMovies(dispatch)
  }, [dispatch])

  console.log(movies)

  const handleDelete = (id) => {
    deleteMovie(id, dispatch)
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'movie',
      headerName: 'Movie',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='productListItem'>
            <img className='productListImg' src={params.row.img} alt='' />
            {params.row.title}
          </div>
        )
      },
    },
    { field: 'genre', headerName: 'Genre', width: 120 },
    { field: 'year', headerName: 'Year', width: 120 },
    { field: 'limit', headerName: 'Limit', width: 120 },
    {
      field: 'isSeries',
      headerName: 'Series',
      width: 120,
      renderCell: (params) => {
        return (
          <span>
            {params.row.isSeries ? (
              <CheckCircleIcon style={{ color: 'green' }} />
            ) : (
              <CancelIcon style={{ color: 'red' }} />
            )}
          </span>
        )
      },
    },
    { field: 'desc', headerName: 'desc', width: 120 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: '/product/' + params.row._id,
                movie: params.row,
              }}
            >
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
      {movies && (
        <DataGrid
          rows={movies}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      )}
    </div>
  )
}
