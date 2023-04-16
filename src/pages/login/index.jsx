import React, { useContext, useRef, useState } from "react"
import axios from "axios"
import "./index.scss"
import { apiHost } from "../../utils/config"
import { AuthContext } from "../../context/AuthContext"
import { Navigate } from "react-router-dom"
const Login = () => {
  const { state, dispatch } = useContext(AuthContext)
  const [error, setError] = useState(null)
  const idRef = useRef()
  const passwordRef = useRef()
  const handleLogin = async (e) => {
    e.preventDefault()
    const id = idRef.current?.value
    const password = passwordRef.current?.value
    try {
      const res = await axios.post(`${apiHost}/auth/login`, {
        id,
        password,
      })
      const { user, token } = res.data
      if (!user.isAdmin) {
        setError("Please login with admin account")
      } else
        dispatch({
          type: "login",
          payload: {
            token,
            user,
          },
        })
    } catch (error) {
      setError(error.response?.data.msg)
    }
  }

  return !state.isLoggedIn ? (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h1>eCampusApp</h1>
        {error && <p className="error">{error}</p>}
        <label>ID</label>
        <input ref={idRef} type="text" required />
        <label>Password</label>
        <input ref={passwordRef} type={"password"} required />
        <button>Log In</button>
      </form>
    </div>
  ) : (
    <Navigate to={"/"} />
  )
}

export default Login
