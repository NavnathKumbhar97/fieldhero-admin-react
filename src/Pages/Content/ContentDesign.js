import { React, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import ContentLogic from "./ContentLogic";

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
    tblDataCount
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
                    <Checkbox color="primary" />
                  </TableCell>

                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {tblData[item].id}
                  </TableCell>
                  <TableCell align="center">{tblData[item].fullName}</TableCell>
                  <TableCell align="center">
                    {tblData[item].contactNo}
                  </TableCell>
                  <TableCell align="center">{tblData[item].isActive}</TableCell>
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
                    {tblData[item].id}
                  </TableCell>
                  <TableCell align="center">{tblData[item].fullName}</TableCell>
                  <TableCell align="center">
                    {tblData[item].contactNo}
                  </TableCell>
                  <TableCell align="center">{tblData[item].isActive}</TableCell>
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
                    {tblData[item].id}
                  </TableCell>
                  <TableCell align="center">{tblData[item].fullName}</TableCell>
                  <TableCell align="center">
                    {tblData[item].contactNo1}
                  </TableCell>
                  <TableCell align="center">{tblData[item].batchNo}</TableCell>
                  <TableCell align="center">{tblData[item].createdOn}</TableCell>
                  <TableCell align="center">{tblData[item].modifiedOn}</TableCell>
                  <TableCell align="center">{tblData[item].candidateConsent}</TableCell>
                  <TableCell align="center">{tblData[item].callStatus}</TableCell>
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
                    {tblData[item].id}
                  </TableCell>
                  <TableCell align="center">{tblData[item].agentNo}</TableCell>
                  <TableCell align="center">{tblData[item].fullName}</TableCell>
                  <TableCell align="center">
                    {tblData[item].contactNo}
                  </TableCell>
                  <TableCell align="center">{tblData[item].email}</TableCell>
                  <TableCell align="center">{tblData[item].isActive}</TableCell>
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
                  {tblData[item].id}
                </TableCell>
                <TableCell align="center">{tblData[item].templateName}</TableCell>
                <TableCell align="center">{tblData[item].description}</TableCell>
                <TableCell align="center">
                  {tblData[item].totalAmount}
                </TableCell>
                <TableCell align="center">{tblData[item].isActive}</TableCell>
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
                    {tblData[item].id}
                  </TableCell>
                  <TableCell align="center">{tblData[item].timestamp}</TableCell>
                  <TableCell align="center">{tblData[item].count}</TableCell>
                  <TableCell align="center">
                    {tblData[item].status}
                  </TableCell>
                  <TableCell align="center">{tblData[item].email}</TableCell>
                  <TableCell align="center">{tblData[item].approvedCount}</TableCell>
                  <TableCell align="center">{tblData[item].rejectedCount}</TableCell>
                  <TableCell align="center">{tblData[item].templateName}</TableCell>
                  <TableCell align="center">{tblData[item].createdBy}</TableCell>
                  <TableCell align="center">{tblData[item].role}</TableCell>
                </TableRow>
                {/* {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
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
                  <Checkbox color="primary" />
                </TableCell>

                <TableCell align="center">{tblData[item].title}</TableCell>
                <TableCell align="center">{tblData[item].isActive}</TableCell>
                {/* <TableCell align="center">
                  {tblData[item].contactNo}
                </TableCell>
                <TableCell align="center">{tblData[item].email}</TableCell>
                <TableCell align="center">{tblData[item].isActive}</TableCell> */}
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
                    align="center"
                  >
                    {tblData[item].companyName}
                  </TableCell>
                  <TableCell align="center">{tblData[item].industry}</TableCell>
                  <TableCell align="center">{tblData[item].isActive}</TableCell>
                  
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
                    {tblData[item].id}
                  </TableCell>
                  <TableCell align="center">{tblData[item].agentNo}</TableCell>
                  <TableCell align="center">{tblData[item].fullName}</TableCell>
                  <TableCell align="center">
                    {tblData[item].contactNo}
                  </TableCell>
                  <TableCell align="center">{tblData[item].email}</TableCell>
                  <TableCell align="center">{tblData[item].isActive}</TableCell>
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
                    align="center"
                  >
                    {tblData[item].title}
                  </TableCell>
                  <TableCell align="center">{tblData[item].isActive}</TableCell>
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
                    align="center"
                  >
                    {tblData[item].name}
                  </TableCell>
                  <TableCell align="center">{tblData[item].isActive}</TableCell>
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
                    align="center"
                  >
                    {tblData[item].title}
                  </TableCell>
                  <TableCell align="center">{tblData[item].isActive}</TableCell>
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
                    align="center"
                  >
                    {tblData[item].planName}
                  </TableCell>
                  <TableCell align="center">{tblData[item].dataCount}</TableCell>
                  <TableCell align="center">{tblData[item].isActive}</TableCell>
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
                    align="center"
                  >
                    {tblData[item].fullName}
                  </TableCell>
                  <TableCell align="center">{tblData[item].email}</TableCell>
                  <TableCell align="center">{tblData[item].role}</TableCell>
                  <TableCell align="center">{tblData[item].isActive}</TableCell>
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
                  numSelected={selected.length}
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
              defaultPageSize={5}
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
        <EnhancedTableToolbar numSelected={selected.length} />
        {handleTable()}
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
