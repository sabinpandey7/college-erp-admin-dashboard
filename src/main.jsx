import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/home/Home"
import Students from "./pages/students/Students"
import Teachers from "./pages/teachers/Teachers"
import AddUser from "./pages/add_user"
import Profile from "./pages/Profile"
import Subject from "./pages/subjects"
import Lectures from "./pages/lectures"
import AddLecture from "./pages/add_lecture"
import Login from "./pages/login"
import { AuthContextProvider } from "./context/AuthContext"
import Lecture from "./pages/lecture"
import EditUser from "./pages/edit_user"
import Routines from "./pages/routines"
import AddRoutine from "./pages/add_routine"
import Routine from "./pages/routine"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "student",
        children: [
          {
            path: "",
            element: <Students />,
          },
        ],
      },
      {
        path: "teacher",
        element: <Teachers />,
      },
      {
        path: "add",
        element: <AddUser />,
      },
      {
        path: "subject",
        element: <Subject />,
      },
      {
        path: "profile",
        children: [
          {
            path: ":id",
            element: <Profile />,
          },
          {
            path: ":id/edit",
            element: <EditUser />,
          },
        ],
      },
      {
        path: "lecture",
        children: [
          {
            path: "",
            element: <Lectures />,
          },
          {
            path: "new",
            element: <AddLecture />,
          },
          {
            path: ":id",
            element: <Lecture />,
          },
        ],
      },
      {
        path: "routine",
        children: [
          {
            path: "",
            element: <Routines />,
          },
          {
            path: "new",
            element: <AddRoutine />,
          },
          {
            path: ":id",
            element: <Routine />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  </React.StrictMode>
)

