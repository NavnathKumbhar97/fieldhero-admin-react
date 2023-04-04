import { GET_AUDIT_LOG } from "./actionTypes"

const initialState = {
    dataId: 0,
    sectionId:0
}

const auditLog = (state = initialState , action) => {

    switch (action.type) {
        case GET_AUDIT_LOG:
            state = {
                ...state,
                dataId: action.payload.dataId,
                sectionId:action.payload.sectionId
            }
            break
        default:
            state = { ...state }
            break
    }
    return state
}
export default auditLog
