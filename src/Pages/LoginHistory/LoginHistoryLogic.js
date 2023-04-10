import React, { useEffect, useState } from 'react'
import generalHandlers from '../../handlers/generalHandlers';

const LoginHistoryLogic = (props) => {
  // const {setLoader} = props
  const [loginHistory, setLoginHistory] = useState([])

  //get login history data for the login history module
  const getLoginHistoryAPICall = async() =>{
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    // setLoader(true);
    await generalHandlers
      .dataGet(`/v1/user-history/${convertTokenToObj.id}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoginHistory(response.data.data);
          // setLoader(false);
        } else if (response.status == 400) {
          // setErrMsg(response.data.message);
          // setOpenErrtMsg(true);
          // setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getLoginHistory", error);
        // setLoader(false);
      });
  }

  const StateContainer ={
    getLoginHistoryAPICall,
    loginHistory,

  }
  return StateContainer
}

export default LoginHistoryLogic