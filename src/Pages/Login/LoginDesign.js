import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Login.css";
import { Backdrop, CircularProgress, IconButton, InputAdornment, Stack } from "@mui/material";
import LoginLogic from "./LoginLogic";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { NavLink } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="right"
      {...props}
      sx={{ mt: 30 }}
    >
      {"Admin © "}
      <Link color="inherit" href="#">
        Fieldhero
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function LoginDesign() {
  let {
    errorTextEmail,
    errorTextPass,
    setErrorTextPass,
    showPass,
    email,
    password,
    setPassword,
    setEmail,
    setShowPass,
    handleReset,
    setErrorTextEmail,
    loginAPIcall,
    loader,
    setLoader,
  } = LoginLogic();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme} sx={{ bgcolor: "rgb(188 195 219)" }}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Backdrop
        sx={{color: '#7d1810', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        // onClick={handleClose}
      >
        <CircularProgress size={130} thickness={2} color="inherit" />
      </Backdrop>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar alt="Example Alt" src="../../../public/logo.jpg" /> */}

          <img
            src="https://admin.fieldhero.in/img/logo.a3b1bafb.png"
            style={{ width: "200px", height: "200px" }}
          ></img>

          <Typography
            component="h1"
            variant="h5"
            style={{ fontWeight: "bold" }}
          >
            Admin - Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              type="email"
              required
              fullWidth
              value={email}
              helperText={errorTextEmail === "" ? "Email is required" : ""}
              error={errorTextEmail === ""}
              onChange={(event) => {
                setErrorTextEmail(event.target.value);
                setEmail(event.target.value);
              }}
              variant="standard"
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              style={{
                backgroundColor: "white",
                borderRadius: "6px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <EmailIcon></EmailIcon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              autoComplete="password"
              value={password}
              helperText={errorTextPass === "" ? "Password is required" : ""}
              error={errorTextPass === ""}
              onChange={(event) => {
                setErrorTextPass(event.target.value);
                setPassword(event.target.value);
              }}
              id="password"
              variant="standard"
              name="password"
              label=" Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)}>
                      {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              type={showPass ? "text" : "password"}
              sx={{ mt: 3 }}
              style={{
                backgroundColor: "white",
                borderRadius: "6px",
              }}
            />

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="left"
            >
              <Button
                style={{
                  backgroundColor: "#b2363a",
                  width: "10px",
                }}
                id="loginbtn"
                type="submit"
                fullWidth
                className="sign-btn"
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                onClick={loginAPIcall}
              >
                Login
              </Button>
              <Button
                style={{
                  color: "black",
                }}
                id="clrbtn"
              >
                Clear
              </Button>
            </Stack>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item sx={{ mt: 3 }}>
                <Link
                  variant="body2"
                  style={{
                    color: "#b2363a",
                    fontSize: "17px",
                  }}
                >
                  <NavLink id="forgotbtn" to="/forgot-password" exact>
                    {"Forgot password?"}
                  </NavLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Copyright style={{ backgroundColor: "white" }} />
    </ThemeProvider>
  );
}

export default LoginDesign;
