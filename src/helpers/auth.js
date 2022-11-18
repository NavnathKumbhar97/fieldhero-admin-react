// Custom Pre-configured axios method import.
import axios from "../axios"

// Fetch token from sessionStorage and set expire time.
export const getToken = () => {
    // Fetch data from sessionStorage
    let user = JSON.parse(sessionStorage.getItem("user"))
    if (!user) {
        let localStorageUser = JSON.parse(localStorage.getItem("user"))
        if (localStorageUser) {
            user = localStorageUser
            sessionStorage.setItem("user", JSON.stringify(user))
        } else {
            user = null
        }
    }
    // Check data is available or not
    if (user) {
        var currentDate = new Date()
        var expirationDate = user.expiresAt
        //Check expire date of token
        if (Date.parse(currentDate) < Date.parse(expirationDate)) {
            return user
        } else {
            sessionStorage.clear()
            return null
        }
    } else {
        //Clear sessionStorage if token did not found or user is unauthorized.
        sessionStorage.clear()
        return null
    }
}

// Set token/data for user.
const setToken = (user) => {
    let expryDate = new Date()

    //Set timer for 8 hour loggin sesssion.
    expryDate.setHours(expryDate.getHours() + 8)

    // Assign timer to the token so getToken() method can verify during authentication.
    Object.assign(user, { expiresAt: expryDate })

    //Store modified/created data into sessionStorage
    sessionStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("user", JSON.stringify(user))
}

// Clean Token
const clearToken = () => {
    sessionStorage.clear()
    localStorage.clear()
}

//* Main Method
export const auth = {
    // Check is user is authenticated or not
    isUserAuthenticated: () => {
        return getToken() !== null
    },

    // Standard Login Method which return token if user is authenticated else it return null
    login: async (email, password) => {
        let response = await axios
            .post("/api/v1/users/login", { email: email, password: password })
            .catch((err) => {
                return false
            })
        if (response.status >= 200 && response.status <= 300) {
            if (response.data.auth) {
                const _user = {
                    id: response.data.user.id,
                    userEmail: response.data.user.email,
                    name: response.data.user.name,
                    token: response.data.token,
                    permissions: response.data.user.permissions,
                    // user: response.data.user.userDetails.user,
                }
                setToken(_user)
                return _user
            }
            return false
        }
        return false
    },

    //* Validate method check is the given token is valid or not
    // validate: async () => {
    //     let response = await axios.get("/untpuc/validate").catch((err) => {
    //         console.error(err.response)
    //         return false
    //     })
    //     if (response.status >= 200 && response.status <= 300) {
    //         return response.data.auth ? true : false
    //     }
    // },

    // Logout Method
    logout: () => {
        clearToken()
    },
}
