import React, { useEffect, useState } from 'react'
import moment from 'moment';
import * as XLSX from "xlsx";

import generalHandlers from '../../handlers/generalHandlers';

const AdminUserActivityLogic = () => {
  const [getById,setGetById] = useState([]);
  const [getDataId, setGetDataId] = useState([])
  //State for the set and get the data
  const [tblUserData, setTblUserData] = useState([]);
  const [userChangeData, setUserChangeData] = useState([]);
  //State For pagination 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //State For Open and Close the Modal
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isFilter,setIsFilter] = useState(false);
  const [isVisible,setIsVisible] = useState(false);
  const [editIdForData,setEditIdForData] = useState("")
 //State for store the handled start date and end date
 const [startDate,setStartDate]= useState(new Date());
 const [endDate,setEndDate]= useState(new Date());
 const [filteredData,setFilteredData] = useState([])

  //tbl heading
  const tblUserHeader = [
    {
      id: "PersonName",
      numeric: false,
      disablePadding: true,
      label: "Person Name",
    },
    {
      id: "OperationName",
      numeric: true,
      disablePadding: false,
      label: "Operation Name",
    },
    {
      id: "Date",
      numeric: true,
      disablePadding: false,
      label: "Date",
    },
    {
      id: "View",
      numeric: true,
      disablePadding: false,
      label: "View",
    },
  ];

  //Handle the user activity log Modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

     //Handle and filter the data based on date range
     const handleSelect = (date) =>{
      let filtered = filteredData.filter((product)=>{
        let productDate = new Date(product["createdOn"]);
        return(productDate>= date.selection.startDate &&
          productDate<= date.selection.endDate);
      })
      setStartDate(date.selection.startDate);
      setEndDate(date.selection.endDate);
      setTblUserData(filtered);
    };
  
    //To store the start date and end date
    const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    }

  // Fetch All user activity Details
   const fetchUserActivity = async (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true)
      try {
        let response = await generalHandlers.dataGet(`/v1/admin-userActivity/${id}`,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
        );
        console.log("response",
        response);
        let refineData = response
          ? response.data.data.map((item, index) => {
              return {
                userName: item.userName,
                operationName: item.operationName,
                createdOn: moment(item.createdOn, "YYYY-MM-DD HH:mm:ss").format("MM/DD/YYYY HH:mm:ss"),
                userActivity: item.userActivity
                  ? Object.entries(JSON.parse(item.userActivity))
                  : [],
                userActivities:item.userActivity,
                id: item.id,
              };
            })
          : [];
        //   setTblUserData(refineData);
        if(refineData){
            setTblUserData(refineData)
            setFilteredData(refineData);
            setLoader(false)
            setIsVisible(true)
        }
      } catch (err) {
        setLoader(false)
        console.error("fetchLogDetails", err);
      }
    };
    //fetch all the user 
   const fetchAllUser = async () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true)
      try {
        let response = await generalHandlers.dataGet(`/v1/all-users`,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
        );
        console.log("users ",response);
        if(response.status == 200){
          setLoader(false)
            setGetById(response.data.data.result)
            console.log("response data",response.data.data.result);

        }
      } catch (err) {
        console.error("fetchLogDetails", err);
      }
    };
    
    //export into to excel 
    const exportToExcel = () => {
      const formattedData = tblUserData.map((user) => {
        return {
          userName: user.userName,
          operationName: user.operationName,
          Date: user.createdOn,
          userActivities:user.userActivities,
          id: user.id
        };
      });
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "userActivity.xlsx");
    }
  

  useEffect(()=>{
    // fetchUserActivity()
    fetchAllUser()
  },[])

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event, row) => {
    setPage(0);
    setRowsPerPage(row.props.value);
  };

  return {
    tblUserHeader,
    tblUserData, setTblUserData,userChangeData,handleClose,handleOpen,
    open,setUserChangeData,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
    getById,
    setEditIdForData,
    fetchUserActivity,
    loader, setLoader,
    isFilter,setIsFilter,
    selectionRange,handleSelect,
    getDataId, setGetDataId,
    exportToExcel,
    isVisible,setIsVisible
  }
}

export default AdminUserActivityLogic