import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const GoogleSuccess = () => {
  const { setToken, loadCartData } = useContext(StoreContext)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get("token")
    async function completeLogin() {
      if (token) {
        setToken(token)
        localStorage.setItem("token", token)
        await loadCartData(token)
      }
      navigate("/")
    }
    completeLogin()
  }, [])

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <p>Signing you in...</p>
    </div>
  )
}

export default GoogleSuccess