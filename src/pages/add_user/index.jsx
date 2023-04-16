import React, { useContext, useRef, useState } from "react"
import "./add_user.scss"
import axios from "axios"
import { apiHost } from "../../utils/config"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const idRef = useRef()
  const nameRef = useRef()
  const departmentRef = useRef()
  const branchRef = useRef()
  const batchRef = useRef()
  const roleRef = useRef()
  const passwordRef = useRef()
  const nationalityRef = useRef()
  const fatherRef = useRef()
  const addressRef = useRef()
  const navigate = useNavigate()

  const {
    state: { token },
  } = useContext(AuthContext)

  const handleCreate = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const name = nameRef.current.value
    const id = idRef.current.value
    const department = departmentRef.current.value
    const branch = branchRef.current.value
    const batch = batchRef.current.value
    const role = roleRef.current.value
    const password = passwordRef.current.value
    const nationality = nationalityRef.current.value
    const father = fatherRef.current.value
    const address = addressRef.current.value
    try {
      await axios.post(
        `${apiHost}/auth/register`,
        {
          id: Number.parseInt(id),
          name: name,
          department: department,
          branch: branch,
          batch: Number.parseInt(batch),
          role: role,
          password: password,
          nationality: nationality,
          father: father,
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setError(null)
      navigate(`/profile/${id}`)
    } catch (error) {
      setError(error.response?.data.msg)
    }
    setIsLoading(false)
  }

  return (
    <form className="addUser" onSubmit={handleCreate}>
      <h2>Fill all details</h2>
      {error && <p className="error">{error}</p>}
      <div className="left">
        <div className="row">
          <span className="field">ID NO</span>
          <input required ref={idRef} type={"number"} className="value" />
        </div>
        <div className="row">
          <span className="field">Name</span>
          <input required ref={nameRef} type={"text"} className="value" />
        </div>
        <div className="row">
          <span className="field">Department</span>
          <input required ref={departmentRef} type={"text"} className="value" />
        </div>
        <div className="row">
          <span className="field">Branch</span>
          <select required ref={branchRef}>
            <option value={"CSE"}>CSE</option>
            <option value={"ME"}>ME</option>
            <option value={"ECE"}>CSE</option>
            <option value={"EEE"}>EEE</option>
            <option value={"CIVIL"}>CIVIL</option>
          </select>
        </div>
        <div className="row">
          <span className="field">Batch(Not required for teacher)</span>
          <input ref={batchRef} type={"number"} className="value" />
        </div>
        <div className="row">
          <span className="field">Password</span>
          <input
            required
            ref={passwordRef}
            type={"password"}
            className="value"
          />
        </div>
        <div className="row">
          <span className="field">Father's Name</span>
          <input required ref={fatherRef} type={"text"} className="value" />
        </div>
        <div className="row">
          <span className="field">Address</span>
          <input required ref={addressRef} type={"text"} className="value" />
        </div>
        <div className="row">
          <span className="field">Nationality</span>
          <select required ref={nationalityRef}>
            <option value={"INDIAN"}>INDIAN</option>
            <option value={"INTERNATIONAL"}>INTERNATIONAL</option>
          </select>
        </div>
        <div className="row">
          <span className="field">Role</span>
          <select required ref={roleRef}>
            <option value={"STUDENT"}>STUDENT</option>
            <option value={"TEACHER"}>TEACHER</option>
          </select>
        </div>
      </div>
      <button type="submit" disabled={isLoading}>
        Save
      </button>
    </form>
  )
}

export default AddUser
