import React, { useEffect, useState } from 'react'
import moment from 'moment';
import generalHandlers from '../../handlers/generalHandlers';

const AdminUserActivityLogic = () => {
  const [getById,setGetById] = useState([]);

  //State for the set and get the data
  const [tblUserData, setTblUserData] = useState([]);
  const [userChangeData, setUserChangeData] = useState([]);
  //State For pagination 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //State For Open and Close the Modal
  const [open, setOpen] = useState(false);
  const [editIdForData,setEditIdForData] = useState("")

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


  // Fetch All user activity Details
   const fetchUserActivity = async (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
      try {
        let response = await generalHandlers.dataGet(`/v1/userActivity/${id}`,
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
                id: item.id,
              };
            })
          : [];
        //   setTblUserData(refineData);
        if(refineData){
            setTblUserData(refineData)
            console.log("refinedata",refineData);
        }
      } catch (err) {
        console.error("fetchLogDetails", err);
      }
    };
   const fetchAllUser = async () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
      try {
        let response = await generalHandlers.dataGet(`/v1/all-users`,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
        );
        console.log("users ",response);
        if(response.status == 200){
            setGetById(response.data.data.result)
            console.log("response data",response.data.data.result);

        }
      } catch (err) {
        console.error("fetchLogDetails", err);
      }
    };
    

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
    fetchUserActivity

  }
}

export default AdminUserActivityLogic