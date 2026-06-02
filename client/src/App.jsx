import React, { useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'

import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import NavBar from './components/NavBar'
import { AppContext } from './context/AppContext'
import MyOrder from './pages/MyOrder'
import LoginSignup from './components/LoginSignup'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import CategoryDetail from './pages/CategoryDetail'
import AllProducts from './pages/AllProducts'


function App() {

  const {isSeller,  showUserLogin} = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
   <div className='text-default min-h-screen'>

    {isSellerPath ? null : <NavBar/>}
    {showUserLogin ? <LoginSignup/> : null}
    <Toaster/>
      <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/productdetail/:id' element={<ProductDetail/>}  />
        <Route path='/cart' element={<Cart/>}  />
        <Route path='/myorder' element={<MyOrder/>}  />
         <Route path='/categorydetail/:name' element={<CategoryDetail />}  /> 
         <Route path='/products' element={<AllProducts />}  /> 
      </Routes>
      </div>
      {isSellerPath ? null : <Footer/>}
   </div>
  )
}

export default App