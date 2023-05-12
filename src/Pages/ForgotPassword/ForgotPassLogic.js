import { Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import generalHandlers from '../../handlers/generalHandlers';

const ForgotPassLogic = () => {
    const [openErrtMsg, setOpenErrtMsg] = useState(false)
    const [errorTextEmail, setErrorTextEmail] = useState();
    const [email, setEmail] = useState({email:""});
    const [openErrtMsg2,setOpenErrtMsg2] = useState(false)
      
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
    };

    const forgotPassAPICall = () => {
        generalHandlers
          .dataPost(`/v1/users/forgot-password`, email, {
            headers: {},
          })
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
                setOpenErrtMsg2(true);
            } else {
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 404) {
              setOpenErrtMsg(true);
            }
            console.error("There was an error!- forgotPassword", error);
          });
      };

  return {
    openErrtMsg, setOpenErrtMsg,
    errorTextEmail, setErrorTextEmail,
    email, setEmail,
    handleSubmit,
    forgotPassAPICall,
    openErrtMsg2,setOpenErrtMsg2

  }
}

export default ForgotPassLogic