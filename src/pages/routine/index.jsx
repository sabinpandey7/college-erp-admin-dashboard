import React, { useEffect, useState } from "react"
import "./routine.scss"
import Search_dropdown from "../../components/search_dropdown"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/customHooks"
import axios from "axios"
import { apiHost } from "../../utils/config"
import { CiCircleRemove } from "react-icons/ci"
const Routine = () => {
  const [inserting, setInserting] = useState(false)
  const [teacher, setTeacher] = useState(null)
  const [subject, setSubject] = useState(null)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [routines, setRoutines] = useState({})
  const [day, setDay] = useState("MON")

  const { id } = useParams()
  const {
    state: { token },
  } = useContext(AuthContext)
  const { data } = useFetch(`routine/${id}`, token)
  const { data: schedules, setReload } = useFetch(
    `routine/${id}/schedule`,
    token
  )

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"]

  useEffect(() => {
    const groupByDays = schedules
      ? schedules.reduce((acc, curr) => {
          acc[curr["day"]] = acc[curr["day"]] || []
          acc[curr["day"]].push(curr)
          return acc
        }, {})
      : {}
    setRoutines(groupByDays)
  }, [schedules])

  const handleInsert = async () => {
    setInserting(true)
    if (subject && startTime && endTime && day) {
      try {
        await axios.post(
          `${apiHost}/routine/${id}/schedule`,
          {
            subject,
            teacher,
            day,
            start_time: startTime,
            end_time: endTime,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setReload((p) => !p)
      } catch (error) {
        console.log(error.response?.data)
      }
      setInserting(false)
    }
  }
  const handleDelete = async (deleteId) => {
    try {
      await axios.delete(`${apiHost}/routine/${id}/schedule`, {
        data: {
          schedule_id: deleteId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setReload((p) => !p)
    } catch (error) {
      console.log(error.response?.data)
    }
  }
  return (
    <div className="routine">
      <div className="header">
        <span className="field">Branch:</span>
        <span className="value">{data?.branch}</span>
        <span className="field">Session:</span>
        <span className="value">{data?.session}</span>
        <span className="field">For Batch:</span>
        <span className="value">{data?.batch}</span>
        <span className="field">Sem:</span>
        <span className="value">{data?.sem}</span>
      </div>
      <form>
        <div className="field">
          <label>Teacher :</label>
          <div className="select">
            <Search_dropdown setValue={setTeacher} uri={"user?role=TEACHER"} />
          </div>
        </div>
        <div className="field">
          <label>Subject :</label>
          <div className="select">
            <Search_dropdown setValue={setSubject} uri={"subject?"} />
          </div>
        </div>
        <div className="field">
          <label>Start Time :</label>
          <input
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            type="time"></input>
        </div>
        <div className="field">
          <label>End Time :</label>
          <input
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            type="time"></input>
        </div>
        <div className="field">
          <label>Day :</label>
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value={"MON"}>MON</option>
            <option value={"TUE"}>TUE</option>
            <option value={"WED"}>WED</option>
            <option value={"THU"}>THU</option>
            <option value={"FRI"}>FRI</option>
            <option value={"SAT"}>SAT</option>
          </select>
        </div>
        <button disabled={inserting} onClick={handleInsert}>
          Insert
        </button>
      </form>
      <div className="timeTables">
        {routines &&
          days.map((key) => {
            return (
              <table key={key}>
                <thead>
                  <tr>
                    <th>{key}</th>
                  </tr>
                </thead>
                <tbody>
                  {routines[key]?.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <p>{item.subject.title}</p>
                        <p>{item.teacher?.name}</p>
                        <p>
                          {new Date(item.start_time).toLocaleTimeString()} -{" "}
                          {new Date(item.end_time).toLocaleTimeString()}
                        </p>
                        <CiCircleRemove
                          onClick={() => handleDelete(item.id)}
                          className="icon"
                          size={"20px"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          })}
      </div>
    </div>
  )
}

export default Routine
