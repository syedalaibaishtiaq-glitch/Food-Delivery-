import React, { useContext, useEffect } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const MyOrders = () => {
  const { url, token } = useContext(StoreContext)
  const [orders, setOrders] = React.useState([])

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
    setOrders(response.data.data)
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {orders.map((order, index) => {
          return (
            <div key={index} className='my-orders-order'>
              <div className="my-orders-order-top">
                <div>
                  <p className='my-orders-order-number'>Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className='my-orders-order-date'>
                    Placed on {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <p className='my-orders-order-amount'>${order.amount}.00</p>
              </div>

              <p className='my-orders-order-items'>
                {order.items.map((item, i) => (
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                ))}
              </p>

              <p className='my-orders-status'>
                <span className='status-dot'></span> {order.status}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders