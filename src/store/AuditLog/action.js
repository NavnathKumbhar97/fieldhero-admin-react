import { GET_AUDIT_LOG } from "./actionTypes"

export const auditLogDetails = (data) => {
    return { type: GET_AUDIT_LOG, payload: data }
}
