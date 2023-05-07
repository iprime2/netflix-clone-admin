import './App.css'
import Home from './pages/home/Home'
import { HashRouter, Route, Navigate, Routes } from 'react-router-dom'
import UserList from './pages/userList/UserList'
import User from './pages/user/User'
import NewUser from './pages/newUser/NewUser'
import ProductList from './pages/productList/ProductList'
import Product from './pages/product/Product'
import NewProduct from './pages/newProduct/NewProduct'
import Login from './pages/login/Login'
import { useContext } from 'react'
import { AuthContext } from './context/authContext/AuthContext'
import Logout from './pages/Logout/logout'
import ListList from './pages/listList/ListList'
import List from './pages/List/List'
import NewList from './pages/newList/NewList'

function App() {
  const { user } = useContext(AuthContext)

  return (
    <HashRouter>
      <Routes>
        <Route
          exact
          path='/'
          element={user ? <Home /> : <Navigate to='/login' />}
        />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        {user && (
          <>
            <Route path='/users' element={<UserList />} />

            <Route path='/user/:userId' element={<User />} />

            <Route path='/newUser' element={<NewUser />} />

            <Route path='/movies' element={<ProductList />} />

            <Route path='/product/:productId' element={<Product />} />

            <Route path='/newproduct' element={<NewProduct />} />

            <Route path='/lists' element={<ListList />} />

            <Route path='/list/:listId' element={<List />} />

            <Route path='/newlist' element={<NewList />} />

            <Route path='/logout' element={<Logout />} />
          </>
        )}
      </Routes>
    </HashRouter>
  )
}

export default App
