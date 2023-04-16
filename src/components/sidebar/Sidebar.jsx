import React, { useContext } from "react"
import "./sidebar.scss"
import { NavLink } from "react-router-dom"
import { RxDashboard, RxExit } from "react-icons/rx"
import { AuthContext } from "../../context/AuthContext"

const Sidebar = () => {
  const { dispatch } = useContext(AuthContext)
  return (
    <div className="sidebar">
      <div className="logo">eCampusApp</div>
      <NavLink className="menu" to={"/"}>
        <RxDashboard className="icon" />
        <span className="menuText">Dashboard</span>
      </NavLink>
      <NavLink className="menu" to="/lecture">
        <RxDashboard className="icon" />
        <span className="menuText">Lectures</span>
      </NavLink>
      <NavLink to={"/routine"} className="menu">
        <RxDashboard className="icon" />
        <span className="menuText">Routine</span>
      </NavLink>
      <NavLink className="menu" to={"/student"}>
        <RxDashboard className="icon" />
        <span className="menuText">Students</span>
      </NavLink>
      <NavLink to={"/teacher"} className="menu">
        <RxDashboard className="icon" />
        <span className="menuText">Teachers</span>
      </NavLink>
      <NavLink to={"/subject"} className="menu">
        <RxDashboard className="icon" />
        <span className="menuText">Subjects</span>
      </NavLink>
      <div className="menu" onClick={() => dispatch({ type: "logout" })}>
        <RxExit className="icon" />
        <span className="menuText">Logout</span>
      </div>
    </div>
  )
}

export default Sidebar
