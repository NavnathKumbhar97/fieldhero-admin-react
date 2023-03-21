import { combineReducers } from "redux";
import auditLog from "./AuditLog/reducer";
import Login from "./Login/reducer";
const rootReducer = combineReducers({ Login,auditLog });
export default rootReducer;