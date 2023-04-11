import React, { useEffect, useState } from 'react'
import generalHandlers from '../../handlers/generalHandlers';

const LoginHistoryLogic = (props) => {
  // const {setLoader} = props
  const [loginHistory, setLoginHistory] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState([])

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

  let filterHistory = (e) => {
    let targetValue = e.target.value;
    const filteredData = loginHistory.filter((item) => {
      return item.loggedInTime.toLowerCase().includes(targetValue.toLowerCase());
      // item.contactNo1.toString().includes(searchTerm)
    });
    if (targetValue) {
      setLoginHistory(filteredData);
    } else getLoginHistoryAPICall();
  };

  const StateContainer ={
    getLoginHistoryAPICall,
    loginHistory,
    filterHistory,
    rowsPerPage

  }
  return StateContainer
}

export default LoginHistoryLogic