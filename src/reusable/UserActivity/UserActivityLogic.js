import React, { useEffect, useState } from 'react'
import handlers from '../../handlers';
import moment from 'moment';
import { useSelector } from 'react-redux';
import generalHandlers from '../../handlers/generalHandlers';

const UserActivityLogic = () => {
  const [searchInput, setSearchInput] = useState("");

  //State for the set and get the data
  const [tblUserData, setTblUserData] = useState([]);
  const [userChangeData, setUserChangeData] = useState([]);
  //State For pagination 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //State For Open and Close the Modal
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [editIdForData,setEditIdForData] = useState("")

  //tbl heading
  const tblUserHeader = [
    // {
    //   id: "SrNo",
    //   numeric: false,
    //   disablePadding: true,
    //   label: "Sr.No",
    // },
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
   const fetchUserActivity = async () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true)
      try {
        let response = await generalHandlers.dataGet(`/v1/userActivity/${convertTokenToObj.id}`,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
        );
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
          setTblUserData(refineData);
        if(refineData){
          setLoader(false)
          setTblUserData(refineData)
        }
      } catch (err) {
        setLoader(false)
        console.error("fetchLogDetails", err);
      }
    };
    

  useEffect(()=>{
    fetchUserActivity()
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
    loader, setLoader
  }
}

export default UserActivityLogic