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
import helpers from "../../helpers";

export default function ContentDesign(props) {
  const { data } = props;

  //State And Method Import from Content Login
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
    setConfirmationData,
    confirmationData,
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
    filterTableOnTabs,
    setOpenApproval,
    getCandidateVerificationPassiveUpdate,
    handleUpdateAuditData,
    handleUpdateAuditDataAgentM,
    handleUpdateAuditDataAgentPricing,
    handleUpdateAuditDataCandidateVerification,
    handleUpdateAuditDataOtherMCategory,
    handleUpdateAuditDataOtherMCompany,
    handleUpdateAuditDataOtherMIndustry,
    handleUpdateAuditDataOtherMSkillSet,
    handleUpdateAuditDataOtherMSubscription,
    handleUpdateAuditDataOtherMUser,
    getCustomerById,handleUpdateAuditDataOtherMCustomer,
    getPermissionsAPIcall,
    handleUpdateAuditDataOtherMRole,
    checkUpdateRoleArray
  } = ContentLogic();

  //UseEffect For Page
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



  const localData = localStorage.getItem("user")
  let convertTokenToObj = JSON.parse(localData);

  const getAllPermission = convertTokenToObj.permissions

     // Candidate upload batch Array
     const candidateMasterArray = [
      helpers.permissions.candidate_update,
      
    ]
    const checkCandidateMasterArrayArray = candidateMasterArray.filter((data) =>
      getAllPermission.includes(data)
    )
     // Candidate upload batch Array
     const candidateVerificationArray = [
      helpers.permissions.candidate_verification_update,
      
    ]
    const checkCandidateVerificationArray = candidateVerificationArray.filter((data) =>
      getAllPermission.includes(data)
    )
     // Candidate upload batch Array
     const agentMasterArray = [
      helpers.permissions.agent_update,
      
    ]
    const checkAgentMasterArray = agentMasterArray.filter((data) =>
      getAllPermission.includes(data)
    )
     // Candidate upload batch Array
     const agentPricingTemlateArray = [
      helpers.permissions.agent_pricing_template_read,
      
    ]
    const checkAgentPricingTemlateArrayArray = agentPricingTemlateArray.filter((data) =>
      getAllPermission.includes(data)
    )
     // Candidate upload batch Array
     const adminCandidateUploadBatchArray = [
      helpers.permissions.admin_candidate_upload_batch_approval,
      
    ]
    const checkAdminCandidateUploadBatchArrayArray = adminCandidateUploadBatchArray.filter((data) =>
      getAllPermission.includes(data)
    )
     // Candidate upload batch Array
     const categoryArray = [
      helpers.permissions.category_update,
      
    ]
    const checkCategoryArray = categoryArray.filter((data) =>
      getAllPermission.includes(data)
    )
    
     // Candidate upload batch Array
     const companyArray = [
      helpers.permissions.company_update,
      
    ]
    const checkCompanyArray = companyArray.filter((data) =>
      getAllPermission.includes(data)
    )
     // Candidate upload batch Array
     const customerArray = [
      helpers.permissions.customer_subscription_update,
      
    ]
    const checkCustomerArray = customerArray.filter((data) =>
      getAllPermission.includes(data)
    )
     // Candidate upload batch Array
     const industryArray = [
      helpers.permissions.industry_update,
      
    ]
    const checkIndustryArray = industryArray.filter((data) =>
      getAllPermission.includes(data)
    )
     // Candidate upload batch Array
     const skillsetArray = [
      helpers.permissions.skill_update,
      
    ]
    const checkSkillsetArray = skillsetArray.filter((data) =>
      getAllPermission.includes(data)
    )
     // Candidate upload batch Array
     const subscriptionArray = [
      helpers.permissions.subscription_update,
      
    ]
    const checkSubscriptionArray = subscriptionArray.filter((data) =>
      getAllPermission.includes(data)
    )
     // Candidate upload batch Array
     const userArray = [
      helpers.permissions.user_update,
      
    ]
    const checkUserArray = userArray.filter((data) =>
      getAllPermission.includes(data)
    )

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
                  <TableCell align="center">{tblData[item].fullName}</TableCell>
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
                    {checkCandidateMasterArrayArray.length?<Button
                      style={{ color: "brown", marginLeft: "-10px" }}
                      onClick={() => {
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        getCandidateMsaterAPIcallById(tblData[item].id);
                        handleOpenCandidateModal();
                        handleUpdateAuditData(tblData[item].id)
                      }}
                    >
                      <Edit /> Edit
                    </Button>:""}
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
                    <Checkbox color="primary" onChange={(e) => {
                        if (e.target.checked) {
                          console.log("test 1",tblData[item]);
                          setEditId(tblData[item].id);
                          setEditStatus(true);
                          // setCandidateUploadBatchAdminData(tblData[item]);
                          setCandidateUploadBatchAdminSelect(tblData[item]);
                        } else {
                          setEditStatus(false);
                          setCandidateUploadBatchAdminData([]);
                        }
                      }}/>
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
                  <TableCell align="left">{moment(tblData[item].timestamp).format("DD/MM/YYYY")}</TableCell>
                  <TableCell align="left">{tblData[item].count}</TableCell>
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
                   {checkCandidateVerificationArray.length? <Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getCandidateVerificationById(tblData[item].id);
                        getCandidateVerificationPassiveUpdate()
                        handleUpdateAuditDataCandidateVerification(tblData[item].id)
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>:""}
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
                   {checkAgentMasterArray.length? <Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getAgentMasteById(tblData[item].id);
                        handleUpdateAuditDataAgentM(tblData[item].id)
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>:""}
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
                    {checkAgentPricingTemlateArrayArray.length?<Button
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getAgentPricingTemplateById(tblData[item].id);
                        handleUpdateAuditDataAgentPricing(tblData[item].id)
                      }}
                    >
                      <Visibility />
                      View
                    </Button>:""}
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
                          console.log("test 1",tblData[item]);
                          setEditId(tblData[item].id);
                          setEditStatus(true);
                          // setCandidateUploadBatchAdminData(tblData[item]);
                          setCandidateUploadBatchAdminSelect(tblData[item]);
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
                  <TableCell aria-label="Approval" align="center">
                    {filterTableOnTabs==="pending-approval"?(<>{checkAdminCandidateUploadBatchArrayArray.length?<Button onClick={(e)=>{
                      handleOpenConfirmation()
                      setOpenApproval(tblData[item].AgentPricingTemplate===null?false:true)
                      console.log("testing id",tblData[item].AgentPricingTemplate===null?"working":"not working")
                      setConfirmationData(tblData[item])
                      }} title="Approval">
                      <ArticleIcon />
                    </Button>:""}</>):null}
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
                    {checkCategoryArray.length?<Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true)
                        getCategoryById(tblData[item].id);
                        handleUpdateAuditDataOtherMCategory(tblData[item].id)
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>:""}
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
                    {checkCompanyArray.length?<Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getCompanyAPIcallById(tblData[item].id);
                        handleUpdateAuditDataOtherMCompany(tblData[item].id)
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>:""}
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
                    {tblData[item].fullName}
                  </TableCell>
                  {/* <TableCell align="left">{tblData[item].fullName}</TableCell> */}
                  <TableCell align="left">{tblData[item].companyName}</TableCell>
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
                    {checkCustomerArray.length?<Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        getCustomerById(tblData[item].id);
                        handleUpdateAuditDataOtherMCustomer(tblData[item].id)
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>:""}
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
                    <Checkbox/>
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
                    {checkIndustryArray.length?<Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getIndustryById(tblData[item].id);
                        handleUpdateAuditDataOtherMIndustry(tblData[item].id)
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>:""}
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
                  <TableCell align="left">
                    {checkUpdateRoleArray.length?<Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        setRoleData(tblData[item]);
                        getRoleByIdAPIcall(tblData[item].id);
                      getPermissionsAPIcall();
                      handleUpdateAuditDataOtherMRole(tblData[item].id);
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>:""}
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
                    {checkSkillsetArray.length?<Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getSkillSetById(tblData[item].id);
                        handleUpdateAuditDataOtherMSkillSet(tblData[item].id)
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>:""}
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
                    {checkSubscriptionArray.length?<Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        console.log(tblData[item].id);
                        getSubscriptionByIdAPIcall(tblData[item].id);
                        handleUpdateAuditDataOtherMSubscription(tblData[item].id)
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>:""}
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
                    {checkUserArray.length?<Button
                      style={{ color: "brown" }}
                      onClick={() => {
                        handleOpenCandidateModal();
                        setEditId(tblData[item].id);
                        setEditStatus(true);
                        getUserAPIcallById(tblData[item].id);
                        handleUpdateAuditDataOtherMUser(tblData[item].id)
                      }}
                    >
                      <Edit />
                      Edit
                    </Button>:""}
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
      case "login-history":
          return null;
      case "user-activity":
          return null;
      case "admin-user-activity":
          return null;
      case "admin-user-login-activity":
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
