import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import handler from "../../handlers/generalHandlers"
import KeyIcon from "@mui/icons-material/Key";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Logout,
  VisibilityOff,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const settings = ["Navnath Kumbhar", "CHANGE PASSWORD", "SIGN OUT"];

export default function Profile() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openChangePassModal, setOpenChangePassModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [changePass, setChangePass] = useState({
    new_password:'',
    old_password:''
  })

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenChangePassModal = () => {
    setOpenChangePassModal(true);
  };
  const handleCloseChangePassModal = () => {
    setOpenChangePassModal(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    navigate("/login");
    clearToken();
  };
  // Clean Token
  const clearToken = () => {
    sessionStorage.clear();
    localStorage.clear();
  };

  const changePasswordAPICall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
    .dataPost(`/v1/users/change-password`, changePass, {
      headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
    })
    .then((response) => {
      console.log(response);
      if (response.status == 201) {
        console.log(response.data.message);
        setOpenChangePassModal(false);
        handleCloseChangePassModal();
        // setOpenAlertMsg(true);
      } else {
        window.alert(response.data.message);
      }
    })
    .catch((error) => {
      if (error.status == 400) {
        window.alert(error.data.message);
      }
      console.error("There was an error!- changePasswordAPICall", error);
    });
  };

//   handleSubmit = () => {
    
//     // perform all neccassary validations
//     if (new_password !==   ) {
//         alert("Passwords don't match");
//     } else {
//         // make API call
//     }
// }

  return (
    <div>
      <Box sx={{ mr: "30px" }}>
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
          <MenuItem>
            <Typography textAlign="center">
              <h2>Navnath Kumbhar</h2>
            </Typography>
          </MenuItem>
          <Divider></Divider>
          <MenuItem onClick={handleOpenChangePassModal}>
            <KeyIcon />
            <Typography textAlign="center"> Chnage Password</Typography>
          </MenuItem>
          <Divider></Divider>
          <MenuItem onClick={handleLogout}>
            <Logout></Logout>
            <Typography textAlign="center">SIGN OUT</Typography>
          </MenuItem>
        </Menu>
      </Box>
      <Dialog
        fullWidth
        open={openChangePassModal}
        onClose={handleCloseChangePassModal}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            type={showPassword ? "text" : "password"}
            fullWidth
            id="outlined-basic"
            label="Old Password"
            variant="outlined"
            value={changePass.old_password}
            onChange={(e)=>{
              setChangePass({...changePass,
              old_password:e.target.value})
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((s) => !s)}>
                    {showPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            type={showPassword1 ? "text" : "password"}
            fullWidth
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            value={changePass.new_password}
            onChange={(e)=>{
              setChangePass({...changePass,
              new_password:e.target.value})
            }}
            sx={{ mt: 5, mb: 5 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword1((s) => !s)}>
                    {showPassword1 ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type={showPassword2 ? "text" : "password"}
            fullWidth
            id="outlined-basic"
            value={changePass.new_password}
            onChange={(e)=>{
              setChangePass({...changePass,
              new_password:e.target.value})
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword2((s) => !s)}>
                    {showPassword2 ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="Confirm New Password"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChangePassModal}>Close</Button>
          <Button onClick={changePasswordAPICall}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
