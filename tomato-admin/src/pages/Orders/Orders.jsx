import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { url } from '../../assets/assets'

const Orders = () => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`)
    if (response.data.success) {
      setOrders(response.data.data)
    } else {
      toast.error("Error fetching orders")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='orders add'>
      <h3>Orders Page</h3>
      <p className='orders-subtitle'>{orders.length} order{orders.length !== 1 ? 's' : ''} total</p>
      <div className="orders-stats">
  <div className="stat-card">
    <p className="stat-number">{orders.length}</p>
    <p className="stat-label">Total Orders</p>
  </div>
  <div className="stat-card">
    <p className="stat-number">{orders.filter(o => o.status === "Food Processing").length}</p>
    <p className="stat-label">Processing</p>
  </div>
  <div className="stat-card">
    <p className="stat-number">{orders.filter(o => o.status === "Out for delivery").length}</p>
    <p className="stat-label">Out for delivery</p>
  </div>
  <div className="stat-card">
    <p className="stat-number">{orders.filter(o => o.status === "Delivered").length}</p>
    <p className="stat-label">Delivered</p>
  </div>
</div>
      <div>
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <div className="order-item-info">
              <p className='order-item-number'>Order #{order._id.slice(-8).toUpperCase()}</p>
              <p className='order-item-date'>
                {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className='order-item-food'>
                {order.items.map((item, i) => (
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                ))}
              </p>
              <p className='order-item-name'>
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
             <div className="order-status-wrapper">
      <span className={`status-badge status-${order.status.replace(/\s+/g, '-').toLowerCase()}`}></span>
      <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
        <option value="Food Processing">Food Processing</option>
        <option value="Out for delivery">Out for delivery</option>
        <option value="Delivered">Delivered</option>
      </select>
    </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders