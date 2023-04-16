export const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        isLoggedIn: true,
        ...action.payload,
      }
    case "logout":
      return {
        isLoggedIn: false,
        token: null,
        user: null,
      }
    default:
      return {
        ...state,
      }
  }
}
