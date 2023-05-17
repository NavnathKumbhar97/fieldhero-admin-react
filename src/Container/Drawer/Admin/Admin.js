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

export default function Admin() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "brown" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon style={{ color: "white" }}>
          <AdminPanelSettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Admin" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List style={{ paddingLeft: "60px" }} component="div" disablePadding>
          <ListItemButton component={Link} to={'candidate-upload-batch-admin'} sx={{ pl: 4 }}>
            <ListItemText primary="Candidate Upload Batch" />
          </ListItemButton>
          <ListItemButton component={Link} to={'batch-priority'} sx={{ pl: 4 }}>
            <ListItemText primary="Batch Priority" />
          </ListItemButton>
          <ListItemButton component={Link} to={'other-industry-category'} sx={{ pl: 4 }}>
            <ListItemText primary="Other Industry Category" />
          </ListItemButton>
          <ListItemButton component={Link} to={'admin-user-activity'} sx={{ pl: 4 }}>
            <ListItemText primary="User Activity"/>
          </ListItemButton>
          <ListItemButton component={Link} to={'admin-user-login-activity'} sx={{ pl: 4 }}>
            <ListItemText primary="User Login Activity"/>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
