// ! Pre-configured Axios Import
import axios from "../helpers/axios-handler"

// ! Fetch All Audit Log Section Wise
const fetchAllAuditLog = async (sectionId, dataId,headers) => {
    let auditLog = await axios
        .get(`/api/v1/${sectionId}/audit-log/${dataId}`,headers)
        .catch((ex) => console.error(ex.toJSON()))
    return auditLog.data
}

//! Create Audit Log Section Wise 
const addAuditLog = async (payload, sectionId, dataId,headers) => {
    let response = await axios
        .post(`/api/v1/${sectionId}/audit-log/${dataId}`, {
            userName: payload.userName,
            email: payload.email,
            contactNumber: payload.contactNumber,
            updatedFiled: payload.updatedFiled,
            operationName: payload.operationName,
            sectionNameId: payload.sectionId,
            sectionDataId: payload.dataId,
        },headers)
        .catch((ex) => console.error(ex.toJSON()))
    if (response != null) {
        if (response.status >= 200 && response.status < 300) return true
        else return false
    } else {
        return false
    }
}

// ! Fetch Single Audit Log By Id
const fetchAuditLogById = async (id,headers) => {
    let getAuditLog = await axios
        .get(`/api/v1/audit-log/${id}`,headers)
        .catch((ex) => console.error(ex.toJSON()))
    return getAuditLog.data
}

// ! Export All Functions
const auditLog = {
    fetchAllAuditLog,
    addAuditLog,
    fetchAuditLogById,
}
export { auditLog }
