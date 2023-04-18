
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, TablePagination, TextField } from '@mui/material';
import LoginHistoryLogic from './LoginHistoryLogic';
import moment from 'moment';
import Button from '@mui/material/Button';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
];


export default function LoginHistoryDesign() {

  let {
    getLoginHistoryAPICall,
    loginHistory,
    isFilter,setIsFilter,
    rowsPerPage,
    selectionRange,handleSelect,
    page,setPage,handleChangePage,
    handleChangeRowsPerPage
  }= LoginHistoryLogic()

  useEffect(()=>{
    getLoginHistoryAPICall()
  },[rowsPerPage])

  return (
<>
{!isFilter?<Button style={{width:'20px',marginBottom:'5px'}} variant="contained" onClick={()=>setIsFilter(true)}>Filter</Button>
:<Button style={{width:'20px',marginBottom:'5px'}} variant="contained" onClick={()=>setIsFilter(false)}>Hide</Button>
}
{isFilter?<DateRangePicker ranges={[selectionRange]}
        onChange={handleSelect}>

</DateRangePicker>:""}

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Logged in Date and Time</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {loginHistory.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.userName}
              </StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{moment(row.loggedInTime).format('DD/MM/YYYY HH:mm:ss')}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination 
    rowsPerPageOptions={[5, 10, 25]}
    defaultPageSize={10}
    component="div"
    count={loginHistory.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    >

    </TablePagination>
    </>
  );
}