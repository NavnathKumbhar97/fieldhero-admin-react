import axios from "../../axios";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux"
import helpers from "../../helpers";
/**
 * Redux custom build actions are import.
 * @loginSuccessful
 * 
 *  */
 import { loginSuccessful } from "../../store/Login/action"
// const emailRegex =
//   /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;

const LoginLogic = () => {
  const [errorTextEmail, setErrorTextEmail] = useState();
  const [email, setEmail] = useState();
  const [errorTextPass, setErrorTextPass] = useState();
  const [pass, setPass] = useState();
  const [password, setPassword] = useState();
  const [showPass, setShowPass] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // The regular exprssion to validate the email pattern
  // It may not be 100% perfect but can catch most email pattern errors and assures that the form is mostly right
  const emailRegex = /\S+@\S+\.\S+/;
  const checkEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setIsValid(true);
      setMessage('Your email looks good!');
    } else {
      setIsValid(false);
      setMessage('Please enter a valid email!');
    }
  };
  
const handleChange=(event)=>{
  var email = event.target.value;
  // do what ever you want
  validation(email);
}
const validation = (email) => {
  const result = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return result.test(String(email).toLowerCase());
}

/**
     * This method responsible for login authentication.
     */
const loginAPIcall = async (e) => {
  try {
      // e.preventDefault()
      // this.setState({ isButtonActive: true, isLoaderVisible: false })
      // Check for Blank Validation
      if (email !== "" || password !== "") {
          if (
              checkEmail.test(String(email).toLowerCase())
          ) {
              setEmail(email)
              setPassword(password)
              //Login method from helper section call for authentication operation.
              let response = await helpers.auth.login(email, password)
              //Check authentication status
              if (response) {
                  let { token,permissions } = response
                  // Redux Method call for store all the user data into redux state.
                  loginSuccessful(response)
                  // setPermission(permissions)
                  console.log(response);
                  //storing user permission in local and session storage

                  //store userPermission on local storage and session storage

                  localStorage.setItem('userPermission',JSON.stringify(permissions))
                  sessionStorage.setItem('userPermission',JSON.stringify(permissions))
                  
                  // set authorization Header in axios instance
                  axios.defaults.headers = {
                      Authorization: "Bearer " + token,
                  }
                  // Redirect authenticate user to dashboard.
                  setTimeout(() => {
                      navigate("/")
                  }, 500)
              }
          } 
      } 
  } catch (ex) {
      console.error(ex)
  }
}

//login api 
// const loginAPIcall = () => {
//   console.log("fun called ");
//   if (email && password) {
//     const loginRequest = {
//       email: email,
//       password: password,
//     };

//     // setLoading(true);
//     console.log("api called ");
//     axios
//       .post("/api/v1/users/login", loginRequest)
      
//       .then((response) => {
//         // setLoading(false);
//         if (response.status == 200) {
//           localStorage.setItem("token", response.data.token);

//           navigate("/");
//         } else if (response.status == 400) {
//           window.alert(response.data.message);
//         }
//       })
//       .catch((error) => {
//         console.error("There was an error!- loginAPIcall", error);
//       });
//   }
// };


  return {
    errorTextEmail,
    setErrorTextEmail,
    email,
    setEmail,
    errorTextPass,
    setErrorTextPass,
    password,
    setPassword,
    setPass,
    setShowPass,
    handleChange,validateEmail,setErrorTextEmail,
    loginAPIcall
  };
};

const mapStateToProps = (state) => {
  try {
      return {
          user: state.user,
      }
  } catch (err) {
      console.error(err)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      loginSuccessful: (user) => dispatch(loginSuccessful(user)),
  }
}

export default LoginLogic;
