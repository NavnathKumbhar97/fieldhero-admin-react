import { GET_AUDIT_LOG } from "./actionTypes"

const initialState = {
    data: 0,
}
const auditLog = (state = initialState , action) => {
    // console.log("initialState",initialState);
    console.log("state",state);
    switch (action.type) {
        case GET_AUDIT_LOG:
            state = {
                ...state,
                data: action.payload,
            }
            break
        default:
            state = { ...state }
            break
    }
    return state
}
export default auditLog
