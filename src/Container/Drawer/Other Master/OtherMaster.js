import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import helpers from '../../../helpers';

export default function OtherMaster() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const localData = localStorage.getItem("user")
  let convertTokenToObj = JSON.parse(localData);

  const getAllPermission = convertTokenToObj.permissions

   // category array
   const otherMasterCategoryArray = [
    helpers.permissions.category_read_all
    
  ]
  const checkOtherMasterCategoryArrayy = otherMasterCategoryArray.filter((data) =>
    getAllPermission.includes(data)
  )

   // company array
   const otherMasterCompanyArray = [
    helpers.permissions.company_read_all
    
  ]
  const checkOtherMasterCompanyArrayy = otherMasterCompanyArray.filter((data) =>
    getAllPermission.includes(data)
  )
   // industry array
   const otherMasterIndustryArray = [
    helpers.permissions.industry_read_all
    
  ]
  const checkOtherMasterIndustryArrayy = otherMasterIndustryArray.filter((data) =>
    getAllPermission.includes(data)
  )
   // customer array
   const otherMasterCustomerArray = [
    helpers.permissions.customer_read_all
    
  ]
  const checkOtherMasterCustomerArrayy = otherMasterCustomerArray.filter((data) =>
    getAllPermission.includes(data)
  )
   // role array
   const otherMasterRoleArray = [
    helpers.permissions.role_read_all
    
  ]
  const checkOtherMasterRoleArrayy = otherMasterRoleArray.filter((data) =>
    getAllPermission.includes(data)
  )
   // skillset array
   const otherMasterSkillsetArray = [
    helpers.permissions.skill_read_all
    
  ]
  const checkOtherMasterSkillsetArrayy = otherMasterSkillsetArray.filter((data) =>
    getAllPermission.includes(data)
  )
   // subscription array
   const otherMasterSubscriptionArray = [
    helpers.permissions.subscription_read_all
    
  ]
  const checkOtherMasterSubscriptionArrayy = otherMasterSubscriptionArray.filter((data) =>
    getAllPermission.includes(data)
  )
   // user array
   const otherMasterUserArray = [
    helpers.permissions.user_read_all
    
  ]
  const checkOtherMasterUserArrayy = otherMasterUserArray.filter((data) =>
    getAllPermission.includes(data)
  )


  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'brown' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
    >
      {checkOtherMasterCategoryArrayy.length || checkOtherMasterCompanyArrayy.length ||
      checkOtherMasterCustomerArrayy.length || checkOtherMasterIndustryArrayy.length ||
      checkOtherMasterRoleArrayy.length || checkOtherMasterSkillsetArrayy.length ||
      checkOtherMasterSubscriptionArrayy.length || checkOtherMasterUserArrayy.length ?<ListItemButton onClick={handleClick}>
      <ListItemIcon style={{ color: "white" }}>
                <ArrowDropDownCircleIcon />
              </ListItemIcon>
        <ListItemText  primary="Other Master"/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>:""}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List style={{paddingLeft:"60px"}} component="div" disablePadding >
          {checkOtherMasterCategoryArrayy.length?
          <ListItemButton sx={{ pl: 4 }} component={Link} to={'category'} id='categoryBtn'>
            <ListItemText primary="Category" />
          </ListItemButton>:""}
         {checkOtherMasterCompanyArrayy.length? <ListItemButton sx={{ pl: 4 }} component={Link} to={'company'}>
            <ListItemText primary="Company" />
          </ListItemButton>:""}
          {checkOtherMasterCustomerArrayy.length?<ListItemButton sx={{ pl: 4 }}  component={Link} to={'customer'}>
            <ListItemText primary="Customer"/>
          </ListItemButton>:""}
          {checkOtherMasterIndustryArrayy.length?<ListItemButton sx={{ pl: 4 }} component={Link} to={'industry'}>
            <ListItemText primary="Industry" />
          </ListItemButton>:""}
         {checkOtherMasterRoleArrayy.length? <ListItemButton sx={{ pl: 4 }} component={Link} to={'role'}>
            <ListItemText primary="Role" />
          </ListItemButton>:""}
          {checkOtherMasterSkillsetArrayy.length?<ListItemButton sx={{ pl: 4 }} component={Link} to={'skillset'}>
            <ListItemText primary="Skill Set" />
          </ListItemButton>:""}
          {checkOtherMasterSubscriptionArrayy.length?<ListItemButton sx={{ pl: 4 }} component={Link} to={'subscription'}>
            <ListItemText primary="Subscription" />
          </ListItemButton>:""}
          {checkOtherMasterUserArrayy.length?<ListItemButton sx={{ pl: 4 }} component={Link} to={'user'}>
            <ListItemText primary="User" />
          </ListItemButton>:""}
        </List>
      </Collapse>
    </List>
  );
}
