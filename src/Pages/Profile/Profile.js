import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";

const settings = ["Navnath Kumbhar", "CHANGE PASSWORD", "SIGN OUT"];

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      {/* <Avatar sx={{left:"1100px",cursor:'pointer',}}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        md={6}
        xs={12}
        
      >
        NK
      </Avatar>
      <Menu
      style={{top:"40px"}}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem>
        <Avatar
        style={{alignSelf:'center'}}
      >
        NK
      </Avatar>
        </MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Change Password</MenuItem>
        <Divider/>
        <MenuItem onClick={handleClose} to="/login">Sign Out</MenuItem>
      </Menu> */}

      <Box sx={{ flexGrow: 0, ml: 145, }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Navnath Kumbhar" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Navnath Kumbhar</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Chnage Password</Typography>
            </MenuItem>
            <Divider></Divider>
            <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">SIGN OUT</Typography>
            </MenuItem>
        </Menu>
      </Box>
    </div>
  );
}
