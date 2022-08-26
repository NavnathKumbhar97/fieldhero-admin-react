import { LOGIN_SUCCESS } from "./actionTypes"
let user = sessionStorage.getItem("user")
if (!user) {
    let localStorageUser = localStorage.getItem("user")
    if (localStorageUser) {
        user = localStorageUser
    } else {
        user = null
    }
}
const initialState = {
    user: user ? JSON.parse(user) : null,
}
const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            state = {
                user: action.payload,
            }
            break
        default:
            state = { ...state }
            break
    }
    return state
}
export default login
