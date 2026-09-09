// import React, { useContext, useState } from 'react'
// import './Navbar.css'
// import { assets } from '../../assets/assets'
// import { Link, useNavigate } from 'react-router-dom'
// import { StoreContext } from '../../context/StoreContext'

// const Navbar = ({ setShowLogin }) => {
//   const [menu, setMenu] = useState("home")
//   const { getTotalCartAmount, token, setToken, setCartItems, search, setSearch, showSearch, setShowSearch } = useContext(StoreContext)
//     const logout = () => {
//     localStorage.removeItem("token")
//     setToken("")
//     setCartItems({})
//     navigate("/")
//   }

//   return (
//     <div className='navbar'>
//       <Link to='/'>
//         <img src={assets.logo} alt="logo" className='logo' />
//       </Link>
//       <ul className="navbar-menu">
//        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
//   <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
//   <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
//   <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
//   {token && <Link to='/myorders' onClick={() => setMenu("myorders")} className={menu === "myorders" ? "active" : ""}>my orders</Link>}
// </ul>
//       <div className="navbar-right">
//         <img src={assets.search_icon} alt="search" />
//         <div className="navbar-basket-icon">
//           <Link to='/cart'>
//             <img src={assets.basket_icon} alt="basket" />
//           </Link>
//           {getTotalCartAmount() > 0 ? <div className="dot"></div> : <></>}
//         </div>
//         {!token
//           ? <button onClick={() => setShowLogin(true)}>sign in</button>
//           : <div className="navbar-profile">
//               <img src={assets.profile_icon} alt="profile" />
//               <ul className="navbar-profile-dropdown">
//                 <li onClick={logout}><img src={assets.logout_icon} alt="logout" /><p>Logout</p></li>
//               </ul>
//             </div>
//         }
//       </div>
//     </div>
//   )
// }

// export default Navbar



import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home")
  const { getTotalCartAmount, token, setToken, setCartItems, search, setSearch, showSearch, setShowSearch } = useContext(StoreContext)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    setCartItems({})
    navigate("/")
  }

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo} alt="logo" className='logo' />
      </Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
        {token && <Link to='/myorders' onClick={() => setMenu("myorders")} className={menu === "myorders" ? "active" : ""}>my orders</Link>}
      </ul>
      <div className="navbar-right">
        <img onClick={() => setShowSearch(prev => !prev)} src={assets.search_icon} alt="search" className="navbar-search-icon" />
        <div className="navbar-basket-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          {getTotalCartAmount() > 0 ? <div className="dot"></div> : <></>}
        </div>
        {!token
          ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className="navbar-profile">
              <img src={assets.profile_icon} alt="profile" />
              <ul className="navbar-profile-dropdown">
                <li onClick={logout}><img src={assets.logout_icon} alt="logout" /><p>Logout</p></li>
              </ul>
            </div>
        }
      </div>
      {showSearch && (
        <div className="navbar-search-bar">
          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
      )}
    </div>
  )
}

export default Navbar