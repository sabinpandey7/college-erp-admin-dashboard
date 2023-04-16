import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const StudentBar = ({ data }) => {
  console.log(data)
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <XAxis dataKey="batch">
          <Label value={"Batch"} position="bottom" />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" />
        <Bar dataKey="total" fill="#8884d8" />
        <Bar dataKey="indian" fill="#82ca9d" />
        <Bar dataKey="international" fill="#82caff" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default StudentBar
