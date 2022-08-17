import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";

function createData(sr, document, value, upload, status, comments) {
  return { sr, document, value, upload, status, comments };
}

const rows = [
  createData(
    1,
    "Pan card",
    <TextField id="outlined-basic" label="Select" variant="outlined" />,
    <TextField id="outlined-basic" variant="outlined" />,
    <input type="file" />,
    4.0
  ),
  createData(
    2,
    "Proof of identity",
    <TextField label="Select" id="outlined-basic" variant="outlined" />,
    <TextField id="outlined-basic" variant="outlined" />,
    <input type="file" />
  ),
  createData(
    3,
    "Proof of address",
    <TextField id="outlined-basic" label="Select" variant="outlined" />,
    <TextField id="outlined-basic" variant="outlined" />,
    <input type="file" />
  ),
  createData(
    4,
    "Bank Document",
    <TextField id="outlined-basic" label="Select" variant="outlined" />,
    <TextField id="outlined-basic" variant="outlined" />,
    <input type="file" />
  ),
];

export default function ProfessionalTab() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr</TableCell>
            <TableCell align="center">Document</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Value</TableCell>
            <TableCell align="center">Upload</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sr}
              </TableCell>
              <TableCell align="center">{row.document}</TableCell>
              <TableCell align="center">{row.value}</TableCell>
              <TableCell align="right">{row.upload}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
