import React from "react";
import {
  Backdrop,
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

import AdminUserActivityLogic from "./AdminUserActivityLogic";

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

const AdminUserActivityDesign = (props) => {
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
  } = AdminUserActivityLogic();

  return (
    <>
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
      <FormControl sx={{ mb: 2, width: 250 }}>
        {/* <InputLabel id="demo-simple-select-label">Select User To View</InputLabel> */}
        <TextField
          select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={}
          label="Select User To View"
          onChange={(e) => {
            setEditIdForData(e.target.value);
            console.log("target", e.target.value);
            fetchUserActivity(e.target.value);
          }}
        >
          {Object.keys(getById).map((option) => (
            <MenuItem key={getById[option].fullName} value={getById[option].id}>
              {getById[option].fullName}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>

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
                <StyledTableCell align="left">{item.label}</StyledTableCell>
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
                  {row.operationName}
                </StyledTableCell>
                <StyledTableCell align="left">{row.createdOn}</StyledTableCell>
                {/* <StyledTableCell align="left">{row.id}</StyledTableCell> */}
                <StyledTableCell align="left">
                  <Button
                    onClick={() => {
                      handleOpen();
                      setUserChangeData(row.userActivity);
                    }}
                  >
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
    </>
  );
};

export default AdminUserActivityDesign;
