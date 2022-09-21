import { forwardRef, React, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FormControl from "@mui/material/FormControl";
import Modal from '@mui/material/Modal';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormLabel,
  List,
  ListItem,
  MenuItem,
  Radio,
  RadioGroup,
  Tab,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import CandidateMasterLogic from "../../Container/Drawer/Candidate Master/CandidateMasterLogic";
import CandidateVerification from "../../Container/Drawer/Candidate Verification/CandidateVerification";
import AdminCanUploadBatch from "../../Container/Drawer/Admin-Candidate Upload Batch/AdminCanUploadBatch";
import BatchPriority from "../../Container/Drawer/Batch Priority/BatchPriority";
import OtherIndCategory from "../../Container/Drawer/Other Industry Category/OtherIndCategory";
import WorkExperiance from "../../Container/Drawer/Candidate Master/Work Experiance Modal/WorkExperiance";
import AddCertificates from "../../Container/Drawer/Candidate Master/Certificates/AddCertificates";
import { Info, PriorityHigh } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ProfessionalTab from "../../Container/Drawer/Agent Master/Professional Tab/ProfessionalTab";
import { Link } from "react-router-dom";
import Help from "../../Container/Drawer/Help/Help";
import handler from "../../handlers/generalHandlers";

const ContentLogic = (props) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageTitle, setPageTitle] = useState();
  const [buttonText, setButtonText] = useState();
  const [modalTitle, setModalTitle] = useState();
  const [tblData, setTblData] = useState([]);
  const [tblDataCount,setTblDataCount] = useState([])
  const [permissions,setPermissions] = useState([])

  const useStyles = makeStyles((theme) => {
    const appbarHeight = 64;
    return {
      root: { top: `${appbarHeight}px !important` },
    };
  });
  const [pageName, setPageName] = useState();
  const [tblHeader, setTblHeader] = useState([]);



  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function createData(name, calories, fat, carbs, protein) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
    };
  }

  const rows = [
    // createData("Test Name", "Test industry", "Test Status"),
    // createData("Test 2 Name", "Test 2 Industry", "Test Status"),
  ];

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

// table headings array
  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Company Name",
    },
    {
      id: "calories",
      numeric: true,
      disablePadding: false,
      label: "Industry",
    },
    {
      id: "fat",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
  ];
  const canMasterTblHerader = [
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "Id",
    },
    {
      id: "fullName",
      numeric: true,
      disablePadding: false,
      label: "Full Name",
    },
    {
      id: "contactNo",
      numeric: true,
      disablePadding: false,
      label: "Contact No",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
  ];
  const candUploadBatch = [
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "batchNo",
      numeric: false,
      disablePadding: true,
      label: "Batch No",
    },
    {
      id: "timeStamp",
      numeric: true,
      disablePadding: false,
      label: "Timestamp",
    },
    {
      id: "count",
      numeric: true,
      disablePadding: false,
      label: "Count",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "inProgress",
      numeric: true,
      disablePadding: false,
      label: "In-Progress",
    },
    {
      id: "approved",
      numeric: true,
      disablePadding: false,
      label: "Approved",
    },
    {
      id: "rejected",
      numeric: true,
      disablePadding: false,
      label: "Rejected",
    },
    {
      id: "download",
      numeric: true,
      disablePadding: false,
      label: "Download",
    },
  ];
  const canVerification = [
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "Id",
    },
    {
      id: "fullName",
      numeric: true,
      disablePadding: false,
      label: "Full Name",
    },
    {
      id: "contact",
      numeric: true,
      disablePadding: false,
      label: "Contact No",
    },
    {
      id: "batchNo",
      numeric: true,
      disablePadding: false,
      label: "Batch No",
    },
    {
      id: "assignedOn",
      numeric: true,
      disablePadding: false,
      label: "Assigned On",
    },
    {
      id: "lastUpdatedOn",
      numeric: true,
      disablePadding: false,
      label: "Last Updated On",
    },
    {
      id: "candidateConsent",
      numeric: true,
      disablePadding: false,
      label: "Candidate Consent",
    },
    {
      id: "callStatus",
      numeric: true,
      disablePadding: false,
      label: "Call Status",
    },
    {
      id: "actions",
      numeric: true,
      disablePadding: false,
      label: "Actions",
    },
  ];
  const agentMaster = [
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "Id",
    },
    {
      id: "agentNo",
      numeric: false,
      disablePadding: false,
      label: "Agent No",
    },
    {
      id: "fullName",
      numeric: true,
      disablePadding: false,
      label: "Full Name",
    },
    {
      id: "contact",
      numeric: true,
      disablePadding: false,
      label: "Contact No",
    },
    {
      id: "email",
      numeric: true,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
  ];
  const agentPricingTemplate = [
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "Id",
    },
    {
      id: "templateName",
      numeric: false,
      disablePadding: true,
      label: "Template Name",
    },
    {
      id: "Description",
      numeric: true,
      disablePadding: false,
      label: "Description",
    },
    {
      id: "totalAmount",
      numeric: true,
      disablePadding: false,
      label: "Total Amount",
    },

    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "actions",
      numeric: true,
      disablePadding: false,
      label: "Actions",
    },
  ];
  const adminCanUploadBatch = [
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "batchNo",
      numeric: false,
      disablePadding: true,
      label: "Batch No",
    },
    {
      id: "timestamp",
      numeric: false,
      disablePadding: true,
      label: "Timestamp",
    },
    {
      id: "count",
      numeric: true,
      disablePadding: false,
      label: "Count",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },

    {
      id: "inProgress",
      numeric: true,
      disablePadding: false,
      label: "In-Progress",
    },
    {
      id: "approved",
      numeric: true,
      disablePadding: false,
      label: "Approved",
    },
    {
      id: "rejected",
      numeric: true,
      disablePadding: false,
      label: "Rejected",
    },
    {
      id: "pricingTemplate",
      numeric: true,
      disablePadding: false,
      label: "Pricing Template",
    },
    {
      id: "owner",
      numeric: true,
      disablePadding: false,
      label: "Owner",
    },
    {
      id: "ownerRole",
      numeric: true,
      disablePadding: false,
      label: "Owner Role",
    },
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
    },
  ];
  const categoryMaster = [
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "categoryName",
      numeric: false,
      disablePadding: false,
      label: "Category Name",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
  ];
  const companyMaster = [
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "companyName",
      numeric: false,
      disablePadding: true,
      label: "Company Name",
    },
    {
      id: "industry",
      numeric: true,
      disablePadding: false,
      label: "Industry",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
  ];
  const customerMaster = [
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "fullName",
      numeric: false,
      disablePadding: true,
      label: "Full Name",
    },
    {
      id: "email",
      numeric: true,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
  ];
  const industryMaster = [
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "industryName",
      numeric: false,
      disablePadding: true,
      label: "Industry Name",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
  ];
  const roleMaster = [
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "roleName",
      numeric: false,
      disablePadding: true,
      label: "Role Name",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
  ];
  const skillSetMaster = [
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "skillName",
      numeric: false,
      disablePadding: false,
      label: "Skill Name",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
  ];
  const subscriptionMaster = [
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "subscriptionName",
      numeric: false,
      disablePadding: true,
      label: "Subscription Name",
    },
    {
      id: "Data Count",
      numeric: false,
      disablePadding: false,
      label: "Data Count",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
  ];
  const userMaster = [
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "fullName",
      numeric: false,
      disablePadding: true,
      label: "Full Name",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "role",
      numeric: false,
      disablePadding: false,
      label: "Role",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
  ];

  //candidate master
  const getCandidateMasterAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataGet(`/v1/candidates?limit=${rowsPerPage}&page=${page*rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setTblData(response.data.data.Candidates);
          console.log("tbldataCandidate",tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getCandidateMasterAPIcall", error);
      });
  };
  //candidate upload batch api call
  const getCandidateUploadBatchAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataGet("/v1/candidate-upload-batches", {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setTblData(response.data.data.items);
          console.log("candidate-upload-batches",tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getCandidateUploadBatchAPIcall", error);
      });
  };
 //fetch the agent master data 
  const getAgentMasterAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataGet(`/v1/agents?take=${rowsPerPage}&skip=${page*rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setTblData(response.data.data.result);
          setTblDataCount(response.data.data.count);
          console.log("tblData",tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getAgentMasterAPIcall", error);
      });
  };
  //fetch the candidate verification data 
  const getCandidateVerificationAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataGet(`/v1/candidate-verifications?take=${rowsPerPage}&skip=${page*rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setTblData(response.data.data.result);
          setTblDataCount(response.data.data.count);
          console.log("candidate verification",tblData);
         
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getCandidateVerificationAPIcall", error);
      });
  };
  //fetch the agent pricing template data 
  const getAgentTemplatePricingAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataGet(`/v1/agent-pricing-templates?take=${rowsPerPage}&skip=${page*rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setTblData(response.data.data.agentPricingTemplates);
          setTblDataCount(response.data.data.count);
          console.log("agent template data",tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getAgentTemplatePricingAPIcall", error);
      });
  };
  //fetch the candidate upload batch admin data 
  const getCandidateUploadBatchAdminAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataGet(`/v1/admin/candidate-upload-batches?limit=${rowsPerPage}&page=${page*rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setTblData(response.data.data.items);
          setTblDataCount(response.data.data.totalItems)
          console.log("upload batch ",tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getCandidateUploadBatchAdminAPIcall", error);
      });
  };
  //fetch the category data 
  const getCategoryAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataGet(`/v1/categories?take=${rowsPerPage}&skip=${page*rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}`}
      })
      .then((response) => {
        if (response.status == 200) {
          setTblData(response.data.data.categories);
          console.log("category",tblData);
          setTblDataCount(response.data.data.count)
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getCategoryAPIcall", error);
      });
  };
  //fetch the company data 
  const getCompanyAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataGet(`/v1/companies?take=${rowsPerPage}&skip=${page*rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setTblData(response.data.data.result);
          setTblDataCount(response.data.data.count)
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getCompanyAPIcall", error);
      });
  };
  //fetch the customer data 
  const getCustomerAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataGet(`/v1/customers?take=${rowsPerPage}&skip=${page*rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setTblData(response.data.data.result);
          setTblDataCount(response.data.data.count);
          console.log("customer",tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getCustomerAPIcall", error);
      });
  };
  //fetch the industry data 
  const getIndustryAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataGet(`/v1/industries?take=${rowsPerPage}&skip=${page*rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setTblData(response.data.data.industries);
          console.log("industry",tblData);
          setTblDataCount(response.data.data.count);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getIndustryAPIcall", error);
      });
  };
  //fetch the roles data 
  const getRoleAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataGet(`/v1/roles?take=${rowsPerPage}&skip=${page*rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setTblData(response.data.data.roles);
          setTblDataCount(response.data.data.count);
          console.log("roles",tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getRoleAPIcall", error);
      });
  };
  //fetch the skillset data 
  const getSkillSetAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataGet(`/v1/skills?take=${rowsPerPage}&skip=${page}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setTblData(response.data.data.skills);
          setTblDataCount(response.data.data.count);
          console.log("skill set",tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getSkillSetAPIcall", error);
      });
  };
  //fetch the subscriptions data 
  const getSubscriptionAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataGet(`/v1/subscriptions?take=${rowsPerPage}&skip=${page*rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setTblData(response.data.data.subscriptions);
          setTblDataCount(response.data.data.count);
          console.log("subscriptions",tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getSubscriptionAPIcall", error);
      });
  };
  //fetch the users data 
  const getUserAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataGet(`/v1/users?take=${rowsPerPage}&skip=${page*rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setTblData(response.data.data.result);
          setTblDataCount(response.data.data.count);
          console.log("users",tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getUserAPIcall", error);
      });
  };

 //fetch the all permissions onClick of new button for role module
 const getPermissionsAPIcall = async(e) =>{
  let authTok = localStorage.getItem("user"); // string
  let convertTokenToObj = JSON.parse(authTok);
  await handler
    .dataGet(`/v1/permissions`, {
      headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
    })
    .then((response) => {
      if (response.status == 200) {
        setPermissions(response.data);
        console.log("permissions",permissions);
      } else if (response.status == 400) {
        window.alert(response.data.message);
      }
    })
    .catch((error) => {
      console.error("There was an error!- getPermissionsAPIcall", error);
    });
} 


  //get all the based on routes with permissions
  const getAllData = (pageName) => {
    console.log("getallData pagename :",pageName);
    switch (pageName) {

      case "candidate-master":
        getCandidateMasterAPIcall();
        break;
      case "candidate-upload-batch":
        getCandidateUploadBatchAPIcall();
        break;
      case "candidate-verification":
        getCandidateVerificationAPIcall()
        break;
      case "agent-master":
        getAgentMasterAPIcall()
        break;
      case "agent-pricing-template":
        getAgentTemplatePricingAPIcall()
        break;
      case "candidate-upload-batch-admin":
        getCandidateUploadBatchAdminAPIcall()
        break;
      case "category":
        getCategoryAPIcall()
        break;
      case "company":
        getCompanyAPIcall()
        break;
      case "customer":
        getCustomerAPIcall()
        break;
      case "industry":
        getIndustryAPIcall()
        break;
      case "role":
        getRoleAPIcall()
        break;
      case "skillset":
        getSkillSetAPIcall()
        break;
      case "subscription":
        getSubscriptionAPIcall()
        break;
      case "user":
        getUserAPIcall()
        break;
      default:
        break;
    }
  };

  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;

    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow style={{backgroundColor:'black'}}>
          <TableCell padding="checkbox">
            <Checkbox style={{color:'white',paddingRight:'30px' }}
            label='My checkbox' 
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {tblHeader.map((headCell) => (
            <TableCell
            style={{color: 'white'}}
              key={headCell.id}
              align="left"
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  const steps = [
    "Select campaign settings",
    "Create an ad group",
    "Create an ad",
  ];

  const tblStyl = {
    border: "1px solid black",
    borderCollapse: "collapse",
  };
  const tblStyl1 = {
    border: "1px solid black",
    borderCollapse: "collapse",
    backgroundColor: "#FFFF00",
    color: "red",
  };
  const tblStyl2 = {
    border: "1px solid black",
    borderCollapse: "collapse",
    backgroundColor: "#FFC000",
    color: "black",
  };
  const tblStyl3 = {
    border: "1px solid black",
    borderCollapse: "collapse",
    backgroundColor: "rgb(255, 192, 0)",
  };
  const tblStyl4 = {
    color: "green",
    border: "1px solid black",
  };
  const gender = [
    {
      value: "MALE",
      label: "MALE",
    },
    {
      value: "FEMALE",
      label: "FEMALE",
    },
    {
      value: "OTHER",
      label: "OTHER",
    },
  ];
  const states = [
    {
      value:'Maharashtra',
      label:'Maharashtra'
    },
    {
      value:'Gujarat',
      label:'Gujarat'
    },
    {
      value:'Andhra Pradesh',
      label:'Andhra Pradesh'
    },
    {
      value:'Karnataka',
      label:'Karnataka'
    },
    {
      value:'Rajasthan',
      label:'Rajasthan'
    },
    {
      value:'Bihar',
      label:'Bihar'
    },
    {
      value:'Aasam',
      label:'Aasam'
    },
    {
      value:'Chattisgarh',
      label:'Chattisgarh'
    },
    {
      value:'M Pradesh',
      label:'M Pradesh'
    },
    {
      value:'Goa',
      label:'Goa'
    },
    {
      value:'Haryana',
      label:'Haryana'
    },
    {
      value:'Jharkhand',
      label:'Jharkhand'
    },
    {
      value:'Uttar Pradesh',
      label:'Uttar Pradesh'
    }
  ]
  const role = [
    {
      value:'Admin',
      label:'Admin'
    },
    {
      value:'Call Center Staff',
      label:'Call Center Staff'
    },
    {
      value:'HO Agent',
      label:'HO Agent'
    },
    {
      value:'User',
      label:'User'
    },

  ]

  const handleChangePage = (event, newPage) => {
   setPage(newPage)
    getAllData(pageName)
  };

  // onchange of number of rows data will refreshed and shows intable
  const handleChangeRowsPerPage = (event,row) => { 
    setPage(0)
    setRowsPerPage(row.props.value);
  };

  //defined states and inputs for modules
  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [openChildModal, setOpenChilModal] = useState(false);
    const [openChildModalCerti, setOpenChilModalCerti] = useState(false);
    const [tabValue, setTabValue] = useState("1");
    const [cmpyvalue, setCmpyValue] = useState("");
    const [openAdminCanUplBtch, setOpenAdminCanUplBtch] = useState(false);
    const [openAddBtchprty, setOpenAddBtchprty] = useState(false);
    //state for store the input fields value of industry
    const [categoryData, setCategoryData] = useState(
      {
        title:"",
        description:'',
        isActive:true
      }
    );

    //state for store the input fields value of industry
    const [companyData,setCompanyData] = useState({
      companyName:' ',
      description:'',
      isActive:true,
      industryId:''
  
    })

    //state for store the input fields value of industry 
    const [industryData,setIndustryData] = useState({
      title:'',
      description:'',
      isActive:true,
  
    })
    const [roleData,setRoleData] = useState({
      name:'',
      description:'',
      isActive:true,
  
    })
    const [skillSet,setSkillSet] = useState({
      title:'',
      description:'',
      isActive:true,
  
    })
    const [subscription,setSubscription] = useState({
      planName:'',
      dataCount:1,
      durationMonths:12,
      price:1999,
      note:'',
      isActive:true,
  
    })
    const [userData,setUserData] = useState({
      fullName:'',
      dob:'',
      gender:'',
      currAddress:'',
      currCity:'',
      currState:'',
      currCountry:'',
      currZip:'',
      permAddress:'',
      permCity:'',
      permState:'',
      permCountry:'',
      permZip:'',
      primaryLang:'',
      secondaryLang:'',
      thirdLang:'',
      aadharCard:'',
      panCard:'',
      note:'',
      email:'',
      contactNo:'',
      roleId:0,
      isActive:true,
  
    })

    // add API calls
  const addAPICalls = (pageName) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    switch (pageName) {
      case "category":
          handler
            .dataPost(`/v1/categories`, categoryData, {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            })
            .then((response) => {
              console.log(response);
              if (response.status == 201) {
                console.log(response.data.message);
                getCategoryAPIcall();
              } else {
                window.alert(response.data.message);
              }
            })
            .catch((error) => {
              if (error.status == 400) {
                window.alert(error.data.message);
              }
              console.error("There was an error!- getCategoryAPIcall", error);
            });
            break;
      case "company":
          handler
            .dataPost(`/v1/companies`, companyData, {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            })
            .then((response) => {
              console.log(response);
              if (response.status == 201) {
                console.log(response.data.message);
                getCompanyAPIcall()
              } else {
                window.alert(response.data.message);
              }
            })
            .catch((error) => {
              if (error.status == 400) {
                window.alert(error.data.message);
              }
              console.error("There was an error!- createCompany", error);
            });
        break;
      case "industry":
          handler
            .dataPost(`/v1/industries`, industryData, {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            })
            .then((response) => {
              console.log(response);
              if (response.status == 201) {
                console.log(response.data.message);
                getUserAPIcall()
              } else {
                window.alert(response.data.message);
              }
            })
            .catch((error) => {
              if (error.status == 400) {
                window.alert(error.data.message);
              }
              console.error("There was an error!- createCompany", error);
            });
        break;
      case "role":
          handler
            .dataPost(`/v1/roles`, roleData, {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            })
            .then((response) => {
              console.log(response);
              if (response.status == 201) {
                console.log(response.data.message);
                getRoleAPIcall()
              } else {
                window.alert(response.data.message);
              }
            })
            .catch((error) => {
              if (error.status == 400) {
                window.alert(error.data.message);
              }
              console.error("There was an error!- createCompany", error);
            });
        break;
      case "skillset":
          handler
            .dataPost(`/v1/skills`, skillSet, {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            })
            .then((response) => {
              console.log(response);
              if (response.status == 201) {
                console.log(response.data.message);
                getSkillSetAPIcall()
              } else {
                window.alert(response.data.message);
              }
            })
            .catch((error) => {
              if (error.status == 400) {
                window.alert(error.data.message);
              }
              console.error("There was an error!- createCompany", error);
            });
        break;
      case "subscription":
          handler
            .dataPost(`/v1/subscriptions`, subscription, {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            })
            .then((response) => {
              console.log(response);
              if (response.status == 201) {
                console.log(response.data.message);
                getSubscriptionAPIcall()
              } else {
                window.alert(response.data.message);
              }
            })
            .catch((error) => {
              if (error.status == 400) {
                window.alert(error.data.message);
              }
              console.error("There was an error!- createCompany", error);
            });
        break;      
      case "user":
          handler
            .dataPost(`/v1/users`, userData, {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            })
            .then((response) => {
              console.log(response);
              if (response.status == 201) {
                console.log(response.data.message);
                getUserAPIcall()
              } else {
                window.alert(response.data.message);
              }
            })
            .catch((error) => {
              if (error.status == 400) {
                window.alert(error.data.message);
              }
              console.error("There was an error!- createCompany", error);
            });
        break;
      
      
      default:
        break;
    }
  }

    const handleClickOpenAddBtchprty = () => {
      setOpenAddBtchprty(true);
    };

    const handleCloseAddBtchprty = () => {
      setOpenAddBtchprty(false);
    };

    const handleClickOpenAdminCanUplBtch = () => {
      setOpenAdminCanUplBtch(true);
    };

    const handleCloseAdminCanUplBtch = () => {
      setOpenAdminCanUplBtch(false);
    };

    const handleChangeTab = (event, newValue) => {
      setTabValue(newValue);
    };

    const handleClickOpenChildModal = () => {
      setOpenChilModal(true);
    };

    const handleClickOpenChildModalCerti = () => {
      setOpenChilModalCerti(true);
    };

    const handleCloseChildModal = () => {
      setOpenChilModal(false);
    };

    const handleCloseChildModalCerti = () => {
      setOpenChilModalCerti(false);
    };

    const isStepOptional = (step) => {
      return step === 1;
    };

    const isStepSkipped = (step) => {
      return skipped.has(step);
    };

    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    };

    const handleReset = () => {
      setActiveStep(0);
    };

    const handleClickOpen = (e) => {
     
      setOpenModal(true);
    };

    // download excel template on candidate upload batch module
    const onDownload = () => {
      const link = document.createElement("a");
      link.download = `download.txt`;
      link.href = "./download.txt";
      link.click();
    };

    const handleClose = () => {
      setOpenModal(false);
    };

    //it handle the buttons of content page
    const handleButtons = () => {
      switch (pageName) {
        case "candidate-master":
          return (
            <>
              {numSelected === 1 ? (
                <Button
                  style={{ marginTop: "80px", marginRight: "50px" }}
                  variant="outlined"
                >
                  <EditIcon />
                  Edit
                </Button>
              ) : (
                <Button
                  onClick={handleClickOpen}
                  style={{
                    marginTop: "0px",
                    // marginRight: "5px",
                    backgroundColor: "brown",
                    color: "white",
                  }}
                  variant="outlined"
                  >
                  <AddIcon />
                  {buttonText}
                </Button>
              )}
            </>
          );
        case "candidate-upload-batch":
          return (
            <>
              <Button
                onClick={handleClickOpen}
                style={{
                  marginTop: "80px",
                  marginRight: "0px",
                  backgroundColor: "brown",
                  color: "white",
                }}
                variant="outlined"
              >
                <FileUploadIcon />
                {buttonText}
              </Button>
            </>
          );

        case "candidate-verification":
          return (
            <>
              <Button
                style={{
                  marginTop: "80px",
                  marginRight: "0px",
                  backgroundColor: "brown",
                  color: "white",
                }}
                variant="outlined"
              >
                <AddIcon />
                {buttonText}
              </Button>
            </>
          );

        case "agent-master":
          return (
            <>
              {numSelected === 1 ? (
                <Button
                  style={{ marginTop: "50px", marginRight: "50px" }}
                  variant="outlined"
                  >
                  <EditIcon />
                  Edit
                </Button>
              ) : (
                <Button
                  onClick={handleClickOpen}
                  style={{
                    marginTop: "50px",
                    marginRight: "5px",
                    backgroundColor: "brown",
                    color: "white",
                  }}
                  variant="outlined"
                  >
                  <AddIcon />
                  {buttonText}
                </Button>
              )}
            </>
          );
        case "agent-pricing-template":
          return (
            <>
              {numSelected === 1 ? (
                <Button
                  style={{ marginTop: "80px", marginRight: "50px" }}
                  variant="outlined"
                  >
                  <EditIcon />
                  Edit
                </Button>
              ) : (
                <Button
                  onClick={handleClickOpen}
                  style={{
                    marginTop: "80px",
                    marginRight: "5px",
                    backgroundColor: "brown",
                    color: "white",
                  }}
                  variant="outlined"
                  >
                  <AddIcon />
                  {buttonText}
                </Button>
              )}
            </>
          );

        case "candidate-upload-batch-admin":
          return (
            <>
              <Button
                onClick={handleClickOpenAdminCanUplBtch}
                style={{
                  marginTop: "80px",
                  marginRight: "0px",
                  backgroundColor: "brown",
                  color: "white",
                }}
                variant="outlined"
              >
                <FileUploadIcon />
                {buttonText}
              </Button>
            </>
          );

        case "batch-priority":
          return (
            <>
              <Button
                onClick={handleClickOpenAddBtchprty}
                style={{
                  marginTop: "80px",
                  marginRight: "0px",
                  backgroundColor: "brown",
                  color: "white",
                }}
                variant="outlined"
              >
                <AddIcon />
                {buttonText}
              </Button>
            </>
          );
        case "other-industry-category":
          return null;

        case "customer":
          return null;
        case "role":
          return (
          <>
            {numSelected === 1 ? (
              <Button
                style={{ marginTop: "80px", marginRight: "50px" }}
                variant="outlined"

              >
                <EditIcon />
                Edit
              </Button>
            ) : (
              <Button
                onClick={()=>{handleClickOpen()
                getPermissionsAPIcall()
                }}
                style={{
                  marginTop: "80px",
                  marginRight: "5px",
                  backgroundColor: "brown",
                  color: "white",
                }}
                variant="outlined"
              >
                <AddIcon />
                {buttonText}
              </Button>
            )}
          </>
          )

        default:
          return (
            <>
              {numSelected === 1 ? (
                <Button
                  style={{ marginTop: "80px", marginRight: "50px" }}
                  variant="outlined"

                >
                  <EditIcon />
                  Edit
                </Button>
              ) : (
                <Button
                  onClick={handleClickOpen}
                  style={{
                    marginTop: "80px",
                    marginRight: "5px",
                    backgroundColor: "brown",
                    color: "white",
                  }}
                  variant="outlined"
                >
                  <AddIcon />
                  {buttonText}
                </Button>
              )}
            </>
          );
      }
    };

    // shows the content page design
    const renderDesign = () => {
      switch (pageTitle) {
        case "Candidate Master":
          return <CandidateMasterLogic />;

        case "Candidate Upload Batch":
          return null;

        case "Agent Master":
          return null;

        case "Batch Priority":
          return <BatchPriority />;

        case "Other Industry Category":
          return <OtherIndCategory />;

        case "Admin - Candidate Upload Batch":
          return <AdminCanUploadBatch />;

        case "Candidate Verification":
          return (
            <>
              <CandidateVerification />
              <TextField
                id="filled-basic"
                label="Search"
                variant="filled"
                style={{
                  width: "700px",
                  marginBottom: "20px",
                }}
              />
            </>
          );

        default:
          return (
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              style={{
                width: "700px",
                marginBottom: "20px",
              }}
            />
          );
      }
    };

    // its handle the module modal inputs
    const handlerModuleInputs = () => {
      switch (pageName) {
        case "candidate-master":
          return (
            <>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {/* Step {activeStep + 1} */}
                  {activeStep === 0 ? (
                    <List style={{ marginLeft: "100px" }}>
                      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <div
                          style={{
                            marginLeft: "200px",
                            marginBottom: "200px",
                            marginTop: "40px",
                          }}
                        >
                          <Button
                            style={{
                              backgroundColor: "brown",
                              color: "white",
                              fontSize: "15px bold",
                            }}
                          >
                            UPLOAD IMAGE
                          </Button>
                          <p
                            style={{ marginLeft: "130px", marginTop: "-30px" }}
                          >
                            (png,jpg)
                          </p>
                        </div>
                        <div>
                          <ListItem>
                            <TextField
                              id="filled-basic"
                              label="Full Name"
                              variant="filled"
                              sx={{ width: "69ch", mb: 4 }}
                            />
                          </ListItem>
                          <ListItem>
                            <TextField
                              id="filled-basic"
                              label="Birthdate"
                              InputLabelProps={{ shrink: true }}
                              type="date"
                              variant="filled"
                              sx={{ width: "69ch" }}
                            />
                          </ListItem>
                          <ListItem>
                            <FormControl>
                              <FormLabel id="demo-row-radio-buttons-group-label">
                                Gender
                              </FormLabel>
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                              >
                                <FormControlLabel
                                  value="male"
                                  control={<Radio />}
                                  label="Male"
                                />
                                <FormControlLabel
                                  value="female"
                                  control={<Radio />}
                                  label="Female"
                                />
                              </RadioGroup>
                            </FormControl>
                          </ListItem>

                          <ListItem sx={{ mb: 5 }}>
                            <TextField
                              fullWidth
                              sx={{ width: "140ch" }}
                              label="Permanent Address"
                              id="filled-basic"
                              multiline
                              rows={5}
                              variant="filled"
                            />
                          </ListItem>
                        </div>
                        <div>
                          <ListItem sx={{ mb: 5 }}>
                            <TextField
                              id="filled-basic"
                              label="City"
                              variant="filled"
                              sx={{ width: "69ch" }}
                            />
                            <TextField
                              id="filled-basic"
                              label="State"
                              variant="filled"
                              sx={{ ml: 3, width: "69ch" }}
                            />
                          </ListItem>
                          <ListItem sx={{ mb: 5 }}>
                            <TextField
                              id="filled-basic"
                              label="Country"
                              value="India"
                              disabled
                              variant="filled"
                              sx={{ width: "69ch" }}
                            />
                            <TextField
                              id="filled-basic"
                              label="Zip Code"
                              variant="filled"
                              sx={{ ml: 3, width: "69ch" }}
                            />
                          </ListItem>
                          <ListItem sx={{ mb: 5 }}>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Same as permanent address"
                            />
                          </ListItem>
                        </div>
                        <div>
                          <ListItem sx={{ mb: 5 }}>
                            <TextField
                              fullWidth
                              sx={{ width: "140ch" }}
                              label="Current Address"
                              id="filled-basic"
                              multiline
                              rows={5}
                              variant="filled"
                            />
                          </ListItem>
                          <ListItem sx={{ mb: 5 }}>
                            <TextField
                              id="filled-basic"
                              label="City"
                              variant="filled"
                              sx={{ width: "69ch" }}
                            />
                            <TextField
                              id="filled-basic"
                              label="State"
                              variant="filled"
                              sx={{ ml: 3, width: "69ch" }}
                            />
                          </ListItem>
                          <ListItem sx={{ mb: 5 }}>
                            <TextField
                              id="filled-basic"
                              label="Country"
                              value="India"
                              disabled
                              variant="filled"
                              sx={{ width: "69ch" }}
                            />
                            <TextField
                              id="filled-basic"
                              label="Zip Code"
                              variant="filled"
                              sx={{ ml: 3, width: "69ch" }}
                            />
                          </ListItem>
                          <ListItem sx={{ mb: 5 }}>
                            <TextField
                              id="filled-basic"
                              label="Primary email address"
                              variant="filled"
                              sx={{ width: "69ch" }}
                            />
                            <TextField
                              id="filled-basic"
                              label="Secondary email address"
                              variant="filled"
                              sx={{ ml: 3, width: "69ch" }}
                            />
                          </ListItem>
                          <ListItem sx={{ mb: 5 }}>
                            <TextField
                              id="filled-basic"
                              label="Primary contact no"
                              variant="filled"
                              sx={{ width: "69ch" }}
                            />
                            <TextField
                              id="filled-basic"
                              label="Secondary contact no"
                              variant="filled"
                              sx={{ ml: 3, width: "69ch" }}
                            />
                          </ListItem>
                          <ListItem sx={{ mb: 5 }}>
                            <TextField
                              id="filled-basic"
                              label="Aadhar no"
                              variant="filled"
                              sx={{ width: "69ch" }}
                            />
                            <TextField
                              id="filled-basic"
                              label="Status"
                              select
                              variant="filled"
                              sx={{ ml: 3, width: "69ch" }}
                            />
                          </ListItem>
                          <ListItem sx={{ mb: 5 }}>
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="Is Active"
                            />
                          </ListItem>
                        </div>
                        <div>
                          <ListItem>
                            <Button
                              style={{
                                backgroundColor: "grey",
                                color: "white",
                                margin: "10px",
                              }}
                              disabled={activeStep === 0}
                              onClick={handleBack}
                            >
                              PREV
                            </Button>
                            <Button
                              style={{
                                backgroundColor: "brown",
                                color: "white",
                                margin: "10px",
                              }}
                              onClick={handleNext}
                            >
                              SAVE AND NEXT
                            </Button>
                            <Button
                              onClick={handleNext}
                              style={{
                                backgroundColor: "brown",
                                color: "white",
                              }}
                            >
                              NEXT
                            </Button>
                            <Button
                              style={{
                                backgroundColor: "black",
                                color: "white",
                                marginLeft: "10px",
                              }}
                            >
                              EXIT
                            </Button>
                          </ListItem>
                        </div>
                      </Box>
                    </List>
                  ) : activeStep === 1 ? (
                    <List style={{ marginLeft: "100px", marginTop: "-50px" }}>
                      <Box>
                        <div>
                          <ListItem>
                            <h2>Total Work Experiance</h2>
                          </ListItem>
                          <ListItem>
                            <TextField
                              id="filled-basic"
                              label="Months"
                              variant="filled"
                              sx={{ width: "20ch" }}
                            />
                            <TextField
                              id="filled-basic"
                              label="Years"
                              variant="filled"
                              sx={{ width: "20ch", margin: "20px 20px" }}
                            />
                            <Button
                              style={{
                                color: "white",
                                backgroundColor: "brown",
                              }}
                            >
                              SAVE
                            </Button>
                          </ListItem>
                        </div>
                        <div>
                          <ListItem>
                            <h2>Work Experiance</h2>
                          </ListItem>
                          <ListItem>
                            <Button
                              onClick={handleClickOpenChildModal}
                              style={{
                                color: "white",
                                backgroundColor: "brown",
                              }}
                            >
                              <AddIcon />
                              Add
                            </Button>
                          </ListItem>
                          <ListItem>
                            <WorkExperiance />
                          </ListItem>
                        </div>
                        <div>
                          <ListItem>
                            <h2>Training/Certificates</h2>
                          </ListItem>
                          <ListItem>
                            <Button
                              onClick={handleClickOpenChildModalCerti}
                              style={{
                                color: "white",
                                backgroundColor: "brown",
                              }}
                            >
                              <AddIcon />
                              Add
                            </Button>
                          </ListItem>
                          <ListItem>
                            <AddCertificates />
                          </ListItem>
                        </div>
                        <div>
                          <ListItem>
                            <Button
                              style={{
                                backgroundColor: "brown",
                                color: "white",
                                margin: "10px",
                              }}
                              disabled={activeStep === 0}
                              onClick={handleBack}
                            >
                              PREV
                            </Button>

                            <Button
                              onClick={handleNext}
                              style={{
                                backgroundColor: "brown",
                                color: "white",
                              }}
                            >
                              NEXT
                            </Button>
                            <Button
                              style={{
                                backgroundColor: "black",
                                color: "white",
                                marginLeft: "10px",
                              }}
                            >
                              EXIT
                            </Button>
                          </ListItem>
                        </div>
                      </Box>
                    </List>
                  ) : null}
                </Typography>
              </Box>
              <div>
                <Dialog
                  maxWidth="xl"
                  open={openChildModal}
                  onClose={handleCloseChildModal}
                >
                  <DialogTitle>Add Work Experiance</DialogTitle>
                  <DialogContent>
                    <ListItem>
                      <TextField
                        id="name"
                        label="Company Name"
                        sx={{ width: "30ch" }}
                        variant="filled"
                      />
                      <TextField
                        id="name"
                        label="Skills"
                        sx={{ width: "30ch", ml: 4 }}
                        variant="filled"
                      />
                      <TextField
                        id="date"
                        label="Start Date"
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        sx={{ width: "30ch", ml: 4 }}
                        variant="filled"
                      />
                      <TextField
                        id="date"
                        label="End Date"
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        sx={{ width: "30ch", ml: 4 }}
                        variant="filled"
                      />
                    </ListItem>
                    <ListItem>
                      <TextField
                        fullWidth
                        sx={{ width: "140ch" }}
                        label="Descriptions About Experiance"
                        id="filled-basic"
                        multiline
                        rows={5}
                        variant="filled"
                      />
                    </ListItem>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseChildModal}>Close</Button>
                    <Button
                      style={{ backgroundColor: "brown", color: "white" }}
                      onClick={handleCloseChildModal}
                    >
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <div>
                <Dialog
                  maxWidth="xl"
                  open={openChildModalCerti}
                  onClose={handleCloseChildModalCerti}
                >
                  <DialogTitle>Add Certificate</DialogTitle>
                  <DialogContent>
                    <ListItem>
                      <TextField
                        id="name"
                        label="Certificate Name"
                        sx={{ width: "45ch" }}
                        variant="filled"
                      />
                      <TextField
                        id="name"
                        label="Certificate Type"
                        sx={{ width: "45ch", ml: 4 }}
                        variant="filled"
                      />
                      <TextField
                        id="name"
                        label="Issued By"
                        sx={{ width: "45ch", ml: 4 }}
                        variant="filled"
                      />
                    </ListItem>
                    <ListItem>
                      <TextField
                        id="name"
                        select
                        label="Skills"
                        sx={{ width: "45ch" }}
                        variant="filled"
                      />
                      <TextField
                        id="date"
                        label="Issued Date"
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        sx={{ width: "45ch", ml: 4 }}
                        variant="filled"
                      />
                    </ListItem>
                    <ListItem>
                      <TextField
                        fullWidth
                        sx={{ width: "145ch" }}
                        label="Descriptions About Certifiacte"
                        id="filled-basic"
                        multiline
                        rows={5}
                        variant="filled"
                      />
                    </ListItem>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseChildModalCerti}>Close</Button>
                    <Button
                      style={{ backgroundColor: "brown", color: "white" }}
                      onClick={handleCloseChildModalCerti}
                    >
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </>
          );

        case "candidate-upload-batch":
          return (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={onDownload}
                  style={{
                    backgroundColor: "#009688",
                    color: "white",
                    marginBottom: "20px",
                    marginTop: "20px",
                  }}
                >
                  <PriorityHigh />
                  Download Bulk Upload Template
                </Button>
                <label htmlFor="upload-photo">
                  <Button
                    component="span"
                    variant="contained"
                    style={{
                      color: "white",
                      background: "brown",
                      fontSize: "22px",
                    }}
                  >
                    <FileUploadIcon />
                    <input
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      style={{ display: "none" }}
                    />
                    Upload
                  </Button>
                </label>
                <p>
                  Total Records: <b>0</b>{" "}
                </p>
                <h2>Guidelines for uploading your data file</h2>
                <ListItem>
                  <ol>
                    <li>
                      Your data file should be in <b>MS Excel format(.xlsx).</b>{" "}
                      It must have<b> 4 mandatory columns.</b> It can have 18
                      columns and<b> column names</b> have to be{" "}
                      <b> exactly same as per the template</b> given above.
                      Column names are not case sensitive.
                    </li>
                    <li>
                      <b>
                        If you do not have value for the column, please leave it
                        blank.
                      </b>
                    </li>
                    <li>
                      File name can be anything. Data must have to be in the{" "}
                      <b>first sheet.</b>
                    </li>
                    <li>
                      Following are<b> mandatory fields</b>, if<b> anyone </b>{" "}
                      is missing, record will be rejected.
                      <ul>
                        <li>category</li>
                        <li>full_name</li>
                        <li>primary_mobile (has to be exact 10 digits)</li>
                        <li>curr_city</li>
                      </ul>
                    </li>
                    <li>
                      Following are <b>unique fields</b>
                      <ul>
                        <li>primary_mobile</li>
                        <li>primary_email</li>
                      </ul>
                    </li>
                    <li>
                      If there is any duplicate value found for <b>unique</b>{" "}
                      fields in Excel sheet or in our system database, that
                      value will be ignored(consider blank)
                    </li>
                    <li>
                      Following are accepted date formats. Columns which require
                      date values are:<b> birth_date.</b>
                      <ul>
                        <li>DD.MM.YY</li>
                        <li>DD-MM-YY</li>
                        <li>DD/MM/YY</li>
                        <li>DD.MM.YYYY</li>
                        <li>DD-MM-YYYY</li>
                        <li>DD/MM/YYYY</li>
                        <li>YYYY.MM.DD</li>
                        <li>YYYY-MM-DD</li>
                        <li>YYYY/MM/DD</li>
                        <li>
                          For ex.
                          <table style={tblStyl}>
                            <tr>
                              <td style={tblStyl}>20-10-1999</td>
                              <td style={tblStyl}>Accepted</td>
                            </tr>
                            <tr>
                              <td style={tblStyl}>1999-12-11</td>
                              <td style={tblStyl}>Accepted</td>
                            </tr>
                            <tr>
                              <td style={tblStyl}>4-10-1999</td>
                              <td style={tblStyl}>Ignored</td>
                            </tr>
                            <tr>
                              <td style={tblStyl}>4-4-1999</td>
                              <td style={tblStyl}>Ignored</td>
                            </tr>
                            <tr>
                              <td style={tblStyl}>10-4-1999</td>
                              <td style={tblStyl}>Ignored</td>
                            </tr>
                            <tr>
                              <td style={tblStyl}>1-4-99</td>
                              <td style={tblStyl}>Ignored</td>
                            </tr>
                          </table>
                        </li>
                      </ul>
                      <li>
                        Colors description in bulk upload template
                        <table style={tblStyl}>
                          <tr>
                            <th style={tblStyl3}>column_name</th>
                            <td style={tblStyl}>Non mandatory column</td>
                          </tr>
                          <tr>
                            <th style={tblStyl2}>column_name</th>
                            <td style={tblStyl}>Non mandatory unique column</td>
                          </tr>
                          <tr>
                            <th style={tblStyl1}>column_name</th>
                            <td style={tblStyl}>Mandatory column</td>
                          </tr>
                          <tr>
                            <th style={tblStyl2}>column_name</th>
                            <td style={tblStyl}>Mandatory unique column</td>
                          </tr>
                        </table>
                      </li>
                    </li>
                    <li>
                      Fields
                      <table style={tblStyl}>
                        <tr>
                          <th style={tblStyl}>Field name </th>
                          <th style={tblStyl}>Maximum length </th>
                          <th style={tblStyl}>Mandatory</th>
                          <th style={tblStyl}>Unique</th>
                        </tr>
                        <tr>
                          <th style={tblStyl2}>industry</th>
                          <td style={tblStyl}>80</td>
                          <td style={tblStyl}>No</td>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl1}>category</th>
                          <td style={tblStyl}>80</td>
                          <th style={tblStyl4}>Yes</th>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl1}>full_name</th>
                          <td style={tblStyl}>100</td>
                          <th style={tblStyl4}>Yes</th>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl2}>birth_date</th>
                          <td style={tblStyl}>Date</td>
                          <td style={tblStyl}>No</td>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl1}>primary_mobile</th>
                          <td style={tblStyl}>10</td>
                          <th style={tblStyl4}>Yes</th>
                          <th style={tblStyl4}>Yes</th>
                        </tr>
                        <tr>
                          <th style={tblStyl1}>curr_city</th>
                          <td style={tblStyl}>45</td>
                          <th style={tblStyl4}>Yes</th>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl2}>curr_pincode</th>
                          <td style={tblStyl}>6</td>
                          <td style={tblStyl}>No</td>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl2}>primary_email</th>
                          <td style={tblStyl}>80</td>
                          <td style={tblStyl}>No</td>
                          <th style={tblStyl4}>Yes</th>
                        </tr>
                        <tr>
                          <th style={tblStyl2}>primary_lang</th>
                          <td style={tblStyl}>15</td>
                          <td style={tblStyl}>No</td>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl2}>secondary_lang</th>
                          <td style={tblStyl}>15</td>
                          <td style={tblStyl}>No</td>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl2}>skill_1</th>
                          <td style={tblStyl}>45</td>
                          <td style={tblStyl}>No</td>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl2}>skill_2</th>
                          <td style={tblStyl}>45</td>
                          <td style={tblStyl}>No</td>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl2}>pref_location_1</th>
                          <td style={tblStyl}>80</td>
                          <td style={tblStyl}>No</td>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl2}>pref_location_2</th>
                          <td style={tblStyl}>80</td>
                          <td style={tblStyl}>No</td>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl2}>education</th>
                          <td style={tblStyl}>50</td>
                          <td style={tblStyl}>No</td>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl2}>exp_years</th>
                          <td style={tblStyl}>2</td>
                          <td style={tblStyl}>No</td>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl2}>last_company</th>
                          <td style={tblStyl}>100</td>
                          <td style={tblStyl}>No</td>
                          <td style={tblStyl}>No</td>
                        </tr>
                        <tr>
                          <th style={tblStyl2}>designation</th>
                          <td style={tblStyl}>80</td>
                          <td style={tblStyl}>No</td>
                          <td style={tblStyl}>No</td>
                        </tr>
                      </table>
                    </li>
                  </ol>
                </ListItem>
              </Box>
            </>
          );

        case "agent-master":
          return (
            <>
              <Box sx={{ width: "100%", typography: "body1", ml: 18 }}>
                <TabContext value={tabValue}>
                  <Box>
                    <TabList
                      onChange={handleChangeTab}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="BASIC" value="1" style={{ color: "brown" }} />
                      <Tab label="PROFESSIONAL" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Select
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="individual"
                          control={<Radio />}
                          onClick={() => {
                            setCmpyValue("individual");
                          }}
                          label="Individual"
                        />
                        <FormControlLabel
                          value="company"
                          control={<Radio />}
                          onClick={() => {
                            setCmpyValue("company");
                          }}
                          label="Company"
                        />
                      </RadioGroup>
                    </FormControl>
                    <Box>
                      <div>
                        <List sx={{ mb: 5 }}>
                          <TextField
                            required
                            id="filled-basic"
                            label="Aadhar No"
                            type="number"
                            variant="filled"
                            sx={{ width: "30ch" }}
                          />

                          {cmpyvalue === "company" ? (
                            <>
                              <TextField
                                id="filled-basic"
                                label="Company Name"
                                type="name"
                                variant="filled"
                                sx={{ width: "30ch", ml: 4 }}
                              />
                              <TextField
                                id="filled-basic"
                                label="GSTIN"
                                type="name"
                                variant="filled"
                                sx={{ width: "30ch", ml: 4 }}
                              />
                            </>
                          ) : null}
                        </List>
                        <List>
                          <TextField
                            id="filled-basic"
                            label="Full Name"
                            required
                            type="name"
                            variant="filled"
                            sx={{ width: "30ch" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="Birthdate"
                            InputLabelProps={{ shrink: true }}
                            type="date"
                            variant="filled"
                            sx={{ width: "30ch", ml: 4, mr: 4 }}
                          />
                        </List>
                        <List sx={{ mb: 5, mt: 5 }}>
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            Select
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              label="Female"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              label="Male"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              label="Other"
                            />
                          </RadioGroup>
                        </List>
                        <List>
                          <TextField
                            id="filled-basic"
                            label="Email"
                            required
                            type="email"
                            variant="filled"
                            sx={{ width: "30ch" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="Contact no"
                            required
                            type="number"
                            variant="filled"
                            sx={{ width: "30ch", ml: 4 }}
                          />
                        </List>
                        <List>
                          <TextField
                            id="filled-basic"
                            label="Current Address"
                            required
                            rows={3}
                            multiline
                            type="address"
                            variant="filled"
                            sx={{ width: "64ch", mt: 5, mb: 5 }}
                          />
                        </List>
                        <List>
                          <TextField
                            id="filled-basic"
                            label="Current pincode"
                            required
                            type="name"
                            variant="filled"
                            sx={{ width: "30ch" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="Current city"
                            required
                            type="address"
                            variant="filled"
                            sx={{ width: "30ch", ml: 4 }}
                          />
                          <TextField
                            id="filled-basic"
                            label="Current state"
                            required
                            type="address"
                            variant="filled"
                            sx={{ width: "30ch", ml: 4 }}
                          />
                        </List>
                        <List sx={{ mb: 5, mt: 5 }}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Same as current address"
                          />
                        </List>
                        <List>
                          <TextField
                            id="filled-basic"
                            label="Permanent Address"
                            required
                            rows={3}
                            multiline
                            helperText="Must match address in one of the KYC document"
                            type="address"
                            variant="filled"
                            sx={{ width: "64ch", mb: 5 }}
                          />
                        </List>
                        <List>
                          <TextField
                            id="filled-basic"
                            label="Permanent pincode"
                            required
                            type="name"
                            variant="filled"
                            sx={{ width: "30ch" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="Permanent city"
                            required
                            type="address"
                            variant="filled"
                            sx={{ width: "30ch", ml: 4 }}
                          />
                          <TextField
                            id="filled-basic"
                            label="Permanent state"
                            required
                            type="address"
                            variant="filled"
                            sx={{ width: "30ch", ml: 4 }}
                          />
                        </List>
                        <List sx={{ mt: 5 }}>
                          <TextField
                            id="filled-basic"
                            label="Pan Card"
                            required
                            type="name"
                            variant="filled"
                            sx={{ width: "30ch" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="Aadhar card"
                            required
                            type="number"
                            variant="filled"
                            sx={{ width: "30ch", ml: 4 }}
                          />
                        </List>
                        <List sx={{ mt: 5, mb: 5 }}>
                          <List>
                            <b>Languages</b>
                          </List>
                          <TextField
                            id="filled-basic"
                            label="Primary language"
                            required
                            type="name"
                            variant="filled"
                            sx={{ width: "30ch" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="Secondary language"
                            required
                            type="name"
                            variant="filled"
                            sx={{ width: "30ch", ml: 4 }}
                          />
                          <TextField
                            id="filled-basic"
                            label="Third language"
                            required
                            type="name"
                            variant="filled"
                            sx={{ width: "30ch", ml: 4 }}
                          />
                        </List>
                        <List>
                          <TextField
                            id="filled-basic"
                            label="Note"
                            rows={3}
                            multiline
                            type="address"
                            variant="filled"
                            sx={{ width: "64ch", mb: 5 }}
                          />
                        </List>
                        <List sx={{ mb: 3 }}>
                          <FormControlLabel
                            defaultChecked
                            control={<Checkbox />}
                            label="Is Active"
                          />
                        </List>
                        <List>
                          <Button sx={{ color: "white", background: "brown" }}>
                            Save
                          </Button>
                        </List>
                      </div>
                    </Box>
                  </TabPanel>
                  <TabPanel value="2">
                    <FormControl>
                      <List sx={{ mb: 5 }}>
                        <List>
                          <b>Bank details</b>
                        </List>
                        <TextField
                          id="filled-basic"
                          label="Bank name"
                          type="name"
                          variant="filled"
                          sx={{ width: "30ch" }}
                        />
                        <TextField
                          id="filled-basic"
                          label="A/C no"
                          type="name"
                          variant="filled"
                          sx={{ width: "30ch", ml: 4 }}
                        />
                        <TextField
                          id="filled-basic"
                          label="IFSC Code"
                          type="name"
                          variant="filled"
                          sx={{ width: "30ch", ml: 4 }}
                        />
                        <TextField
                          id="filled-basic"
                          label="A/C Type"
                          type="name"
                          variant="filled"
                          sx={{ width: "30ch", ml: 4 }}
                        />
                      </List>
                      <List sx={{ mb: 5 }}>
                        <List>
                          <b>Professional details</b>
                        </List>
                        <TextField
                          id="filled-basic"
                          label="Professional Status"
                          type="name"
                          variant="filled"
                          sx={{ width: "30ch" }}
                        />
                        <TextField
                          id="filled-basic"
                          label="Sub work location 1 "
                          type="name"
                          variant="filled"
                          sx={{ width: "30ch", ml: 4 }}
                        />
                        <TextField
                          id="filled-basic"
                          label="Sub work location 2"
                          type="name"
                          variant="filled"
                          sx={{ width: "30ch", ml: 4 }}
                        />
                      </List>
                      <List>
                        <ProfessionalTab />
                      </List>
                      <List>
                        <Button
                          sx={{ color: "white", bgcolor: "brown", mt: 3 }}
                        >
                          Save
                        </Button>
                      </List>
                    </FormControl>
                  </TabPanel>
                </TabContext>
              </Box>
            </>
          );

        case "agent-pricing-template":
          return (
            <>
              <List
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mr: 20,
                  alignItems: "flex-start",
                }}
              >
                <Button sx={{ color: "white", bgcolor: "brown", mr: 1 }}>
                  Save
                </Button>
                <Button sx={{ color: "black", bgcolor: "#f5f0e4" }}>
                  Exit
                </Button>

                <ul style={{ fontSize: "12px", marginTop: "-10px" }}>
                  <h2>Total:0</h2>
                  <li>Last modified by:</li>
                  <li>Last modified on:</li>
                  <li>Created by:</li>
                  <li>Created on:</li>
                </ul>
              </List>
              <Box
                sx={{ width: "100%", typography: "body1", ml: 5, mt: "-80px" }}
              >
                <List sx={{ mb: 5 }}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Template Name"
                    type="name"
                    variant="filled"
                    sx={{ width: "30ch" }}
                  />
                  <TextField
                    id="filled-basic"
                    label="Description"
                    type="name"
                    variant="filled"
                    sx={{ width: "40ch", ml: 4 }}
                  />
                  <TextField
                    id="filled-basic"
                    label="Approval Remarks"
                    type="name"
                    variant="filled"
                    sx={{ width: "40ch", ml: 4 }}
                  />
                </List>
                <List sx={{ mt: 4, mb: 4 }}>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Industry"
                    variant="outlined"
                  />
                  <TextField
                    sx={{ ml: 2 }}
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Category"
                    variant="outlined"
                  />
                  <TextField
                    sx={{ ml: 2 }}
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Education"
                    variant="outlined"
                  />
                </List>
                <List>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Full Name"
                    variant="outlined"
                  />
                </List>
                <List sx={{ mt: 4, mb: 4 }}>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Birthdate"
                    variant="outlined"
                  />
                </List>
                <List>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Primary language"
                    variant="outlined"
                  />
                  <TextField
                    sx={{ ml: 2 }}
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Secondary language"
                    variant="outlined"
                  />
                </List>
                <List sx={{ mt: 4, mb: 4 }}>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Primary Mobile"
                    variant="outlined"
                  />
                </List>
                <List>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Current city"
                    variant="outlined"
                  />
                  <TextField
                    sx={{ ml: 2 }}
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Current pincode"
                    variant="outlined"
                  />
                </List>
                <List sx={{ mt: 4, mb: 4 }}>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Primary Email"
                    variant="outlined"
                  />
                </List>
                <List>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Preffered location 1"
                    variant="outlined"
                  />
                  <TextField
                    sx={{ ml: 2 }}
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Preffered location 2"
                    variant="outlined"
                  />
                </List>
                <List sx={{ mt: 4, mb: 4 }}>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Work Exp yrs"
                    variant="outlined"
                  />
                </List>
                <List>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Last company name"
                    variant="outlined"
                  />
                  <TextField
                    sx={{ ml: 2 }}
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Designation"
                    variant="outlined"
                  />
                </List>
                <List sx={{ mt: 4, mb: 4 }}>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Primary skills"
                    variant="outlined"
                  />
                  <TextField
                    sx={{ ml: 2 }}
                    id="outlined-basic"
                    size="small"
                    value={0}
                    type="number"
                    label="Secondary skills"
                    variant="outlined"
                  />
                </List>
                <List>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Is Active"
                    />
                  </FormGroup>
                </List>
                <List sx={{ mt: 4, mb: 4 }}>
                  <Button sx={{ color: "white", bgcolor: "brown" }}>
                    Save
                  </Button>
                  <Button sx={{ bgcolor: "#f5f0e4", color: "black", ml: 2 }}>
                    Exit
                  </Button>
                </List>
              </Box>
            </>
          );

        case "category":
          return (
            <>
              <div style={{ width: "100%", typography: "body1", marginLeft: "70px" }}>
                <List key={"test1"} style={{ marginBottom: '10px' }}>
                  <TextField
                    required
                    id="filled-basic"
                    key={categoryData}
                    label="Title"
                    name="title"
                    value={categoryData.title}
                    type="name"
                    variant="filled"
                    style={{ width: "130ch" }}
                    onChange={(e)=>{
                      setCategoryData({...categoryData,
                        title:e.target.value})
                        console.log(e.target.value);
                    }}
                  />
                </List>
                <List sx={{ mb: 5 }}>
                  <TextField
                    id="filled-basic"
                    label="Description"
                    type={"name"}
                    variant="filled"
                    value={categoryData.description}
                    onChange={(e)=>{setCategoryData
                    ({
                      ...categoryData,
                      description:e.target.value
                    })}}
                    style={{ width: "130ch" }}
                  />
                </List>
                <List>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Is Active"
                      value={categoryData.isActive}
                      onChange={(e)=>{setCategoryData({isActive:e.target.value})}}
                    />
                  </FormGroup>
                </List>
                <List>
                  <Button onClick={()=>{addAPICalls("category")
                  console.log("clicked on category");}} style={{ backgroundColor: "brown", color: "white" }}>
                    Save
                  </Button>
                </List>
                <List sx={{ fontSize: "13px" }}>
                  <ul>
                    <li>Last modified by:</li>
                    <li>Last modified on:</li>
                    <li>Created by:</li>
                    <li>Created On:</li>
                  </ul>
                </List>
              </div>
            </>
          );

        case "company":
          return (
            <>
              <Box sx={{ width: "100%", typography: "body1", ml: 17 }}>
                <List sx={{ mb: 5 }}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Company Name"
                    type="name"
                    value={companyData.companyName}
                    variant="filled"
                    onChange={(e)=>{
                      setCompanyData({...companyData,
                      companyName:e.target.value})
                    }}
                    sx={{ width: "130ch" }}
                  />
                </List>
                <List sx={{ mb: 5 }}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Description"
                    type="name"
                    value={companyData.description}
                    onChange={(e)=>{setCompanyData({...companyData,
                      description:e.target.value
                    })}}
                    variant="filled"
                    sx={{ width: "130ch" }}
                  />
                </List>
                <List sx={{ mb: 5 }}>
                  <TextField
                    id="filled-basic"
                    label="Industry Name"
                    type="name"
                    value={companyData.industryId}
                    onChange={(e)=>{setCompanyData({
                      ...companyData,
                      industryId:e.target.value
                    })}}
                    variant="filled"
                    sx={{ width: "130ch" }}
                  />
                </List>
                <List>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Is Active"
                      value={companyData.isActive}
                      onChange={(e)=>{setCompanyData({
                        ...companyData,
                        isActive:e.target.value
                      })}}
                    />
                  </FormGroup>
                </List>
                <List>
                  <Button onClick={()=>{addAPICalls("company")}} style={{ backgroundColor: "brown", color: "white", marginTop: "12px" }}>
                    Save
                  </Button>
                </List>
              </Box>
            </>
          );

        case "industry":
          return (
            <>
              <Box sx={{ width: "100%", typography: "body1", ml: 17 }}>
                <List sx={{ mb: 5 }}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Title"
                    type="name"
                    value={industryData.title}
                    onChange={(e)=>{setIndustryData({...industryData,title:e.target.value})}}
                    variant="filled"
                    sx={{ width: "130ch" }}
                  />
                </List>
                <List sx={{ mb: 5 }}>
                  <TextField
                    id="filled-basic"
                    label="Description"
                    type="name"
                    value={industryData.description}
                    onChange={(e)=>{setIndustryData({...industryData,description:e.target.value})}}
                    variant="filled"
                    sx={{ width: "130ch" }}
                  />
                </List>
                <List>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Is Active"
                      value={industryData.isActive}
                      onChange={(e)=>{setIndustryData({
                        ...industryData,
                        isActive:e.target.checked})}}
                    />
                  </FormGroup>
                </List>
                <List>
                  <Button onClick={()=>addAPICalls('industry')} style={{ backgroundColor: "brown", color: "white" }}>
                    Save
                  </Button>
                </List>
              </Box>
            </>
          );

        case "role":
          return (
            
            <>
              {Object.keys(permissions).map((item, i) => (<>
              <Box sx={{ width: "100%", typography: "body1", ml: 17 }}>
                <List sx={{ mb: 5 }}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Title"
                    type="name"
                    variant="filled"
                    value={roleData.name}
                    onChange={(e)=>{setRoleData({...roleData,name:e.target.value})}}
                    sx={{ width: "130ch" }}
                  />
                </List>
                <List sx={{ mb: 5 }}>
                  <TextField
                    id="filled-basic"
                    label="Description"
                    type="name"
                    variant="filled"
                    value={roleData.description}
                    onChange={(e)=>{setRoleData({...roleData,description:e.target.value})}}
                    sx={{ width: "130ch" }}
                  />
                </List>
                <List>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Is Active"
                    />
                  </FormGroup>
                </List>
                <List>
                  <List>
                    <b>Permissions Section</b>
                    <p style={{ color: "brown" }}>{permissions[item].group}</p>
                  </List>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Admin-Candidate Upload Batch</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Change Pricing Template"
                    />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="Approval" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Admin-Candidate Verification</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>
                    Admin-Other Industry Category
                  </p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Admin-User</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Reset Password"
                    />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Agent</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Change Password"
                    />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Agent Pricing Template</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Set Active"
                    />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Batch Priority</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Candidate</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Candidate - Basic</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Bulk Create"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Upload profile image"
                    />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Candidate - Certification</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Candidate - Work History</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Candidate Upload Batch</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Candidate Verification</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Category</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Company</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Customer</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Reset password"
                    />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Customer - Subscription</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Industry</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Permission</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Public</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      disabled
                      label="User - Login"
                    />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Role</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Skill</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>Subscription</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read All" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                  </FormGroup>
                  <p style={{ color: "brown" }}>User</p>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Change password"
                    />
                  </FormGroup>
                </List>
                <List>
                  <Button style={{ backgroundColor: "brown", color: "white" }}>
                    Save
                  </Button>
                  <Button
                    style={{
                      marginLeft: 2,
                      backgroundColor: "black",
                      color: "white",
                    }}
                  >
                    Cancel
                  </Button>
                </List>
              </Box></>))}
            </>
          );

        case "skillset":
          return (
            <>
              <Box sx={{ width: "100%", typography: "body1", ml: 17 }}>
                <List sx={{ mb: 5 }}>
                  <TextField
                    id="filled-basic"
                    label="Title"
                    type="name"
                    variant="filled"
                    value={skillSet.title}
                    onChange={(e)=>{setSkillSet({...skillSet,title:e.target.value})}}
                    sx={{ width: "130ch" }}
                  />
                </List>
                <List sx={{ mb: 5 }}>
                  <TextField
                    id="filled-basic"
                    label="Description"
                    type="name"
                    value={skillSet.description}
                    onChange={(e)=>{setSkillSet({...skillSet,description:e.target.value})}}
                    variant="filled"
                    sx={{ width: "130ch" }}
                  />
                </List>
                <List>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Is Active"
                      value={skillSet.isActive}
                    onChange={(e)=>{setSkillSet({...skillSet,isActive:e.target.checked})}}
                    />
                  </FormGroup>
                </List>
                <List>
                  <Button onClick={()=>addAPICalls("skillset")} style={{ backgroundColor: "brown", color: "white" }}>
                    Save
                  </Button>
                </List>
              </Box>
            </>
          );

        case "subscription":
          return (
            <>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ justifyContent: "start", ml: 17, mt: 2 }}>
                  <List>
                    <TextField
                      id="filled-basic"
                      label="Plan Name"
                      variant="filled"
                      value={subscription.planName}
                      onChange={(e)=>{setSubscription({
                        ...subscription,
                        planName:e.target.value
                      })}}
                      sx={{ width: "80ch" }}
                    />
                  </List>
                  <List sx={{ mt: 4, mb: 4 }}>
                    <TextField
                      id="filled-basic"
                      label="Data Count"
                      variant="filled"
                      value={subscription.dataCount}
                      onChange={(e)=>{setSubscription({
                        ...subscription,
                        dataCount:e.target.value
                      })}}
                      sx={{ width: "40ch" }}
                    />
                    <TextField
                      id="filled-basic"
                      label="Duration in months"
                      variant="filled"
                      value={subscription.durationMonths}
                      onChange={(e)=>{setSubscription({
                        ...subscription,
                        durationMonths:e.target.value
                      })}}
                      sx={{ width: "40ch", ml: 3 }}
                    />
                    <TextField
                      id="filled-basic"
                      label="Price"
                      value={subscription.price}
                      onChange={(e)=>{setSubscription({
                        ...subscription,
                        price:e.target.value
                      })}}
                      variant="filled"
                      sx={{ width: "40ch", ml: 3 }}
                    />
                  </List>
                  <List>
                    <TextField
                      id="filled-basic"
                      label="Note"
                      value={subscription.note}
                      onChange={(e)=>{setSubscription({
                        ...subscription,
                        note:e.target.value
                      })}}
                      variant="filled"
                      sx={{ width: "126ch", mb: 4 }}
                    />
                  </List>
                  <List>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Is Active"
                        value={subscription.isActive}
                        onChange={(e)=>{setSubscription({
                          ...subscription,
                          isActive:e.target.checked
                        })}}
                      />
                    </FormGroup>
                  </List>
                  <List>
                    <Button onClick={()=>addAPICalls('subscription')}
                      style={{ color: "white", backgroundColor: "brown" }}
                    >
                      Save
                    </Button>
                  </List>
                </Box>
              </Box>
            </>
          );

        case "user":
          return (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "nowrap",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <List>
                  <TextField
                    required
                    id="filled-basic"
                    label="Full Name"
                    variant="filled"
                    value={userData.fullName}
                    onChange={(e)=>{setUserData({...userData,fullName:e.target.value})}}
                    sx={{ width: "40ch" }}
                  />
                  <TextField
                    type="date"
                    id="filled-basic"
                    label="Birthdate"
                    value={userData.dob}
                    onChange={(e)=>{setUserData({...userData,dob:e.target.value})}}
                    variant="filled"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "40ch", ml: 3 }}
                  />
                  <TextField
                    select
                    id="filled-basic"
                    label="Gender"
                    value={userData.gender}
                    onChange={(e)=>{setUserData({...userData,gender:e.target.value})}}
                    variant="filled"
                    sx={{ width: "40ch", ml: 3 }}
                  >
                    {gender.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </List>
                <List sx={{ mb: 4, mt: 4 }}>
                  <TextField
                    id="filled-basic"
                    label="Email"
                    variant="filled"
                    value={userData.email}
                    onChange={(e)=>{setUserData({...userData,email:e.target.value})}}
                    sx={{ width: "40ch" }}
                  />
                  <TextField
                    required
                    id="filled-basic"
                    label="Contact no"
                    value={userData.contactNo}
                    onChange={(e)=>{setUserData({...userData,contactNo:e.target.value})}}
                    variant="filled"
                    sx={{ width: "40ch", ml: 3 }}
                  />
                  <TextField
                    required
                    select
                    id="filled-basic"
                    label="Role"
                    value={userData.roleId}
                    onChange={(e)=>{setUserData({...userData,roleId:e.target.value})}}
                    variant="filled"
                    sx={{ width: "40ch", ml: 3 }}
                  >
                    {role.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </List>
              </Box>
              <Box sx={{ ml: 17 }}>
                <List>
                  <TextField
                    required
                    id="filled-basic"
                    label="Current Address"
                    variant="filled"
                    value={userData.currAddress}
                    onChange={(e)=>{setUserData({...userData,currAddress:e.target.value})}}
                    multiline
                    rows={4}
                    sx={{ width: "100ch" }}
                  />
                </List>
                <List sx={{ mb: 4, mt: 4 }}>
                  <TextField
                    id="filled-basic"
                    label="Current pincode"
                    variant="filled"
                    value={userData.currZip}
                    onChange={(e)=>{setUserData({...userData,currZip:e.target.value})}}
                    sx={{ width: "40ch" }}
                  />
                  <TextField
                    id="filled-basic"
                    label="Current city"
                    variant="filled"
                    value={userData.currCity}
                    onChange={(e)=>{setUserData({...userData,currCity:e.target.value})}}
                    sx={{ width: "40ch", ml: 3 }}
                  />
                  <TextField
                    select
                    id="filled-basic"
                    label="Current State"
                    value={userData.currState}
                    onChange={(e)=>{setUserData({...userData,currState:e.target.value})}}
                    variant="filled"
                    sx={{ width: "40ch", ml: 3 }}
                  >
                    {states.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </List>
                <List>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox/>}
                      label="Same as current address"

                    />
                  </FormGroup>
                </List>
                <List sx={{ mb: 4, mt: 4 }}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Permanent Address"
                    variant="filled"
                    value={userData.permAddress}
                    onChange={(e)=>{setUserData({...userData,permAddress:e.target.value})}}
                    multiline
                    rows={4}
                    sx={{ width: "100ch" }}
                  />
                </List>
                <List>
                  <TextField
                    id="filled-basic"
                    label="Permanent pincode"
                    value={userData.permZip}
                    onChange={(e)=>{setUserData({...userData,permZip:e.target.value})}}
                    variant="filled"
                    sx={{ width: "40ch" }}
                  />
                  <TextField
                    id="filled-basic"
                    label="Permanent city"
                    variant="filled"
                    value={userData.permCity}
                    onChange={(e)=>{setUserData({...userData,permCity:e.target.value})}}
                    sx={{ width: "40ch", ml: 3 }}
                  />
                  <TextField
                    required
                    select
                    id="filled-basic"
                    label="Permanent State"
                    variant="filled"
                    value={userData.permState}
                    onChange={(e)=>{setUserData({...userData,permState:e.target.value})}}
                    sx={{ width: "40ch", ml: 3 }}
                  >
                    {states.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </List>
                <List sx={{ mb: 4, mt: 4 }}>
                  <TextField
                    id="filled-basic"
                    label="Pan card"
                    value={userData.panCard}
                    onChange={(e)=>{setUserData({...userData,panCard:e.target.value})}}
                    variant="filled"
                    sx={{ width: "40ch" }}
                  />
                  <TextField
                    id="filled-basic"
                    label="Aadhar card"
                    variant="filled"
                    value={userData.aadharCard}
                    onChange={(e)=>{setUserData({...userData,aadharCard:e.target.value})}}
                    sx={{ width: "40ch", ml: 3 }}
                  />
                </List>
                <List>
                  <List>
                    <p>Languages</p>
                  </List>
                  <TextField
                    id="filled-basic"
                    label="Primary Language"
                    variant="filled"
                    value={userData.primaryLang}
                    onChange={(e)=>{setUserData({...userData,primaryLang:e.target.value})}}
                    sx={{ width: "40ch" }}
                  />
                  <TextField
                    id="filled-basic"
                    label="Secondary Language"
                    variant="filled"
                    value={userData.secondaryLang}
                    onChange={(e)=>{setUserData({...userData,secondaryLang:e.target.value})}}
                    sx={{ width: "40ch", ml: 3 }}
                  />
                  <TextField
                    id="filled-basic"
                    label="Third Language"
                    variant="filled"
                    value={userData.thirdLang}
                    onChange={(e)=>{setUserData({...userData,thirdLang:e.target.value})}}
                    sx={{ width: "40ch", ml: 3 }}
                  />
                </List>
                <List sx={{ mb: 4, mt: 4 }}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Note"
                    variant="filled"
                    value={userData.note}
                    onChange={(e)=>{setUserData({...userData,note:e.target.value})}}
                    multiline
                    rows={4}
                    sx={{ width: "100ch" }}
                  />
                </List>
                <List>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Is Active"
                      value={userData.isActive}
                    onChange={(e)=>{setUserData({...userData,isActive:e.target.value})}}
                    />
                  </FormGroup>
                </List>
                <List sx={{ mb: 4, mt: 4 }}>
                  <Button onClick={()=>addAPICalls('user')} style={{ backgroundColor: "brown", color: "white" }}>
                    Save
                  </Button>
                </List>
              </Box>
            </>
          );
        default:
          break;
      }
    };

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%", display: "flex", flexDirection: "column" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            <h2>{pageTitle}</h2>

            {renderDesign()}
          </Typography>
        )}

        <Typography>{handleButtons()}</Typography>

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {/* modal for modal inputs based on routes */}
        <Dialog
          // style={{ marginTop: "-70px" }}
          // className={classes.root}
          disableAutoFocus={true}
          fullScreen={true}
          open={openModal}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <Box sx={{ bgcolor: "brown", color: "white", height: "55px" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon style={{ marginLeft: "10px", fontSize: "35px" }} />
            </IconButton>
            {modalTitle}
            <Button sx={{ ml: 155, color: "white" }}>Save</Button>
          </Box>
           <DialogContent>
          {handlerModuleInputs()}
          </DialogContent> 
        </Dialog>
        {/* admin candidate upload batch modal */}
        <Dialog
          fullWidth
          open={openAdminCanUplBtch}
          onClose={handleCloseAdminCanUplBtch}
        >
          <DialogTitle>Admin - Candidate Upload Batch</DialogTitle>

          <DialogContent>
            <Button
              variant="contained"
              onClick={onDownload}
              style={{
                backgroundColor: "#009688",
                color: "white",
                fontSize: "12px",
                marginRight: "5px",
              }}
            >
              Download Template
            </Button>
            <Tooltip title="Template for Candidate Upload Batch.All columns persent in the excel">
              <Info />
            </Tooltip>
            <List>
              <p>
                Guideline is available{" "}
                <a href="http://localhost:3000/candidate-upload-batch#outlined-buttons">
                  link
                </a>
              </p>
            </List>
            <List>
              <label htmlFor="upload-photo">
                <Button
                  component="span"
                  variant="contained"
                  style={{
                    color: "white",
                    background: "brown",
                    fontSize: "15px",
                  }}
                >
                  <input
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    style={{ display: "none" }}
                  />
                  Select File
                </Button>
              </label>
            </List>
            <List>
              <p>
                Total Records:<b>0</b>
              </p>
            </List>
            <TextField
              autoFocus
              margin="dense"
              id="filled-basic"
              label="Owner"
              variant="filled"
              type="email"
              fullWidth
              select
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdminCanUplBtch}>Close</Button>
          </DialogActions>
        </Dialog>
        {/* batch priority modal */}
        <Dialog
          fullWidth
          open={openAddBtchprty}
          onClose={handleCloseAddBtchprty}
        >
          <DialogTitle>Add Batch Priority</DialogTitle>

          <DialogContent>
            <List sx={{ mb: 3 }}>
              <TextField
                autoFocus
                margin="dense"
                id="filled-basic"
                label="Batch no"
                variant="filled"
                type="email"
                fullWidth
                select
              />
            </List>
            <List>
              <TextField
                autoFocus
                margin="dense"
                id="filled-basic"
                label="Assigned To"
                variant="filled"
                type="email"
                fullWidth
                select
              />
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddBtchprty}>Close</Button>
            <Button onClick={handleCloseAddBtchprty}>Save</Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tblData.length) : 0;

  const StateContainer = {
    order,
    orderBy,
    selected,
    page,
    tblData,
    setTblData,
    rowsPerPage,
    useStyles,
    dense,
    pageTitle,
    setPageTitle,
    setOrder,
    setOrderBy,
    setSelected,
    setPage,
    setRowsPerPage,
    setDense,
    rows,
    createData,
    Transition,
    headCells,
    getComparator,
    descendingComparator,
    handleChangeRowsPerPage,
    handleChangePage,
    handleSelectAllClick,
    handleRequestSort,
    handleClick,
    handleChangeDense,
    isSelected,
    EnhancedTableToolbar,
    stableSort,
    EnhancedTableHead,
    emptyRows,
    pageName,
    tblHeader,
    setTblHeader,
    setPageName,
    setButtonText,
    setModalTitle,
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
    
  };

  return StateContainer;
};

export default ContentLogic;
