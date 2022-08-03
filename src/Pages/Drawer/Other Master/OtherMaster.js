import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export default function OtherMaster() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'brown' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
    >
      <ListItemButton onClick={handleClick}>
      <ListItemIcon style={{ color: "white" }}>
                <ArrowDropDownCircleIcon />
              </ListItemIcon>
        <ListItemText  primary="Other Master"/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List style={{paddingLeft:"60px"}} component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Category" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Company" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Customer" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Industry" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Role" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Skill Set" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Subscription" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="User" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
