import { React, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import ContentLogic from "./ContentLogic";
import { Download, Edit, Visibility } from "@mui/icons-material";
import ArticleIcon from '@mui/icons-material/Article';
import moment from "moment";

export default function ContentDesign(props) {
  const { data } = props;

  let {
    order,
    orderBy,
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
    // EnhancedTableToolbar,
    handleCloseConfirmation,
    handleOpenConfirmation,
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
    setRoleData,
    setCategoryData,
    setCompanyData,
    setIndustryData,
    setSkillSetData,
    setSubscriptionData,
    setUserData,
    setCandidateMasterData,
    handleClickOpen,
    getCandidateVerificationById,
    getAgentPricingTemplateById,
    setAgentMasterData,
    setCandidateUploadBatchAdminData,
    setCandidateUploadBatchAdminSelect,
    handleCommonModal,
    handleTableDesign,
    handleOpenCandidateModal,
    getCandidateMsaterAPIcallById,
    getAgentMasteById,
    getCategoryById,
    getCompanyAPIcallById,
    getIndustryById,
    getRoleByIdAPIcall,
    getSkillSetById,
    getSubscriptionByIdAPIcall,
    getUserAPIcallById,
    filterTableOnTabs
  } = ContentLogic();

  useEffect(() => {
    setPageName(data.page);
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
  }, [data.page, rowsPerPage]);

  //handle the table data
  const handleTblData = () => {
    switch (data.page) {
      case "candidate-master":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditId(tblData[item].id);
                          setEditStatus(true);
                          setCandidateMasterData(tblData[item]);
                        } else {
                          setEditStatus(false);
                          setCandidateMasterData([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    align="left"
                    scope="row"
                    padding="none"
                  >
                    {i + 1}
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
                  <TableCell align="left">{tblData[item].contactNo1}</TableCell>
                  <TableCell align="left">
                    {tblData[item].isActive === true ? (
                      <p
                        style={{
                          border: "1px solid green",
                          borderRadius: "15px",
                          width: "50px",
                          padding: "3px",
                          color: "green",
                        }}
                      >
                        Active
                      </p>
                    ) : (
                      <p
                        style={{
                          border: "1px solid red",
                          borderRadius: "15px",
                          width: "50px",
                          padding: "3px",
                          color: "red",
                        }}
                      >
                        Inactive
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      style={{ color: "brown", marginLeft: "-10px" }}
                      onClick={() => {
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        getCandidateMsaterAPIcallById(tblData[item].id);
                        handleOpenCandidateModal();
                      }}
                    >
                      <Edit /> Edit
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        );

      case "candidate-upload-batch":
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
                    {i + 1}
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
                  <TableCell align="left">{tblData[item].status}</TableCell>
                  <TableCell align="left">{tblData[item].status}</TableCell>
                  <TableCell align="left">
                    {tblData[item].approvedCount}
                  </TableCell>
                  <TableCell align="left">
                    {tblData[item].rejectedCount}
                  </TableCell>
                  <TableCell align="left">
                    <Download></Download>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        );

      case "candidate-verification":
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
                    {i + 1}
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
                  <TableCell align="left">{tblData[item].contactNo1}</TableCell>
                  <TableCell align="left">{tblData[item].batchNo}</TableCell>
                  <TableCell align="left">{moment(tblData[item].createdOn).format('DD/MM/YYYY')}</TableCell>
                  <TableCell align="left">{moment(tblData[item].modifiedOn).format('DD/MM/YYYY')}</TableCell>
                  <TableCell align="left">{tblData[item].candidateConsent}</TableCell>
                  <TableCell align="left">
                    {tblData[item].callStatus}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getCandidateVerificationById(tblData[item].id);
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        );

      case "agent-master":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditId(tblData[item].id);
                          setEditStatus(true);
                          setAgentMasterData(tblData[item]);
                        } else {
                          setEditStatus(false);
                          setAgentMasterData([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i + 1}
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
                  <TableCell align="left">{tblData[item].contactNo}</TableCell>
                  <TableCell align="left">{tblData[item].email}</TableCell>
                  <TableCell align="left">
                    {tblData[item].isActive === true ? (
                      <p
                        style={{
                          border: "1px solid green",
                          borderRadius: "15px",
                          width: "50px",
                          padding: "3px",
                          color: "green",
                        }}
                      >
                        Active
                      </p>
                    ) : (
                      <p
                        style={{
                          border: "1px solid red",
                          borderRadius: "15px",
                          width: "60px",
                          padding: "3px",
                          color: "red",
                        }}
                      >
                        Inactive
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getAgentMasteById(tblData[item].id);
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>
                  </TableCell>
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
                    <Checkbox
                      color="primary"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditId(tblData[item].id);
                          setEditStatus(true);
                        } else {
                          setEditStatus(false);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i + 1}
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {tblData[item].id}
                  </TableCell>
                  <TableCell align="left">
                    {tblData[item].templateName}
                  </TableCell>
                  <TableCell align="left">
                    {tblData[item].description}
                  </TableCell>
                  <TableCell align="left">
                    {tblData[item].totalAmount}
                  </TableCell>
                  <TableCell align="left">
                    {tblData[item].isActive === true ? (
                      <p
                        style={{
                          border: "1px solid green",
                          borderRadius: "15px",
                          width: "50px",
                          padding: "3px",
                          color: "green",
                        }}
                      >
                        Active
                      </p>
                    ) : (
                      <p
                        style={{
                          border: "1px solid red",
                          borderRadius: "15px",
                          width: "58px",
                          padding: "3px",
                          color: "red",
                        }}
                      >
                        Inactive
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getAgentPricingTemplateById(tblData[item].id);
                      }}
                    >
                      <Visibility />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        );

      case "candidate-upload-batch-admin":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              // console.log(tblData[item].AgentPricingTemplate),
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditId(tblData[item].id);
                          setEditStatus(true);
                          setCandidateUploadBatchAdminData(tblData[item]);
                          setCandidateUploadBatchAdminSelect(tblData[item]);
                          console.log(tblData[item]);
                        } else {
                          setEditStatus(false);
                          setCandidateUploadBatchAdminData([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i + 1}
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {tblData[item].id}
                  </TableCell>
                  {/* <TableCell align="left">{moment(tblData[item].timestamp).format('DD/MM/YYYY')}</TableCell> */}
                  <TableCell align="left">{tblData[item].count}</TableCell>
                  <TableCell align="left">{tblData[item].status}</TableCell>
                  {/* <TableCell align="left">{tblData[item].email}</TableCell> */}
                  <TableCell align="left">
                    {tblData[item].approvedCount}
                  </TableCell>
                  <TableCell align="left">
                    {tblData[item].rejectedCount}
                  </TableCell>
                  {/* <TableCell align="left">{tblData[item].templateName}</TableCell> */}
                  <TableCell align="left">{tblData[item].createdBy}</TableCell>
                  <TableCell align="left">{tblData[item].role}</TableCell>
                  <TableCell align="center">
                    {filterTableOnTabs==="pending-approval"?<Button onClick={(e)=>{
                      handleOpenConfirmation()
                      console.log("testing id",tblData[item].id)

                      }} title="Approval">
                      <ArticleIcon />
                    </Button>:null}
                    <Button title="Download Rejection Summary">
                      <Download />
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        );

      case "category":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditId(tblData[item].id);
                          setEditStatus(true);
                          setCategoryData(tblData[item]);
                        } else {
                          setEditStatus(false);
                          setCategoryData([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i + 1}
                  </TableCell>

                  <TableCell align="left">{tblData[item].title}</TableCell>
                  <TableCell align="left">
                    {tblData[item].isActive === true ? (
                      <p
                        style={{
                          border: "1px solid green",
                          borderRadius: "15px",
                          width: "50px",
                          padding: "3px",
                          color: "green",
                        }}
                      >
                        Active
                      </p>
                    ) : (
                      <p
                        style={{
                          border: "1px solid red",
                          borderRadius: "15px",
                          width: "58px",
                          padding: "3px",
                          color: "red",
                        }}
                      >
                        Inactive
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getCategoryById(tblData[item].id);
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        );

      case "company":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditId(tblData[item].id);
                          setEditStatus(true);
                          setCompanyData(tblData[item]);
                        } else {
                          setEditStatus(false);
                          setCompanyData([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i + 1}
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
                  <TableCell align="left">
                    {tblData[item].isActive === true ? (
                      <p
                        style={{
                          border: "1px solid green",
                          borderRadius: "15px",
                          width: "50px",
                          padding: "3px",
                          color: "green",
                        }}
                      >
                        Active
                      </p>
                    ) : (
                      <p
                        style={{
                          border: "1px solid red",
                          borderRadius: "15px",
                          width: "58px",
                          padding: "3px",
                          color: "red",
                        }}
                      >
                        Inactive
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getCompanyAPIcallById(tblData[item].id);
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        );

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
                    {i + 1}
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
                  <TableCell align="left">{tblData[item].contactNo}</TableCell>
                  <TableCell align="left">{tblData[item].email}</TableCell>
                  <TableCell align="left">
                    {tblData[item].isActive === true ? (
                      <p
                        style={{
                          border: "1px solid green",
                          borderRadius: "15px",
                          width: "50px",
                          padding: "3px",
                          color: "green",
                        }}
                      >
                        Active
                      </p>
                    ) : (
                      <p
                        style={{
                          border: "1px solid red",
                          borderRadius: "15px",
                          width: "58px",
                          padding: "3px",
                          color: "red",
                        }}
                      >
                        Inactive
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        );

      case "industry":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditId(tblData[item].id);
                          setEditStatus(true);
                          setIndustryData(tblData[item]);
                        } else {
                          setEditStatus(false);
                          setIndustryData([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i + 1}
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
                  <TableCell align="left">
                    {tblData[item].isActive === true ? (
                      <p
                        style={{
                          border: "1px solid green",
                          borderRadius: "15px",
                          width: "50px",
                          padding: "3px",
                          color: "green",
                        }}
                      >
                        Active
                      </p>
                    ) : (
                      <p
                        style={{
                          border: "1px solid red",
                          borderRadius: "15px",
                          width: "58px",
                          padding: "3px",
                          color: "red",
                        }}
                      >
                        Inactive
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getIndustryById(tblData[item].id);
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        );
      
      case "role":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditId(tblData[item].id);
                          setEditStatus(true);
                          setRoleData(tblData[item]);
                        } else {
                          setEditStatus(false);
                          setRoleData([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i + 1}
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
                  <TableCell align="left">
                    {tblData[item].isActive === true ? (
                      <p
                        style={{
                          border: "1px solid green",
                          borderRadius: "15px",
                          width: "50px",
                          padding: "3px",
                          color: "green",
                        }}
                      >
                        Active
                      </p>
                    ) : (
                      <p
                        style={{
                          border: "1px solid red",
                          borderRadius: "15px",
                          width: "58px",
                          padding: "3px",
                          color: "red",
                        }}
                      >
                        Inactive
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        );
      
      case "skillset":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditId(tblData[item].id);
                          setEditStatus(true);
                          setSkillSetData(tblData[item]);
                        } else {
                          setEditStatus(false);
                          setSkillSetData([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i + 1}
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
                  <TableCell align="left">
                    {tblData[item].isActive === true ? (
                      <p
                        style={{
                          border: "1px solid green",
                          borderRadius: "15px",
                          width: "50px",
                          padding: "3px",
                          color: "green",
                        }}
                      >
                        Active
                      </p>
                    ) : (
                      <p
                        style={{
                          border: "1px solid red",
                          borderRadius: "15px",
                          width: "58px",
                          padding: "3px",
                          color: "red",
                        }}
                      >
                        Inactive
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getSkillSetById(tblData[item].id);
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        );
      
      case "subscription":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditId(tblData[item].id);
                          setEditStatus(true);
                          setSubscriptionData(tblData[item]);
                        } else {
                          setEditStatus(false);
                          setSubscriptionData([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i + 1}
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
                  <TableCell align="left">
                    {tblData[item].isActive === true ? (
                      <p
                        style={{
                          border: "1px solid green",
                          borderRadius: "15px",
                          width: "50px",
                          padding: "3px",
                          color: "green",
                        }}
                      >
                        Active
                      </p>
                    ) : (
                      <p
                        style={{
                          border: "1px solid red",
                          borderRadius: "15px",
                          width: "58px",
                          padding: "3px",
                          color: "red",
                        }}
                      >
                        Inactive
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getSubscriptionByIdAPIcall(tblData[item].id);
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        );
      
      case "user":
        return (
          <>
            {Object.keys(tblData).map((item, i) => (
              <>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditId(tblData[item].id);
                          setEditStatus(true);
                          setUserData(tblData[item]);
                        } else {
                          setEditStatus(false);
                          setUserData([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    // id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {i + 1}
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
                  <TableCell align="left">
                    {tblData[item].isActive === true ? (
                      <p
                        style={{
                          border: "1px solid green",
                          borderRadius: "15px",
                          width: "50px",
                          padding: "3px",
                          color: "green",
                        }}
                      >
                        Active
                      </p>
                    ) : (
                      <p
                        style={{
                          border: "1px solid red",
                          borderRadius: "15px",
                          width: "58px",
                          padding: "3px",
                          color: "red",
                        }}
                      >
                        Inactive
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getUserAPIcallById(tblData[item].id);
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        );
    
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
                <TableBody>{handleTblData()}</TableBody>
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
      
      <Backdrop
        sx={{ color: "#7d1810", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress size={130} thickness={2} color="inherit" />
      </Backdrop>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {handleCommonModal()}
        {handleTableDesign()}
        {handleTable()}
      </Paper>
    </Box>
  );
}
