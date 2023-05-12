import React, { useState,useEffect, forwardRef } from "react";
import {
  Button,
  ListItem,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//Import redux method and Handlers
import handlers from "../../handlers";
import { useSelector } from "react-redux";
import moment from "moment";

//Style
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AuditLog = (props) => {
  // const { sectionId, dataId } = props;
  const [isAuditLogModal, setIsAuditLogModal] = useState(false);
  const [isFile, setIsFile] = useState("");
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
      id: "Files",
      numeric: true,
      disablePadding: false,
      label: "Files",
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
   const fetchLogDetails = async () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
      try {
        let response = await handlers.auditLog.fetchAllAuditLog(
          AuditLogDataId.sectionId,
          AuditLogDataId.dataId,
          {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          }
        );
        let refineData = response
          ? response.map((item, index) => {
              return {
                PersonName: item.userName,
                OperationName: item.operationName,
                Date: moment(item.createdOn, "YYYY-MM-DD HH:mm:ss").format("MM/DD/YYYY HH:mm:ss"),
                UpdateFile: item.updatedFiled
                  ? Object.entries(JSON.parse(item.updatedFiled))
                  : [],
                id: item.id,
              };
            })
          : [];
        setTblLogData(refineData);
        Object.keys(tblLogData).map((i,z)=>{
          console.log("file name",tblLogData[i].UpdateFile);
        });
      } catch (err) {
        console.error("fetchLogDetails", err);
      }
    };
    
  //Fetch Log Details By Id
  // const fetchAuditLogDetailsById = async(id)=>{
  //   let authTok = localStorage.getItem("user"); // string
  //   let convertTokenToObj = JSON.parse(authTok);
  //     try {
  //       let response = await handlers.auditLog.fetchAuditLogById(
  //         id,
  //         {
  //           headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
  //         }
  //       );
  //       let refineData = response
  //         // ? response.map((item, index) => {
  //         //     return {
  //         //       PersonName: item.userName,
  //         //       OperationName: item.operationName,
  //         //       Date: moment(item.createdOn, "YYYY-MM-DD").format("MM/DD/YYYY"),
  //         //       UpdateFile: item.updatedFiled
  //         //         ? Object.entries(JSON.parse(item.updatedFiled))
  //         //         : [],
  //         //       id: item.id,
  //         //       UpdateFile:item.updatedFiled
  //         //     };
  //         //   })
  //         // : [];
  //       setLogChageData(refineData);
  //       // let test =JSON.parse(response.updatedFiled);
  //       // console.log("refine data",test);
  //     } catch (err) {
  //       console.error("fetchLogDetails", err);
  //     }
  // }

  useEffect(()=>{
    fetchLogDetails()
    
  },[])

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event, row) => {
    setPage(0);
    setRowsPerPage(row.props.value);
  };

  return (
    <>
      <ListItem>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {tblLogHeader.map((item) => (
                  <StyledTableCell align="left">{item.label}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tblLogData.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.PersonName}
                  </StyledTableCell>
                  {/* <StyledTableCell align="left">{row.calories}</StyledTableCell> */}
                  <StyledTableCell align="left">{row.OperationName}</StyledTableCell>
                  <StyledTableCell align="left">{row.UpdateFile.map((i,z)=>(
                    i[0]==="Profile Image"?<a href={`${i[1]}`} target="_blank">{i[0]}</a>:""
                  ))}</StyledTableCell>
                  <StyledTableCell align="left">{row.Date}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Button onClick={()=>{
                      handleOpen()
                      setIsAuditLogEditId(row.id)
                      setLogChageData(row.UpdateFile)
                    }}>
                      <ViewHeadlineIcon></ViewHeadlineIcon>
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tblLogData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </ListItem>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Recent updated fields?"}
          </DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Field</b></TableCell>
                    <TableCell align="left"><b>Value</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logChageData.map((row) => (
                    <TableRow
                      // key={row}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row[0]}
                      </TableCell>
                      <TableCell align="left">{row[0]==="Is Active"&&row[1]===true?"Active":row[1]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};



export default AuditLog;
