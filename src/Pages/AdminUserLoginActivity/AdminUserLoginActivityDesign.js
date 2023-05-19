import React from "react";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
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
import { DateRangePicker } from 'react-date-range';
import FilterListIcon from '@mui/icons-material/FilterList';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import AdminUserLoginActivityLogic from "./AdminUserLoginActivityLogic";

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

const AdminUserLoginActivityDesign = (props) => {
  let {
    tblUserData,
    tblUserHeader,
    userChangeData,
    open,
    handleClose,
    handleOpen,
    setLogChageData,
    handleChangePage,
    handleChangeRowsPerPage,
    setUserChangeData,
    page,
    rowsPerPage,
    getById,
    setEditIdForData,
    fetchUserActivity,
    loader,
    isFilter,
    setIsFilter,
    selectionRange,
    handleSelect,
    getDataId, setGetDataId,
    exportToExcel,
    isVisible
  } = AdminUserLoginActivityLogic();

  return (
    <Box>
      {!isFilter ? (
        <Button
          style={{
            width: "20px",
            marginBottom: "10px",
            backgroundColor: "brown",
          }}
          variant="contained"
          onClick={() => setIsFilter(true)}
        >
          <FilterListIcon></FilterListIcon>
        </Button>
      ) : (
        <Button
          style={{
            width: "20px",
            marginBottom: "5px",
            backgroundColor: "brown",
          }}
          variant="contained"
          onClick={() => setIsFilter(false)}
        >
          Hide
        </Button>
      )}
      {isFilter ? (
        <DateRangePicker
          ranges={[selectionRange]}
          onChange={handleSelect}
        ></DateRangePicker>
      ) : (
        ""
      )}
      <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <FormControl sx={{ mb: 2, width: 350 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        onChange={(e,value) => {
          const selectedUser = getById.find(user => user.fullName === value);
          setEditIdForData(selectedUser.id);
          fetchUserActivity(selectedUser.id);
        }} 
        options={getById.map((option) => option.fullName)}
        renderInput={(params) => <TextField {...params} label="Select User To View" />}
      />
      </FormControl>
      {isVisible?<Tooltip title="Export to Excel">
      <Button style={{height:1}} onClick={exportToExcel}>
      <svg style={{color:"#006400"}} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m1.8 18H14l-2-3.4l-2 3.4H8.2l2.9-4.5L8.2 11H10l2 3.4l2-3.4h1.8l-2.9 4.5l2.9 4.5M13 9V3.5L18.5 9H13Z"/></svg>
      </Button>
      </Tooltip>:""}
    </Box>
      <TableContainer component={Paper}>
        <Backdrop
          sx={{ color: "#7d1810", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress size={130} thickness={2} color="inherit" />
        </Backdrop>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {tblUserHeader.map((item) => (
                <StyledTableCell align={item.align}>{item.label}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tblUserData.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.userName}
                </StyledTableCell>
                {/* <StyledTableCell align="left">{row.calories}</StyledTableCell> */}
                <StyledTableCell align="left">
                  {row.email}
                </StyledTableCell>
                <StyledTableCell align="center">{row.loggedInTime}</StyledTableCell>
               
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tblUserData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

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
                    <TableCell>
                      <b>Field</b>
                    </TableCell>
                    <TableCell align="left">
                      <b>Value</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userChangeData.map((row) => (
                    <TableRow
                      // key={row}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row[0]}
                      </TableCell>
                      <TableCell align="left">
                        {row[0] === "Is Active" && row[1] === true
                          ? "Active"
                          : row[1]}
                      </TableCell>
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
    </Box>
  );
};

export default AdminUserLoginActivityDesign;
