import React, { useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetail'
import Cart from './pages/Cart'
import NavBar from './components/NavBar'
import { AppContext } from './context/AppContext'
import MyOrder from './pages/MyOrder'
import LoginSignup from './components/LoginSignup'
import ProductCategory from './pages/productCategory'
import Footer from './components/Footer'

function App() {

  const {isSeller,  showUserLogin} = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
   <div className='text-default min-h-screen'>

    {isSellerPath ? null : <NavBar/>}
    {showUserLogin ? <LoginSignup/> : null}
    
      <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/products' element={<Products/>}  />
        <Route path='/productdetail/:id' element={<ProductDetails/>}  />
        <Route path='/cart' element={<Cart/>}  />
        <Route path='/myorder' element={<MyOrder/>}  />
         <Route path='/productcategory/:categoryname' element={<ProductCategory />}  />
      </Routes>
      </div>
      {isSellerPath ? null : <Footer/>}
   </div>
  )
}

export default App