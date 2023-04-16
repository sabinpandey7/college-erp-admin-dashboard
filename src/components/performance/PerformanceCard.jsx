import React, { useEffect, useState } from "react"
import "./card.scss"
import { useFetch } from "../../utils/customHooks"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const PerformanceCard = ({ lecture, userId }) => {
  const [assignmentPercentage, setAssignmentPercentage] = useState(0)
  const [attendencePercentage, setAttendencePercentage] = useState(0)

  const {
    state: { token },
  } = useContext(AuthContext)

  const { data: assignments } = useFetch(
    `user/${userId}/assignment?lecture=${lecture.id}`,
    token
  )
  const { data: attendences } = useFetch(
    `user/${userId}/attendence?lecture=${lecture.id}`,
    token
  )

  useEffect(() => {
    if (assignments) {
      if (assignments?.length != 0) {
        const doneAssignments = assignments.filter(
          (item) => item.status === true
        )
        setAssignmentPercentage(
          (doneAssignments.length / assignments.length) * 100
        )
      }
    }
  }, [assignments])

  useEffect(() => {
    if (attendences) {
      setAttendencePercentage(
        (attendences.attendended.length / attendences.total) * 100
      )
    }
  }, [attendences])

  return (
    <div className="performanceCard">
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Attendence</th>
            <th>Assignment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {lecture.subject.title} ({lecture.subject.code})
            </td>
            <td>{attendencePercentage} %</td>
            <td>{assignmentPercentage} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PerformanceCard
