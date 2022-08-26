import axios from '../axios'
// ! Helper Method Import For Status Code Re-usability
import helper from "../helpers"

// ! Status Code De-structured
const {
    Created,
    OK,
    Bad_Request,
} = helper.utility.HTTP_Status_Codes

// ! Login Funtionality For User Section.
const login = async ({ email, password }) => {
    try {
        const response = await axios.post("/api/v1/users/login", {
            email,
            password,
        })
        if (response.status === OK) {
            const { token, user } = response.data
            const _user = {
                ...user,
                token,
                auth: true,
            }
            localStorage.setItem("user", JSON.stringify(_user))
            return { status: true }
        }
    } catch (error) {
        if (error.response.status === Bad_Request) {
            return {
                status: false,
                msg: error.response.data.message,
            }
        } else {
            return false
        }
    }
}

export default {
    login
}