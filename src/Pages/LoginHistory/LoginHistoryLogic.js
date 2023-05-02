import React, { useEffect, useState } from 'react'
import generalHandlers from '../../handlers/generalHandlers';

const LoginHistoryLogic = (props) => {
  // const {setLoader} = props
  //State for store the all data
  const [loginHistory, setLoginHistory] = useState([])
  const [filteredData,setFilteredData] = useState([])
  //State for pagination
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState([])
  //State for hide and show filter functionality
  const [isFilter,setIsFilter] = useState(false)
  //State for store the handled start date and end date
  const [startDate,setStartDate]= useState(new Date());
  const [endDate,setEndDate]= useState(new Date());

  //State for the loader
  const [loader,setLoader] = useState(false)

  //Handle and filter the data based on date range
  const handleSelect = (date) =>{
    let filtered = filteredData.filter((product)=>{
      let productDate = new Date(product["loggedInTime"]);
      return(productDate>= date.selection.startDate &&
        productDate<= date.selection.endDate);
    })
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setLoginHistory(filtered);
  };

  //To store the start date and end date
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

  //get login history data for the login history module
  const getLoginHistoryAPICall = async() =>{
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    await generalHandlers
      .dataGet(`/v1/user-history/${convertTokenToObj.id}?take=${rowsPerPage}&skip=${page}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoginHistory(response.data.data);
          setFilteredData(response.data.data);
          setLoader(false);
        } else if (response.status == 400) {
          // setErrMsg(response.data.message);
          // setOpenErrtMsg(true);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getLoginHistory", error);
        setLoader(false);
      });
  }
  

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event, row) => {
    setPage(0);
    setRowsPerPage(row.props.value);
  };

  const StateContainer ={
    getLoginHistoryAPICall,
    loginHistory,
    isFilter,setIsFilter,
    rowsPerPage,
    handleSelect,
    selectionRange,
    page,setPage,handleChangePage,
    handleChangeRowsPerPage,
    loader,setLoader

  }
  return StateContainer
}

export default LoginHistoryLogic