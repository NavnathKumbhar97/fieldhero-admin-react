import {React, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Backdrop, Button, CircularProgress, TablePagination } from '@mui/material';
import handlers from '../../handlers';
import generalHandlers from '../../handlers/generalHandlers';
import moment from 'moment';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function CallHostry(editid) {
    const [callHistoryData,setCallHistoryData] = useState([])
    const [loader,setLoader] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);


    const callHistoryAPICalls=()=>{
        console.log("Edit",editid);
        let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    generalHandlers
      .dataGet(
        `/v1/candidate-verifications/${editid.callCenter}`,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setCallHistoryData(response.data.data.callCentre);
          console.log("response.data.data.callCentre",response.data.data.callCentre);
        } else if (response.status == 400) {
          console.log("something is wrong");
        }
      })
      .catch((error) => {
        setLoader(false);
        console.error("There was an error!- getIndustryAPIcall", error);
      });
    }
    useEffect(()=>{
        callHistoryAPICalls()
    },[editid.callCenter])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

        // Calculate the starting index and ending index for the current page.
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Slice the callHistoryData array based on the current page and rowsPerPage.
  const paginatedData = callHistoryData.slice(startIndex, endIndex);

  return (<>
 
    <h3>Call Centre History ({callHistoryData.length})</h3>
    
    <TableContainer component={Paper}>
        <Backdrop
            sx={{
              color: "#7d1810",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={loader}
          >
            <CircularProgress size={130} thickness={2} color="inherit" />
          </Backdrop>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Date and Time</TableCell>
            <TableCell align="left">Call Status</TableCell>
            <TableCell align="left">Consent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((row) => (
            <TableRow
              key={row.createdOn}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
                {moment(row.createdOn).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell align="left">{row.callStatus}</TableCell>
              <TableCell align="left">{row.candidateConsent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={callHistoryData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
    </>
  );
}