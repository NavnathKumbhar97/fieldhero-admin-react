
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
import UserActivityLogic from "./UserActivityLogic";

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

const UserActivityDesign = (props) => {
  // const { sectionId, dataId } = props;
  let {
    tblLogData,
    tblLogHeader,
    logChageData,open,setIsAuditLogEditId,
    handleClose,handleOpen,setLogChageData
  } = UserActivityLogic()
  
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
                    {row.userName}
                  </StyledTableCell>
                  {/* <StyledTableCell align="left">{row.calories}</StyledTableCell> */}
                  <StyledTableCell align="left">{row.operationName}</StyledTableCell>
                  <StyledTableCell align="left">{row.createdOn}</StyledTableCell>
                  {/* <StyledTableCell align="left">{row.id}</StyledTableCell> */}
                  <StyledTableCell align="left">
                    <Button onClick={()=>{
                      handleOpen()
                      setIsAuditLogEditId(row.id)
                      setLogChageData(row.userActivity)
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
            // count={tblLogData.length}
            // rowsPerPage={rowsPerPage}
            // page={page}
            // onPageChange={handleChangePage}
            // onRowsPerPageChange={handleChangeRowsPerPage}
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



export default UserActivityDesign;
