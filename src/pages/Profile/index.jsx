import React, { useContext, useState } from "react"
import "./profile.scss"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useFetch } from "../../utils/customHooks"
import PerformanceCard from "../../components/performance/PerformanceCard"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { apiHost } from "../../utils/config"
import { Navigate } from "react-router-dom"

const Profile = () => {
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [openResetModal, setOpenResetModal] = useState(false)
  const navigate = useNavigate()

  const {
    state: { token },
  } = useContext(AuthContext)

  const { data } = useFetch(`user/${id}`, token)

  const { data: lectures } = useFetch(
    `lecture/?admin=admin&student=${id}`,
    token
  )
  const handleDelete = async () => {
    try {
      axios.delete(`${apiHost}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setOpen(false)
      navigate("/", {
        replace: true,
      })
    } catch (error) {
      setOpen(false)
      console.log(error)
    }
  }
  const resetPassword = async () => {
    try {
      axios.post(
        `${apiHost}/user/${id}/changepassword`,
        {
          password: "maya123",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert("Password Changed")
    } catch (error) {
      alert("Something went wrong")
      console.log(error)
    } finally {
      setOpenResetModal(false)
    }
  }

  return (
    <div className="profile">
      {open && (
        <div className="modal">
          <div className="centerModal">
            <h2>Are you sure want to delete?</h2>
            <p>
              Note: All the data related to user will be deleted ! It can't be
              recoverd again!
            </p>
            <button className="yesBtn" onClick={handleDelete}>
              Yes
            </button>
            <button onClick={() => setOpen(false)} className="noBtn">
              No
            </button>
          </div>
        </div>
      )}
      {openResetModal && (
        <div className="modal">
          <div className="centerModal">
            <h2>Are you sure want to reset Password?</h2>
            <button className="yesBtn" onClick={resetPassword}>
              Yes
            </button>
            <button onClick={() => setOpenResetModal(false)} className="noBtn">
              No
            </button>
          </div>
        </div>
      )}
      {data && (
        <div className="personal-details">
          <div className="left">
            <img src="/images/user.webp" />
            <div>
              <Link to={`edit`}>
                <button className="editBtn">Edit</button>
              </Link>
              <button onClick={() => setOpen(true)} className="deleteBtn">
                Delete
              </button>
              <button
                onClick={() => setOpenResetModal(true)}
                className="resetBtn">
                Reset Password
              </button>
            </div>
          </div>
          <div className="right">
            <span className="field">ID</span>
            <span className="value">{data.id}</span>
            <span className="field">Name</span>
            <span className="value">{data.name}</span>
            <span className="field">Branch</span>
            <span className="value">{data.branch}</span>
            <span className="field">Batch</span>
            <span className="value">{data.batch}</span>
            <span className="field">Department</span>
            <span className="value">{data.department}</span>
            <span className="field">Role</span>
            <span className="value">{data.role}</span>
            <span className="field">Father's Name</span>
            <span className="value">{data.father}</span>
            <span className="field">Address </span>
            <span className="value">{data.address}</span>
            <span className="field">Nationality</span>
            <span className="value">{data.nationality}</span>
          </div>
        </div>
      )}
      {data?.role === "STUDENT" && (
        <div className="performances">
          <h3>Performance History</h3>
          {lectures &&
            lectures.map((lecture) => {
              return (
                <PerformanceCard
                  key={lecture.id}
                  lecture={lecture}
                  userId={id}
                />
              )
            })}
        </div>
      )}
    </div>
  )
}

export default Profile
