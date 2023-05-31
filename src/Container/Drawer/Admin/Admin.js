import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ExpandLess } from "@mui/icons-material";
import { Link } from "react-router-dom";
import helpers from "../../../helpers";

export default function Admin() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const localData = localStorage.getItem("user")
  let convertTokenToObj = JSON.parse(localData);

  const getAllPermission = convertTokenToObj.permissions


  // admin candidate upload batch array
const adminCandidateUBatchArray = [
  helpers.permissions.admin_candidate_upload_batch_change_pricing_template
  
]
const checkAdminCandidateUBatchArrayy = adminCandidateUBatchArray.filter((data) =>
  getAllPermission.includes(data)
)

  // admin batch priority array
  const adminBatchPriorityArray = [
    helpers.permissions.batch_priority_read_all
    
  ]
  const checkBatchPriorityArrayy = adminBatchPriorityArray.filter((data) =>
    getAllPermission.includes(data)
  )

  // admin other industry category array
  const adminOtherIndustryArray = [
    helpers.permissions.admin_other_industry_category_read_all
    
  ]
  const checkOtherIndustryArrayy = adminOtherIndustryArray.filter((data) =>
    getAllPermission.includes(data)
  )

  // admin user activity array
  const adminUserActivityArray = [
    helpers.permissions.admin_user_activity_read_all
    
  ]
  const checkUserActivityArrayy = adminUserActivityArray.filter((data) =>
    getAllPermission.includes(data)
  )

  // admin user login activity array
  const adminUserLoginActivityArray = [
    helpers.permissions.admin_user_activity_read_all
    
  ]
  const checkUserLoginActivityArrayy = adminUserLoginActivityArray.filter((data) =>
    getAllPermission.includes(data)
  )

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "brown" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {checkAdminCandidateUBatchArrayy.length || checkBatchPriorityArrayy.length || checkOtherIndustryArrayy.length
      || checkUserActivityArrayy.length || checkUserLoginActivityArrayy.length ?<ListItemButton onClick={handleClick}>
        <ListItemIcon style={{ color: "white" }}>
          <AdminPanelSettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Admin" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>:""}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List style={{ paddingLeft: "60px" }} component="div" disablePadding>
         {checkAdminCandidateUBatchArrayy.length? <ListItemButton component={Link} to={'candidate-upload-batch-admin'} sx={{ pl: 4 }}>
            <ListItemText primary="Candidate Upload Batch" />
          </ListItemButton>:""}
          {checkBatchPriorityArrayy.length?<ListItemButton component={Link} to={'batch-priority'} sx={{ pl: 4 }}>
            <ListItemText primary="Batch Priority" />
          </ListItemButton>:""}
          {checkOtherIndustryArrayy.length?<ListItemButton component={Link} to={'other-industry-category'} sx={{ pl: 4 }}>
            <ListItemText primary="Other Industry Category" />
          </ListItemButton>:""}
          {checkUserActivityArrayy.length?<ListItemButton component={Link} to={'admin-user-activity'} sx={{ pl: 4 }}>
            <ListItemText primary="User Activity"/>
          </ListItemButton>:""}
          {checkUserLoginActivityArrayy.length?<ListItemButton component={Link} to={'admin-user-login-activity'} sx={{ pl: 4 }}>
            <ListItemText primary="User Login Activity"/>
          </ListItemButton>:""}
        </List>
      </Collapse>
    </List>
  );
}
