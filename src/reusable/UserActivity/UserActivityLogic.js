import React, { useEffect, useState } from 'react'
import handlers from '../../handlers';
import moment from 'moment';
import { useSelector } from 'react-redux';
import generalHandlers from '../../handlers/generalHandlers';

const UserActivityLogic = () => {
    const [isAuditLogModal, setIsAuditLogModal] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAuditLogEditId, setIsAuditLogEditId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [tblLogData, setTblLogData] = useState([]);
  const [logChageData, setLogChageData] = useState([]);
  //State For pagination 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //State For Open and Close the Modal
  const [open, setOpen] = useState(false);
  const [editIdForData,setEditIdForData] = useState("")

  //Get the State Data From redux
  const AuditLogDataId = useSelector((state) => state.auditLog)
  const tblLogHeader = [
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
      label: "PersonName",
    },
    {
      id: "OperationName",
      numeric: true,
      disablePadding: false,
      label: "OperationName",
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

  //Handle the Audit log Modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // Fetch All Log Details
   const fetchUserActivity = async () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
      try {
        let response = await generalHandlers.dataGet(`/v1/userActivity/${convertTokenToObj.id}`,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
        );
        if(response){
          setTblLogData(response.data)
        }
      } catch (err) {
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
    tblLogHeader,
    tblLogData
  }
}

export default UserActivityLogic