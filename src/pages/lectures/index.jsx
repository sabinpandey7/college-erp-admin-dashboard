import React, { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { useFetch } from "../../utils/customHooks"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { apiHost } from "../../utils/config"
import "./lectures.scss"

const Lectures = () => {
  const [deleteId, setDeleteId] = useState(null)
  const [session, setSession] = useState(2019)
  const [branch, setBranch] = useState("CSE")
  const [sem, setSem] = useState(1)
  const [uri, setUri] = useState("lecture/?admin=admin")

  const {
    state: { token },
  } = useContext(AuthContext)

  const { data, setReload } = useFetch(uri, token)

  const handleFilter = () => {
    setUri(
      `lecture?admin=admin&sem=${sem}&branch=${branch}&session=${session}&admin=admin`
    )
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await axios.delete(`${apiHost}/lecture/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setDeleteId(null)
      setReload((p) => !p)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="lectures">
      {deleteId && (
        <div className="modal">
          <div className="centerModal">
            <h2>Are you sure want to delete?</h2>
            <button className="yesBtn" onClick={handleDelete}>
              Yes
            </button>
            <button onClick={() => setDeleteId(null)} className="noBtn">
              No
            </button>
          </div>
        </div>
      )}
      <div className="headers">
        <div className="filter">
          <div className="field">
            <span>Session</span>
            <input
              value={session}
              min={2019}
              type={"number"}
              className="fieldInput"
              onChange={(e) =>
                setSession(Number.parseInt(e.target.value))
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
            <span>Sem</span>
            <input
              onChange={(e) => setSem(e.target.value)}
              type={"number"}
              defaultValue={1}
              max={8}
              min={1}
            />
          </div>
          <div className="field">
            <button onClick={handleFilter}>Filter</button>
          </div>
        </div>
        <NavLink to={"new"}>
          <button>Add Lecture</button>
        </NavLink>
      </div>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Session</th>
            <th>Branch</th>
            <th>Sem</th>
            <th>Teacher</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.subject.title}({item.subject.code})
                </td>
                <td>{item.session}</td>
                <td>{item.branch}</td>
                <td>{item.sem}</td>
                <td>{item.teacher.name}</td>
                <td>
                  <NavLink to={`/lecture/${item.id}`}>
                    <button>See Details</button>
                  </NavLink>
                  <button
                    className="deleteBtn"
                    onClick={() => setDeleteId(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Lectures
