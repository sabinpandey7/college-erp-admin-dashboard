import React, { useContext, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { useFetch } from "../../utils/customHooks"
import "./teachers.scss"
import { AuthContext } from "../../context/AuthContext"

const Teachers = () => {
  const nameRef = useRef()
  const [uri, setUri] = useState("user?role=TEACHER")

  const {
    state: { token },
  } = useContext(AuthContext)

  const handleSearchByName = () => {
    if (nameRef.current?.value != "") {
      setUri(`user?role=TEACHER&name=${nameRef.current.value}`)
    }
  }
  const { data } = useFetch(uri, token)

  return (
    <div className="teacher">
      <div className="headers">
        <div className="search">
          <div className="field">
            <input
              ref={nameRef}
              type={"text"}
              placeholder="Search By Name"></input>
          </div>
          <div className="field">
            <button onClick={handleSearchByName}>Search</button>
          </div>
        </div>
        <NavLink to={"/add"}>
          <button>Add New Teacher</button>
        </NavLink>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.branch}</td>
                <td>{item.department}</td>
                <td>
                  <NavLink to={`/profile/${item.id}`}>
                    <button>See Profile</button>
                  </NavLink>{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Teachers
