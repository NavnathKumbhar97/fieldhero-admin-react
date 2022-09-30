import { React, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Backdrop, Box, Button, CircularProgress, Dialog, Stack } from "@mui/material";
import ContentLogic from "./ContentLogic";
import { Download, Edit, ViewAgenda, Visibility } from "@mui/icons-material";

export default function ContentDesign(props) {
  const { data } = props;

  let {
    order,
    orderBy,
    selected,
    page,
    rowsPerPage,
    tblData,
    dense,
    rows,
    handleChangeRowsPerPage,
    handleChangePage,
    handleSelectAllClick,
    handleRequestSort,
    setModalTitle,
    pageTitle,
    setPageTitle,
    EnhancedTableToolbar,
    stableSort,
    EnhancedTableHead,
    emptyRows,
    setTblHeader,
    setPageName,
    setButtonText,
    canMasterTblHerader,
    candUploadBatch,
    canVerification,
    agentMaster,
    agentPricingTemplate,
    adminCanUploadBatch,
    categoryMaster,
    companyMaster,
    customerMaster,
    industryMaster,
    roleMaster,
    skillSetMaster,
    subscriptionMaster,
    userMaster,
    getAllData,
    tblDataCount,
    loader,
    handleCloseLoader,
    setEditId,
    setEditStatus,
    editId,
    setCategoryData,
  } = ContentLogic();

  useEffect(() => {
    setPageName(data.page);
    console.log(data.page);
    setPageTitle(data.pageTitle);
    setButtonText(data.buttonText);
    setModalTitle(data.modalTitle);
    getAllData(data.page);


    if (data.page === "candidate-master") {
      setTblHeader(canMasterTblHerader);
    }
    if (data.page === "candidate-upload-batch") {
      setTblHeader(candUploadBatch);
    }
    if (data.page === "candidate-verification") {
      setTblHeader(canVerification);
    }
    if (data.page === "agent-master") {
      setTblHeader(agentMaster);
    }
    if (data.page === "agent-pricing-template") {
      setTblHeader(agentPricingTemplate);
    }
    if (data.page === "candidate-upload-batch-admin") {
      setTblHeader(adminCanUploadBatch);
    }
    if (data.page === "category") {
      setTblHeader(categoryMaster);
    }
    if (data.page === "company") {
      setTblHeader(companyMaster);
    }
    if (data.page === "customer") {
      setTblHeader(customerMaster);
    }
    if (data.page === "industry") {
      setTblHeader(industryMaster);
    }
    if (data.page === "role") {
      setTblHeader(roleMaster);
    }
    if (data.page === "skillset") {
      setTblHeader(skillSetMaster);
    }
    if (data.page === "subscription") {
      setTblHeader(subscriptionMaster);
    }
    if (data.page === "user") {
      setTblHeader(userMaster);
    }
  }, [data.page,rowsPerPage]);

  //handle the table data 
  const handleTblData = () => {
    switch (data.page) {
      case "candidate-master":
        return <>
        {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary"  />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i+1}
                  </TableCell>

                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {tblData[item].id}
                  </TableCell>
                  <TableCell align="left">{tblData[item].fullName}</TableCell>
                  <TableCell align="left">
                    {tblData[item].contactNo}
                  </TableCell>
                  <TableCell align="left">{tblData[item].isActive}</TableCell>
                </TableRow>
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </>
            ))}
        </>;
      
      case "candidate-upload-batch":
        return <>
        {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i+1}
                  </TableCell>

                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {tblData[item].id}
                  </TableCell>
                  <TableCell align="left">{tblData[item].fullName}</TableCell>
                  <TableCell align="left">
                    {tblData[item].contactNo}
                  </TableCell>
                  <TableCell align="left">{tblData[item].isActive}</TableCell>
                </TableRow>
              </>
            ))}
        </>;
      
      case "candidate-verification":
        return (<>
        {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>

                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i+1}
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {tblData[item].id}
                  </TableCell>
                 
                  <TableCell align="left">{tblData[item].fullName}</TableCell>
                  <TableCell align="left">
                    {tblData[item].contactNo1}
                  </TableCell>
                  <TableCell align="left">{tblData[item].batchNo}</TableCell>
                  <TableCell align="left">{tblData[item].createdOn}</TableCell>
                  <TableCell align="left">{tblData[item].modifiedOn}</TableCell>
                  <TableCell align="left">{tblData[item].callStatus}</TableCell>
                  <TableCell align="left">{tblData[item].candidateConsent}</TableCell>
                  <TableCell align="left"><Button><Edit/>Edit</Button></TableCell>
                </TableRow>
              </>
            ))}
        </>);
      
      case "agent-master":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i+1}
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {tblData[item].id}
                  </TableCell>
                  <TableCell align="left">{tblData[item].agentNo}</TableCell>
                  <TableCell align="left">{tblData[item].fullName}</TableCell>
                  <TableCell align="left">
                    {tblData[item].contactNo}
                  </TableCell>
                  <TableCell align="left">{tblData[item].email}</TableCell>
                  <TableCell align="left">{tblData[item].isActive}</TableCell>
                </TableRow>
              </>
            ))}
          </>
        );

      case "agent-pricing-template":
        return (
          <>
          {Object.keys(tblData).map((item, i) => (
            <>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i+1}
                  </TableCell>
                <TableCell
                  component="th"
                  // id={labelId}
                  scope="row"
                  padding="none"
                >
                  {tblData[item].id}
                </TableCell>
                <TableCell align="left">{tblData[item].templateName}</TableCell>
                <TableCell align="left">{tblData[item].description}</TableCell>
                <TableCell align="left">
                  {tblData[item].totalAmount}
                </TableCell>
                <TableCell align="left">{tblData[item].isActive}</TableCell>
                <TableCell align="left"><Button><Visibility/>View</Button></TableCell>
              </TableRow>
            </>
          ))}
        </>
        )
      
      case "candidate-upload-batch-admin":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i+1}
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {tblData[item].id}
                  </TableCell>
                  <TableCell align="left">{tblData[item].timestamp}</TableCell>
                  <TableCell align="left">{tblData[item].count}</TableCell>
                  <TableCell align="left">
                    {tblData[item].status}
                  </TableCell>
                  <TableCell align="left">{tblData[item].email}</TableCell>
                  <TableCell align="left">{tblData[item].approvedCount}</TableCell>
                  <TableCell align="left">{tblData[item].rejectedCount}</TableCell>
                  <TableCell align="left">{tblData[item].templateName}</TableCell>
                  <TableCell align="left">{tblData[item].createdBy}</TableCell>
                  <TableCell align="left">{tblData[item].role}</TableCell>
                  <TableCell align="center"><Button><Download/></Button></TableCell>
                </TableRow>
              </>
            ))}
          </>
        )

      case "category":
        return (
          <>
          {Object.keys(tblData).map((item, i) => (
            <>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" onClick={()=>{
                  setEditId(tblData[item].id);
                  setEditStatus(true)
                  setCategoryData(tblData[item])
                  console.log(editId);}}/>
                </TableCell>
                <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i+1}
                  </TableCell>

                <TableCell align="left">{tblData[item].title}</TableCell>
                <TableCell align="left">{tblData[item].isActive}</TableCell>
              </TableRow>
            </>
          ))}
        </>
        )
        
      case "company":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i+1}
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                    align="left"
                  >
                    {tblData[item].companyName}
                  </TableCell>
                  <TableCell align="left">{tblData[item].industry}</TableCell>
                  <TableCell align="left">{tblData[item].isActive}</TableCell>
                  
                </TableRow>
              </>
            ))}
          </>
        )

      case "customer":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i+1}
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {tblData[item].id}
                  </TableCell>
                  <TableCell align="left">{tblData[item].agentNo}</TableCell>
                  <TableCell align="left">{tblData[item].fullName}</TableCell>
                  <TableCell align="left">
                    {tblData[item].contactNo}
                  </TableCell>
                  <TableCell align="left">{tblData[item].email}</TableCell>
                  <TableCell align="left">{tblData[item].isActive}</TableCell>
                </TableRow>
              </>
            ))}
          </>
        )
      
      case "industry":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i+1}
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                    align="left"
                  >
                    {tblData[item].title}
                  </TableCell>
                  <TableCell align="left">{tblData[item].isActive}</TableCell>
                </TableRow>
              </>
            ))}
          </>
        )
      case "role":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i+1}
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                    align="left"
                  >
                    {tblData[item].name}
                  </TableCell>
                  <TableCell align="left">{tblData[item].isActive}</TableCell>
                </TableRow>
              </>
            ))}
          </>
        )
      case "skillset":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i+1}
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                    align="left"
                  >
                    {tblData[item].title}
                  </TableCell>
                  <TableCell align="left">{tblData[item].isActive}</TableCell>
                </TableRow>
              </>
            ))}
          </>
        )
      case "subscription":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i+1}
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                    align="left"
                  >
                    {tblData[item].planName}
                  </TableCell>
                  <TableCell align="left">{tblData[item].dataCount}</TableCell>
                  <TableCell align="left">{tblData[item].isActive}</TableCell>
                </TableRow>
              </>
            ))}
          </>
        )
      case "user":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i+1}
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                    align="left"
                  >
                    {tblData[item].fullName}
                  </TableCell>
                  <TableCell align="left">{tblData[item].email}</TableCell>
                  <TableCell align="left">{tblData[item].role}</TableCell>
                  <TableCell align="left">{tblData[item].isActive}</TableCell>
                </TableRow>
              </>
            ))}
          </>
        )
      default:
        break;
    }
  };

  //handle the table based routes
  const handleTable = () => {
    switch (data.page) {
      case "batch-priority":
        return null;
      case "other-industry-category":
        return null;

      default:
        return (
          <>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
                
              >
                <EnhancedTableHead
                  // numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {handleTblData()}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              defaultPageSize={10}
              component="div"
              count={tblDataCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        );
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
         />
        <Backdrop
        sx={{color: '#bc48ff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        {/* <Dialog open={loader} onClose={handleCloseLoader}>
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
          <CircularProgress color="secondary" />
        </Stack>
        </Dialog> */}
        {handleTable()}
      </Paper>
    </Box>
  );
}
