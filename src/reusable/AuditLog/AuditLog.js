import React, { useState,useEffect, forwardRef, useImperativeHandle } from "react";
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
import handlers from "../../handlers";
import { useSelector } from "react-redux";

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

const AuditLog = forwardRef((props, ref) => {
  const { sectionId, dataId } = props;
  const [isAuditLogModal, setIsAuditLogModal] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAuditLogEditId, setIsAuditLogEditId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [tblLogData, setTblLogData] = useState([]);
  const [logChageData, setLogChageData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [editIdForData,setEditIdForData] = useState("")

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const AuditLogDataId = useSelector((state) => state.auditLog.data)

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

  //Fetch All Log Details
  //   fetchLogDetails = async () => {
  //     try {
  //       let response = await handlers.auditLog.fetchAllAuditLog(
  //         sectionId,
  //         dataId
  //       );
  //       let refineData = response
  //         ? response.map((item, index) => {
  //             return {
  //               PersonName: item.userName,
  //               OperationName: item.operationName,
  //               Date: moment(item.createdOn, "YYYY-MM-DD").format("MM/DD/YYYY"),
  //               UpdateFile: item.updatedFiled
  //                 ? Object.entries(JSON.parse(item.updatedFiled))
  //                 : [],
  //               id: item.id,
  //             };
  //           })
  //         : [];
  //       setTblLogData(refineData);
  //     } catch (err) {
  //       console.error("fetchLogDetails", err);
  //     }
  //   };

  useImperativeHandle(ref, () => ({
    test() {
      console.log("parent function");
    }
  }));


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event, row) => {
    setPage(0);
    setRowsPerPage(row.props.value);
  };

  return (
    <>
    <h2>data id:{AuditLogDataId}</h2>
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
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  {/* <StyledTableCell align="left">{row.calories}</StyledTableCell> */}
                  <StyledTableCell align="left">{row.fat}</StyledTableCell>
                  <StyledTableCell align="left">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="left">{row.protein}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Button onClick={handleOpen}>
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
            count={rows.length}
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
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="left">Calories</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.calories}</TableCell>
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
});



export default AuditLog;
