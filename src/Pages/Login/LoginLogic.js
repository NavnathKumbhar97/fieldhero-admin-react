import { React, useState } from "react";

// const emailRegex =
//   /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;

const LoginLogic = () => {
  const [errorTextEmail, setErrorTextEmail] = useState();
  const [email, setEmail] = useState();
  const [errorTextPass, setErrorTextPass] = useState();
  const [pass, setPass] = useState();
  const [password, setpassword] = useState("password");
  const [showPass, setShowPass] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');

  // The regular exprssion to validate the email pattern
  // It may not be 100% perfect but can catch most email pattern errors and assures that the form is mostly right
  const emailRegex = /\S+@\S+\.\S+/;

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


  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    this.setState({
      itemvalues: [{}],
    });
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


  return {
    errorTextEmail,
    setErrorTextEmail,
    email,
    setEmail,
    errorTextPass,
    setErrorTextPass,
    pass,
    setPass,
    setShowPass,
    handleReset,handleChange,validateEmail,setErrorTextEmail
  };
};

export default LoginLogic;
