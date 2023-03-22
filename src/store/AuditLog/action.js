import { GET_AUDIT_LOG } from "./actionTypes"

//extra body update action
export const auditLogDetails = (data,section) => {
    let auditData ={
        dataId:data,
        sectionId:section,

    }
    return { type: GET_AUDIT_LOG, payload: auditData }
}
