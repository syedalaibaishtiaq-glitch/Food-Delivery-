import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}>
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}>
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}>
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar