import axios from "axios"
import React, { useState } from "react"
import SearchDropDown from "../../components/search_dropdown"
import { apiHost } from "../../utils/config"
import "./add_lecture.scss"
import { Navigate, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const AddLecture = () => {
  const [teacher, setTeacher] = useState()
  const [subject, setSubject] = useState()
  const [branch, setBranch] = useState("CSE")
  const [sem, setSem] = useState(1)
  const [session, setSession] = useState(2019)
  const navigate = useNavigate()

  const {
    state: { token },
  } = useContext(AuthContext)

  const handleCreate = async (e) => {
    e.preventDefault()
    if (teacher && subject && branch && sem && session) {
      try {
        await axios.post(
          `${apiHost}/lecture`,
          {
            teacher_id: teacher,
            subject_id: subject,
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
        navigate("/lecture")
      } catch (error) {
        console.log(error.response?.data)
      }
    }
  }

  return (
    <div className="add_lecture">
      <h3>Create New Lecture</h3>
      <form onSubmit={handleCreate}>
        <div className="field">
          <span>Teacher :</span>
          <div className="select">
            <SearchDropDown setValue={setTeacher} uri={"user?role=TEACHER"} />
          </div>
        </div>
        <div className="field">
          <span>Subject :</span>
          <div className="select">
            <SearchDropDown setValue={setSubject} uri={"subject?"} />
          </div>
        </div>
        <div className="field">
          <span>Branch :</span>
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value={"CSE"}>CSE</option>
            <option value={"ME"}>ME</option>
            <option value={"ECE"}>CSE</option>
            <option value={"EEE"}>EEE</option>
            <option value={"CIVIL"}>CIVIL</option>
          </select>
        </div>
        <div className="field">
          <span>Sem :</span>
          <input
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
            value={session}
            onChange={(e) => setSession(Number.parseInt(e.target.value))}
            type={"number"}
            min={2019}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AddLecture
