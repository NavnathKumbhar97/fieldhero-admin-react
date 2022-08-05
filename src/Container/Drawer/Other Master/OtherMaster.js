import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

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
          <ListItemButton sx={{ pl: 4 }} component={Link} to={'category'}>
            <ListItemText primary="Category" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to={'company'}>
            <ListItemText primary="Company" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}  component={Link} to={'customer'}>
            <ListItemText primary="Customer"/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to={'industry'}>
            <ListItemText primary="Industry" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to={'role'}>
            <ListItemText primary="Role" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to={'skillset'}>
            <ListItemText primary="Skill Set" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to={'subscription'}>
            <ListItemText primary="Subscription" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to={'user'}>
            <ListItemText primary="User" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
