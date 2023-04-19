import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import handler from "../../handlers/generalHandlers";
import { styled } from '@mui/material/styles';
import HistoryIcon from '@mui/icons-material/History';
import KeyIcon from "@mui/icons-material/Key";
import {
  Alert,
  Avatar,
  Badge,
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
import { Link, useNavigate } from "react-router-dom";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

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
    confirm_password:""
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
        if (response.status == 200) {
          console.log(response.data.message);
          setOpenChangePassModal(false);
          handleCloseChangePassModal();
          setOpenAlertMsg(true);
        } else {
          setOpenAlertMsg(true);
          setOpenChangePassModal(false);
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

  const validation= Yup.object().shape({
    old_password: Yup.string()
      .required('Old Password is required'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string()
         .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  const {register, control, handleSubmit,formState: { errors }
  } = useForm({
      resolver: yupResolver(validation)
  });

  const onSubmit = data => {
    changePasswordAPICall()
  };
  
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));
  

  return (
    <div>
      <Box sx={{ mr: "30px" }}>
        <Tooltip title="Profile">
        
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
            <Avatar 
            style={{color:'white',backgroundColor:'#32a88d'}} 
            // alt={loc.name} 
            src="../../Images/apexaLogo.png" 
            />
            </StyledBadge>
            <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
      </Badge>
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
            // horizontal: "right",
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
            style={{ textAlign:'center', marginTop: "-30px", fontSize: "14px" }}
          >
            {loc.userEmail}
          </p>
          <Divider></Divider>
          <MenuItem onClick={handleOpenChangePassModal}>
            <KeyIcon style={{ color: "orange" }}/>
            <Typography textAlign="center" style={{ paddingLeft: "20px" }}>
              {" "}
              Change Password
            </Typography>
          </MenuItem>
          <Divider></Divider>
          <MenuItem component={Link} to={"/login-history"}>
            <HistoryIcon style={{ color: "blue" }}></HistoryIcon>
            <Typography textAlign="center" style={{ paddingLeft: "20px" }}>
              Login History
            </Typography>
          </MenuItem>
          <Divider></Divider>
          <MenuItem component={Link} to={"/user-activity"}>
            <RecentActorsIcon style={{ color: "green" }}></RecentActorsIcon>
            <Typography textAlign="center" style={{ paddingLeft: "20px" }}>
              Activity
            </Typography>
          </MenuItem>
          <Divider></Divider>
          <MenuItem onClick={handleLogout}>
            <Logout style={{ color: "red" }}></Logout>
            <Typography textAlign="center" style={{ paddingLeft: "20px" }}>
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
            {...register('old_password')}
            error={errors.old_password ? true : false}
            helperText={errors.old_password?.message}
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
            {...register('password')}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
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
            {...register('passwordConfirmation')}
            error={errors.passwordConfirmation ? true : false}
            helperText={errors.passwordConfirmation?.message}
            value={changePass.confirm_password}
            onChange={(e) => {
              setChangePass({ ...changePass, confirm_password: e.target.value });
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
            onClick={handleSubmit(onSubmit)}
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
