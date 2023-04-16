import { createContext, useEffect, useReducer } from "react"
import { reducer } from "./AuthReducer"

const intialState = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
}

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  useEffect(() => {
    if (state.isLoggedIn) {
      localStorage.setItem("token", state.token)
      localStorage.setItem("user", JSON.stringify(state.user))
    } else {
      localStorage.clear()
    }
  }, [state])

  return (
    <AuthContext.Provider value={{ state: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
