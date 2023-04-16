import React, { useContext } from "react"
import SummaryCard from "../../components/summary/SummaryCard"
import "./home.scss"
import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import StudentBar from "../../components/barcharts/StudentBar"
import { AuthContext } from "../../context/AuthContext"
import { useFetch } from "../../utils/customHooks"

const Home = () => {
  const { date, setDate } = useState(Date.now())

  const {
    state: { token },
  } = useContext(AuthContext)
  const { data } = useFetch(`user/summary`, token)

  return (
    <div className="home">
      <p className="heading">Welcome, Admin !!</p>
      <div className="headers">
        <SummaryCard text={"Teachers"} quantity={data?.teacher} />
        <SummaryCard
          text={"Students"}
          quantity={data?.totals - data?.teacher}
        />
        <SummaryCard text={"Total"} quantity={data?.totals} />
      </div>
      <div className="body">
        <div className="left">
          <p className="subtitle">Today</p>
          <Calendar className={"calendar"} value={date} />
        </div>
        <div className="right">
          <p className="subtitle">Students</p>
          <StudentBar data={data?.students} />
        </div>
      </div>
    </div>
  )
}

export default Home
