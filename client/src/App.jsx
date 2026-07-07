import React, { useContext } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
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
import Contact from './components/Contact'
import AddAddress from './pages/AddAddress'
import SellerLogin from './components/seller/SellerLogin'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import SellerDashboard from './pages/seller/SellerDashboard.jsx'


function App() {

  const {isSeller, user,  showUserLogin} = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
   <div className='text-default min-h-screen'>

    {isSellerPath ? null : <NavBar/>}
    {showUserLogin ? <LoginSignup/> : null}
    <Toaster/>
      <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/products' element={<AllProducts />}  /> 
        <Route path='/productdetail/:id' element={<ProductDetail/>}  />
        <Route path='/categorydetail/:categoryname' element={<CategoryDetail />}  /> 
        <Route path='/cart' element={<Cart/>}  />
        <Route path='/my-orders' element={<MyOrder/> }  />
        <Route path='/contact' element={<Contact />}  /> 
        <Route path='/add-address' element={<AddAddress />}  />

         {/* For seller Routing - */}
        <Route path='/seller' element={isSeller ? <SellerDashboard/> : <SellerLogin/>}>

            <Route index element={ isSeller ? <AddProduct/> : null}/> 
            <Route path='product-list' element={ isSeller ? <ProductList/> : null}/> 
            <Route path='orders' element={ isSeller ? <Orders/> : null}/> 
            
        </Route> 


      </Routes>
      </div>
      {isSellerPath ? null : <Footer/>}
   </div>
  )
}

export default App