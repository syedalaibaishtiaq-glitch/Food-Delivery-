import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import GoogleSuccess from './pages/GoogleSuccess/GoogleSuccess'
import LoginPopup from './components/LoginPopup/LoginPopup'
import AppDownload from './components/AppDownload/AppDownload'
import Footer from './components/Footer/Footer'
import { StoreContext } from './context/StoreContext'
import Verify from './pages/Verify/Verify'

const App = () => {
  const { showLogin, setShowLogin } = useContext(StoreContext)

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/google-success' element={<GoogleSuccess />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </div>
      <AppDownload />
      <Footer />
    </>
  )
}

export default App