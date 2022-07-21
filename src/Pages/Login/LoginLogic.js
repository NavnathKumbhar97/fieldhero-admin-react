import { React, useState } from "react";

const emailRegex =
  /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;

const LoginLogic = () => {
  const [errorTextEmail, setErrorTextEmail] = useState();
  const [email, setEmail] = useState();

  const [errorTextPass, setErrorTextPass] = useState();
  const [pass, setPass] = useState();
  const [password, setpassword] = useState("password");
  const [showPass, setShowPass] = useState(false);

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
  const onChangePass = (event) => {
    if (event.target.value) {
      // setErrorTextEmail("");
      setErrorTextPass("");

      setPass(event.target.value);
      // setEmail(event.target.value)
    } else {
      // setErrorTextEmail("E-mail is required");
      setErrorTextPass("Password is required");
    }
  };

  return {
    errorTextEmail,
    setErrorTextEmail,
    email,
    setEmail,
    errorTextPass,
    setErrorTextPass,
    pass,
    setPass,
    onChange,
    onChangePass,
    password,
    showPass,setShowPass
  };
};

export default LoginLogic;
