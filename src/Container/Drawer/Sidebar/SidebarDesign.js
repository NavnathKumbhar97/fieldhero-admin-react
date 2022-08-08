import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from "@mui/icons-material/Mail";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import LayersIcon from "@mui/icons-material/Layers";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { Grid } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import Profile from "../../../Pages/Profile/Profile";
import OtherMaster from "../Other Master/OtherMaster";
import Admin from "../Admin/Admin";
import { Link, Outlet } from "react-router-dom";
import SidebarLogic from "./SidebarLogic";

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function SidebarDesign() {
  const theme = useTheme();
  let {
    open,
    setOpen,
    handleDrawerClose,
    handleDrawerOpen
  } = SidebarLogic()

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: "brown", color: "white" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {open ? "" : "Apexa Group"}
          </Typography>
          <Profile/>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          style={{ backgroundColor: "brown", color: "white", fontSize: "20px" }}
        >
          Apexa Group
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List style={{ backgroundColor: "brown", color: "white" }}>
          {/* <Link to=""> */}
          <ListItem component={Link} to={""} disablePadding style={{ paddingBottom: "10px",color:'white' }}>
            <ListItemButton >
              <ListItemIcon style={{ color: "white" }}>
                <DashboardIcon />
              </ListItemIcon>
              Dashboard
              <ListItemText />
            </ListItemButton>
          </ListItem>
          {/* </Link> */}
          {/* <Link to="/candidate-master"> */}
          <ListItem component={Link} to={"/candidate-master"} disablePadding style={{ paddingBottom: "10px",color:'white' }}>
            <ListItemButton >
              <ListItemIcon style={{ color: "white" }}>
                <PermContactCalendarIcon />
              </ListItemIcon>
              Candidate Master
              <ListItemText />
            </ListItemButton>
          </ListItem>
          {/* </Link> */}
          {/* <Link to=''> */}
          <ListItem component={Link} to={"/candidate-upload-batch"} disablePadding style={{ paddingBottom: "10px",color:'white' }}>
            <ListItemButton>
              <ListItemIcon style={{ color: "white" }}>
                <LayersIcon />
              </ListItemIcon>
              Candidate Upload Batch
              <ListItemText />
            </ListItemButton>
          </ListItem>
          {/* </Link> */}
          {/* <Link to='/candidate-verification'> */}
          <ListItem component={Link} to={"/candidate-verification"} disablePadding style={{ paddingBottom: "10px",color:'white' }}>
            <ListItemButton>
              <ListItemIcon style={{ color: "white" }}>
                <HowToRegIcon />
              </ListItemIcon>
              Candidate Verification
              <ListItemText />
            </ListItemButton>
          </ListItem>
          {/* </Link> */}
          {/* <Link to='/agent-master'> */}
          <ListItem component={Link} to={"/agent-master"} disablePadding style={{ paddingBottom: "10px",color:'white'}}>
            <ListItemButton>
              <ListItemIcon style={{ color: "white" }}>
                <SupervisorAccountIcon />
              </ListItemIcon>
              Agent Master
              <ListItemText />
            </ListItemButton>
          </ListItem>
          {/* </Link> */}
          {/* <Link to='/agent-pricing-template'> */}
          <ListItem component={Link} to={"/agent-pricing-template"} disablePadding style={{ paddingBottom: "0px",color:'white' }}>
            <ListItemButton>
              <ListItemIcon style={{ color: "white" }}>
                <PriceChangeIcon />
              </ListItemIcon>
              Agent Pricing Template
              <ListItemText />
            </ListItemButton>
          </ListItem>
          {/* </Link> */}

          <ListItem disablePadding sx={{ p:0,mt:0,mb:0 }}>
            <Admin />
          </ListItem>
          <ListItem disablePadding sx={{ pt: 0,pb:0.3 }}>
            <OtherMaster />
          </ListItem>
          <ListItem disablePadding style={{ paddingBottom: "10px" }}>
            <ListItemButton>
              <ListItemIcon style={{ color: "white" }}>
                <HelpIcon />
              </ListItemIcon>
              Help
              <ListItemText />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ paddingBottom: "10px" }}>
            <ListItemButton>
              <ListItemIcon style={{ color: "white" }}>
                <InfoIcon />
              </ListItemIcon>
              About
              <ListItemText />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          
          {/* <TheContent/> */}
          <Outlet/>
          </Typography>
      </Box>
    </Box>
  );
}

export default SidebarDesign;
