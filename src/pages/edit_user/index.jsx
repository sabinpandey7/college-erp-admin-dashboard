import React, { useRef, useState } from "react"
import "./edit_user.scss"
import axios from "axios"
import { apiHost } from "../../utils/config"
import { useNavigate, useParams } from "react-router-dom"
import { useFetch } from "../../utils/customHooks"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const EditUser = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const {
    state: { token },
  } = useContext(AuthContext)
  const { data } = useFetch(`user/${id}`, token)

  const nameRef = useRef()
  const departmentRef = useRef()
  const branchRef = useRef()
  const batchRef = useRef()
  const roleRef = useRef()
  const nationalityRef = useRef()
  const fatherRef = useRef()
  const addressRef = useRef()
  const navigate = useNavigate()

  const handleSave = async (e) => {
    e.preventDefault()
    const name = nameRef.current.value
    const department = departmentRef.current.value
    const branch = branchRef.current.value
    const batch = batchRef.current.value
    const role = roleRef.current.value
    const nationality = nationalityRef.current.value
    const father = fatherRef.current.value
    const address = addressRef.current.value
    try {
      await axios.patch(
        `${apiHost}/user/${id}`,
        {
          name: name,
          department: department,
          branch: branch,
          batch: Number.parseInt(batch),
          role: role,
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
      navigate(`/profile/${id}`)
    } catch (error) {
      setError(error.response?.data.msg)
    }
  }

  return (
    <form className="editUser" onSubmit={handleSave}>
      <h2>Edit Details</h2>
      {error && <p className="error">{error}</p>}
      {data && (
        <>
          <div className="left">
            <div className="row">
              <span className="field">ID NO</span>
              <input
                disabled
                required
                type={"number"}
                className="value"
                defaultValue={data?.id}
              />
            </div>
            <div className="row">
              <span className="field">Name</span>
              <input
                required
                ref={nameRef}
                type={"text"}
                className="value"
                defaultValue={data?.name}
              />
            </div>
            <div className="row">
              <span className="field">Department</span>
              <input
                required
                ref={departmentRef}
                type={"text"}
                className="value"
                defaultValue={data?.department}
              />
            </div>
            <div className="row">
              <span className="field">Branch</span>
              <select required ref={branchRef} defaultValue={data?.branch}>
                <option value={"CSE"}>CSE</option>
                <option value={"ME"}>ME</option>
                <option value={"ECE"}>ECE</option>
                <option value={"EEE"}>EEE</option>
                <option value={"CIVIL"}>CIVIL</option>
              </select>
            </div>
            <div className="row">
              <span className="field">Batch(Not required for teacher)</span>
              <input
                defaultValue={data?.batch}
                ref={batchRef}
                type={"number"}
                className="value"
              />
            </div>

            <div className="row">
              <span className="field">Father's Name</span>
              <input
                defaultValue={data?.father}
                required
                ref={fatherRef}
                type={"text"}
                className="value"
              />
            </div>
            <div className="row">
              <span className="field">Address</span>
              <input
                defaultValue={data?.address}
                required
                ref={addressRef}
                type={"text"}
                className="value"
              />
            </div>
            <div className="row">
              <span className="field">Nationality</span>
              <select
                defaultValue={data?.nationality}
                required
                ref={nationalityRef}>
                <option value={"INDIAN"}>INDIAN</option>
                <option value={"INTERNATIONAL"}>INTERNATIONAL</option>
              </select>
            </div>
            <div className="row">
              <span className="field">Role</span>
              <select defaultValue={data?.roles} required ref={roleRef}>
                <option value={"STUDENT"}>STUDENT</option>
                <option value={"TEACHER"}>TEACHER</option>
              </select>
            </div>
          </div>
          <button type="submit">Save</button>
        </>
      )}
    </form>
  )
}

export default EditUser
