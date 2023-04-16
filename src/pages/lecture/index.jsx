import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./index.scss"
import { useParams } from "react-router-dom"
import { useFetch } from "../../utils/customHooks"
const Lecture = () => {
  const { id } = useParams()
  const {
    state: { token },
  } = useContext(AuthContext)
  const { data } = useFetch(`lecture/${id}`, token)

  return (
    <div className="lecture">
      <div className="left">
        <div className="top">
          <span className="field">Subject</span>
          <span className="value">
            {data?.subject.title} ({data?.subject.code})
          </span>
          <span className="field">Teacher</span>
          <span className="value">{data?.teacher.name}</span>
          <span className="field">Branch</span>
          <span className="value">{data?.branch}</span>
          <span className="field">Sem</span>
          <span className="value">{data?.sem}</span>
          <span className="field">Session</span>
          <span className="value">{data?.session}</span>
        </div>
        <div className="bottom">
          <div className="left">
            <h4>Lectures</h4>
            <div className="list">
              {data?.Period.map((p) => {
                return (
                  <div key={p.id} className="item">
                    <span>{new Date(p.date).toDateString()}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="right">
            <h4>Assignments</h4>
            <div className="list">
              {data?.Assignment.map((item, index) => (
                <div className="item">
                  <span>Assignment {index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="members">
        <h4>Members</h4>
        <div className="list">
          {data &&
            data.Lecture_Students.map((member) => {
              return (
                <div key={member.user.id} className="item">
                  <img src="/images/user.webp"></img>
                  <div>
                    <span className="name">{member.user.name}</span>
                    <span className="id">{member.user.id}</span>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Lecture
