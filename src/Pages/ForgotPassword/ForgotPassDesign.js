import {React,useState} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';

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

export default function ForgotPass() {
  const [errorTextEmail, setErrorTextEmail] = useState();
  const [email, setEmail] = useState();

  const onChange = (event) => {
    if (event.target.value) {
      setErrorTextEmail("");
      // setErrorTextPass("")

      // setPass(event.target.value);
      setEmail(event.target.value);
    } else {
      setErrorTextEmail("E-mail is required");
      // setErrorTextPass("Password is required");
    }
  };

    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme} sx={{bgcolor:'rgb(182 189 217)'}}>
      <Container component="main" maxWidth="md" sx={{mb:0}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
            {/* <Avatar alt="Example Alt" src="../../../public/logo.jpg" /> */}
          
            <img src="https://admin.fieldhero.in/img/logo.a3b1bafb.png" style={{width:"200px", height:"200px",
        }} ></img>
          
          <Typography component="h1" variant="h5" style={{fontWeight: 'bold'}}>
          Admin - Forgot Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            Validate
            sx={{ mt: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              variant="standard"
              id="email2"
              label="Email"
              name="Email"
              value={email}
              helperText={errorTextEmail}
              error={errorTextEmail}
              onClick={onChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>

                    <EmailIcon></EmailIcon>
                    </IconButton>
                   
                  </InputAdornment>
                )
              }}
              
              style={{
                backgroundColor: "white",
                borderRadius:'6px',
                width:"400px"
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
                    
                }}
                id="sendbtn"
                type="submit"
                fullWidth
                className="sign-btn"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                SEND RESET LINK
              </Button>

            </Stack>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item sx={{ mt: 3 }}>
              Already have an account? 
                <Link variant="body2" style={{
                  color: "#b2363a",
                  fontSize:"17px"

                }}><NavLink id="lgnbtn" to="/" exact
                >{"Login"}</NavLink>
                  
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container >
      <Copyright style={{backgroundColor:"white"}}/>
    </ThemeProvider>
  );
}
