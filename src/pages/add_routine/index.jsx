import axios from "axios"
import React, { useContext, useRef, useState } from "react"
import SearchDropDown from "../../components/search_dropdown"
import { apiHost } from "../../utils/config"
import "./add_routine.scss"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const AddRoutine = () => {
  const [error, setError] = useState(null)
  const [branch, setBranch] = useState("CSE")
  const [sem, setSem] = useState(1)
  const [session, setSession] = useState(2023)
  const [batch, setBatch] = useState(2019)
  const {
    state: { token },
  } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleCreate = async (e) => {
    e.preventDefault()
    if (sem && batch && branch && sem && session) {
      try {
        await axios.post(
          `${apiHost}/routine`,
          {
            batch,
            branch,
            sem,
            session,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        navigate("/routine")
      } catch (error) {
        setError(error.response?.data?.msg)
      }
    }
  }

  return (
    <div className="add_routine">
      <h3>Create New Routine</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleCreate}>
        <div className="field">
          <span>Branch :</span>
          <select
            required
            value={branch}
            onChange={(e) => setBranch(e.target.value)}>
            <option value={"CSE"}>CSE</option>
            <option value={"ME"}>ME</option>
            <option value={"ECE"}>ECE</option>
            <option value={"EEE"}>EEE</option>
            <option value={"CIVIL"}>CIVIL</option>
          </select>
        </div>
        <div className="field">
          <span>Sem :</span>
          <input
            required
            type={"number"}
            onChange={(e) => setSem(Number.parseInt(e.target.value))}
            value={sem}
            max={8}
            min={1}
          />
        </div>
        <div className="field">
          <span>Session :</span>
          <input
            required
            value={session}
            onChange={(e) => setSession(Number.parseInt(e.target.value))}
            type={"number"}
            min={2019}
          />
        </div>
        <div className="field">
          <span>For Batch :</span>
          <input
            required
            value={batch}
            onChange={(e) => setBatch(Number.parseInt(e.target.value))}
            type={"number"}
            min={2010}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AddRoutine
