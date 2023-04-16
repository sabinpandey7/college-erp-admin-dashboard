import Sidebar from "./components/sidebar/Sidebar"
import { Navigate, Outlet } from "react-router-dom"
import "./app.scss"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"

function App() {
  const { state } = useContext(AuthContext)
  return state.isLoggedIn ? (
    <div className="app">
      <Sidebar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  )
}

export default App

