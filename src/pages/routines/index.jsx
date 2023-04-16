import React, { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import "./routines.scss"
import { AuthContext } from "../../context/AuthContext"
import { useFetch } from "../../utils/customHooks"
import axios from "axios"
import { apiHost } from "../../utils/config"

const Routines = () => {
  const [deleteId, setDeleteId] = useState(null)

  const {
    state: { token },
  } = useContext(AuthContext)
  const { data, setReload } = useFetch("routine", token)

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiHost}/routine/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setReload((p) => !p)
    } catch (error) {
      console.log(error)
    }
    setDeleteId(null)
  }

  return (
    <div className="routines">
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
        <NavLink to={"new"}>
          <button>Add Routine</button>
        </NavLink>
      </div>
      <table>
        <thead>
          <tr>
            <th>Branch</th>
            <th>Session</th>
            <th>Sem</th>
            <th>Batch</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.branch}</td>
                <td>{item.session}</td>
                <td>{item.sem}</td>
                <td>{item.batch}</td>
                <td>
                  <NavLink to={`/routine/${item.id}`}>
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

export default Routines
