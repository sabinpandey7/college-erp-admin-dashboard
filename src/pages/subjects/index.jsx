import axios from "axios"
import React, { useContext, useRef, useState } from "react"
import { apiHost } from "../../utils/config"
import { useFetch } from "../../utils/customHooks"
import "./subjects.scss"
import { AuthContext } from "../../context/AuthContext"
const Subject = () => {
  const [deleteId, setDeleteId] = useState(null)
  const coderef = useRef()
  const titleref = useRef()
  const [uri, setUri] = useState("subject")
  const nameRef = useRef()

  const {
    state: { token },
  } = useContext(AuthContext)
  const { data, setReload } = useFetch(uri, token)

  const handleSearchByName = () => {
    if (nameRef.current?.value != "") {
      setUri(`subject?name=${nameRef.current.value}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const code = coderef.current?.value
    const title = titleref.current?.value
    try {
      await axios.post(
        `${apiHost}/subject`,
        {
          code: code,
          title: title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setReload((p) => !p)
      coderef.current.value = ""
      titleref.current.value = ""
    } catch (error) {
      console.log(error.response?.data)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await axios.delete(`${apiHost}/subject/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setDeleteId(null)
      setReload((p) => !p)
    } catch (error) {
      console.log(error.response?.data)
    }
  }

  return (
    <div className="subject">
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
        <form onSubmit={handleSubmit}>
          <span>Subject's Code</span>
          <input ref={coderef} required type="text" />
          <span>Subject's Title</span>
          <input ref={titleref} required type="text" />
          <button type="submit">Add New Subject</button>
        </form>
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
      </div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.code}</td>
                <td>{item.title}</td>
                <td>
                  <button onClick={() => setDeleteId(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Subject
