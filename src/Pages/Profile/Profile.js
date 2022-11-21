import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import handler from "../../handlers/generalHandlers";
import KeyIcon from "@mui/icons-material/Key";
import {
  Alert,
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
  Snackbar,
  Stack,
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
  const [openErrMsg,setOpenErrtMsg] = useState(false)
  const [errMsg,setErrMsg] = useState("")

  const [localStorageData, setLocalStorageData] = useState([]);
  const [changePass, setChangePass] = useState({
    new_password: "",
    old_password: "",
  });
  const [openAlertMsg, setOpenAlertMsg] = useState(false);

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
          setOpenAlertMsg(true);
        } else {
          setOpenAlertMsg(true);
        }
      })
      .catch((error) => {
        if (error.status == 400) {
          setErrMsg(error.data.message);
          setOpenErrtMsg(true)
        }
        console.error("There was an error!- changePasswordAPICall", error);
      });
  };

  const localData = localStorage.getItem("user");
  let loc = JSON.parse(localData);
  console.log(loc.name);
  // setLocalStorageData(loc)
  // console.log(localStorageData);

  return (
    <div>
      <Box sx={{ mr: "30px" }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar style={{color:'white',backgroundColor:'#795548'}} alt={loc.name} src="/static/images/avatar/2.jpg" />
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
              <h2>{loc.name}</h2>
            </Typography>
          </MenuItem>
          <p
            style={{ marginLeft: "70px", marginTop: "-30px", fontSize: "14px" }}
          >
            {loc.userEmail}
          </p>
          <Divider></Divider>
          <MenuItem onClick={handleOpenChangePassModal}>
            <KeyIcon />
            <Typography textAlign="center" style={{ paddingLeft: "20px" }}>
              {" "}
              Change Password
            </Typography>
          </MenuItem>
          <Divider></Divider>
          <MenuItem onClick={handleLogout}>
            <Logout style={{ color: "red" }}></Logout>
            <Typography textAlign="center" style={{ paddingLeft: "50px" }}>
              SIGN OUT
            </Typography>
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
            sx={{ mt: 3 }}
            value={changePass.old_password}
            onChange={(e) => {
              setChangePass({ ...changePass, old_password: e.target.value });
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
            onChange={(e) => {
              setChangePass({ ...changePass, new_password: e.target.value });
            }}
            sx={{ mt: 4, mb: 4 }}
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
            onChange={(e) => {
              setChangePass({ ...changePass, new_password: e.target.value });
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
          <Button
            style={{ color: "white", background: "brown" }}
            onClick={changePasswordAPICall}
          >
            Save
          </Button>
          <Button
            style={{ color: "white", background: "black" }}
            onClick={handleCloseChangePassModal}
          >
            Close
          </Button>
        </DialogActions>
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
                  open={openErrMsg}
                  autoHideDuration={6000}
                  onClose={() => setOpenErrtMsg(false)}
                >
                  <Alert
                    onClose={() => setOpenErrtMsg(false)}
                    severity="warning"
                    sx={{ width: "100%", backgroundColor: "brown",color:'yellow' }}
                  >
                    {errMsg}
                  </Alert>
                </Snackbar>
        </Stack>
      </Dialog>
      <Snackbar
        open={openAlertMsg}
        autoHideDuration={6000}
        onClose={() => setOpenAlertMsg(false)}
      >
        <Alert
          onClose={() => setOpenAlertMsg(false)}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#24f05e" }}
        >
          Data successfully Updated!
        </Alert>
      </Snackbar>
      
    </div>
  );
}
