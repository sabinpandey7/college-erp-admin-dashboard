import React, { useContext, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import { useFetch } from "../../utils/customHooks"
import "./student.scss"
import { AuthContext } from "../../context/AuthContext"
const Students = () => {
  const [batch, setBatch] = useState(2000)
  const [branch, setBranch] = useState("CSE")
  const [uri, setUri] = useState("user?role=STUDENT")
  const {
    state: { token },
  } = useContext(AuthContext)
  const nameRef = useRef()
  const idRef = useRef()

  const { data, setReload } = useFetch(uri, token)

  const handleFilter = () => {
    setUri(`user?role=STUDENT&branch=${branch}&batch=${batch}`)
  }

  const handleSearchByName = () => {
    if (nameRef.current?.value != "") {
      setUri(`user?role=STUDENT&name=${nameRef.current.value}`)
    }
  }
  const handleSearchById = () => {
    if (idRef.current?.value != "") {
      setUri(`user?id=${idRef.current.value}`)
    }
  }

  return (
    <div className="student">
      <div className="headers">
        <div className="filter">
          <div className="field">
            <span>Batch</span>
            <input
              defaultValue={2000}
              type={"number"}
              className="fieldInput"
              onChange={(e) =>
                setBatch(Number.parseInt(e.target.value))
              }></input>
          </div>
          <div className="field">
            <span>Branch</span>
            <select onChange={(e) => setBranch(e.target.value)}>
              <option value={"CSE"}>CSE</option>
              <option value={"ME"}>ME</option>
              <option value={"ECE"}>CSE</option>
              <option value={"EEE"}>EEE</option>
              <option value={"CIVIL"}>CIVIL</option>
            </select>
          </div>
          <div className="field">
            <button onClick={handleFilter}>Filter</button>
          </div>
        </div>
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
        <div className="search">
          <div className="field">
            <input ref={idRef} type="number" placeholder="Search By ID"></input>
          </div>
          <div className="field">
            <button onClick={handleSearchById}>Search</button>
          </div>
        </div>
      </div>
      <NavLink to={"/add"}>
        <button>Add New Student</button>
      </NavLink>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Department</th>
            <th>Batch</th>
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
                <td>{item.batch}</td>
                <td>
                  <NavLink to={`/profile/${item.id}`}>
                    <button>See Profile</button>
                  </NavLink>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Students
