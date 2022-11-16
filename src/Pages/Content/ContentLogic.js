import { forwardRef, React, useCallback, useState } from "react";
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
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
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
import { CheckBox, Info, PriorityHigh, ToggleOn } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ProfessionalTab from "../../Container/Drawer/Agent Master/Professional Tab/ProfessionalTab";
import { Link } from "react-router-dom";
import Help from "../../Container/Drawer/Help/Help";
import handler from "../../handlers/generalHandlers";
import { Stack } from "@mui/system";
import moment from "moment";

const ContentLogic = (props) => {
  const navigate = useNavigate();
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
  const [tblDataCount, setTblDataCount] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [numSelected] = useState([]);

  const [cndVrfnTabValue, setCndVrfnTabValue] = useState("1");
  const [id, setId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [openChildModal, setOpenChilModal] = useState(false);
  const [openChildModalCerti, setOpenChilModalCerti] = useState(false);
  const [tabValue, setTabValue] = useState("1");
  const [cmpyvalue, setCmpyValue] = useState("");
  const [openAdminCanUplBtch, setOpenAdminCanUplBtch] = useState(false);
  const [openAddBtchprty, setOpenAddBtchprty] = useState(false);
  const [openAlertMsg, setOpenAlertMsg] = useState(false);
  const [candidateUploadBatchAdminSelect, setCandidateUploadBatchAdminSelect] =
    useState({
      id: 0,
      createdBy: "",
      role: "",
      AgentPricingTemplate: {
        templateName: "",
      },
    });

  const [candidateUploadBatchAdminData, setCandidateUploadBatchAdminData] =
    useState({
      id: 0,
    });
  // state for store the input fields value of candidate master
  const [candidateMasterData, setCandidateMasterData] = useState({
    aadharNo: "123123123121",
    gender: "MALE",
    dob: "12-12-12",
    permAddress: "",
    contactNo1: "34534534343",
    contactNo2: "1234554321",
    curr_address: "test address",
    curr_city: "test city",
    curr_country: "India",
    curr_state: "test state",
    curr_zip: "123121",
    email1: "testbynrk@gmai.com",
    email2: "test@g.c",
    fullName: "Test by Navnah",
    gender: "MALE",
    perm_address: "tes address",
    perm_city: "tes city",
    perm_country: "India",
    perm_state: "test state",
    perm_zip: "123123",
    registrationStatus: "",
    totalExpMonths: "1",
    totalExpYears: "1",
    // birthDate:new Date(),
    isActive: true,
    industry: "test",
    category: "test",
    expYears: "1",
    prefLocation1: "test",
    prefLocation2: "test",
    skill1: "test",
    skill2: "test",
    primaryLang: "test",
    secondaryLang: "test",
    lastCompany: "test",
    designation: "test",
    education: "test",
  });
  const [updateCandidateMasterData, setUpdateCandidateMasterData] = useState({
    aadharNo: "",
    dob: "",
    gender: "MALE",
    permAddress: "",
    contactNo1: "",
    contactNo2: "",
    currAddress: "",
    currCity: "",
    currCountry: "India",
    currState: "",
    currZip: "",
    email1: "",
    email2: "",
    fullName: "",
    gender: "",
    permAddress: "",
    permCity: "",
    permCountry: "India",
    permState: "",
    permZip: "",
    registrationStatus: "",
    totalExpMonths: "",
    totalExpYears: "",
    birthDate: "",
    isActive: true,
    industry: ``,
    category: ``,
    expYears: ``,
    prefLocation1: ``,
    prefLocation2: ``,
    skill1: ``,
    skill2: ``,
    primaryLang: ``,
    secondaryLang: ``,
    lastCompany: ``,
    designation: ``,
    education: ``,
  });
  const [candidateVerificationData, setCandidateVerificationData] = useState(
    {}
  );

  //store to update candidate verification data
  const [updateCandidateVerificationData, setUpdateCandidateVerificationData] =
    useState({
      aadharNo: 0,
      batchNo: 0,
      callCentre: "",
      category: "",
      contactNo1: "",
      contactNo2: "",
      createdBy: "",
      currAddress: "",
      currCity: "",
      currState: "",
      currZip: "",
      designation: "",
      dlNo: "",
      dob: "",
      education: "",
      educationRaw: "",
      email1: "",
      expYears: "",
      fullName: "",
      gender: "",
      industry: "",
      lastCompany: "",
      note: "",
      panNo: "",
      permAddress: "",
      permCity: "",
      permState: "",
      permZip: "",
      preferLocation1: "",
      preferLocation2: "",
      primaryLanguage: "",
      primaryLanguageRaw: "",
      role: "",
      rowNo: 0,
      secondaryLanguage: "",
      secondaryLanguageRaw: "",
      skill1: "",
      skill2: "",
      status: "",
      thirdLanguage: "",
      verification: {
        candidateId: 0,
        category: "",
        contactNo1: "",
        createdBy: "",
        createdOn: "",
        currCity: "",
        currZip: "",
        designation: "",
        dob: "",
        education: "",
        email1: "",
        expYears: "",
        fullName: "",
        id: 0,
        industry: "",
        lastCompany: "",
        modifiedBy: 0,
        modifiedOn: "",
        preferLocation1: "",
        preferLocation2: "",
        primaryLanguage: "",
        secondaryLanguage: "",
        skill1: "",
        skill2: "",
      },
      CandidateCategory: [],
      CandidateIndustry: [],
      CandidateWorkHistory: [],
      callCentre: [],
    });
  //state for store the input fields value of industry
  const [categoryData, setCategoryData] = useState({
    title: "",
    description: "",
    isActive: false,
  });

  //state for store the input fields value of industry
  const [companyData, setCompanyData] = useState({
    companyName: " ",
    description: "",
    isActive: true,
    industry: "",
    title: "",
  });

  //state for store the input fields value of industry
  const [industryData, setIndustryData] = useState({
    title: "",
    description: "",
    isActive: true,
  });
  const [checkedp, setCheckedP] = useState([]);

  const [roleData, setRoleData] = useState({
    name: "",
    description: "",
    isActive: true,
    id:0,
    permissionId: [],
  });
  const [uroleData,setURoleData] = useState({
    permissions:[]
  })
  const [skillSetData, setSkillSetData] = useState({
    title: "",
    description: "",
    isActive: true,
  });
  const [subscriptionData, setSubscriptionData] = useState({
    planName: "",
    dataCount: 1,
    durationMonths: 12,
    price: 1999,
    note: "",
    isActive: true,
  });
  const [userData, setUserData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    currAddress: "",
    currCity: "",
    currState: "",
    currCountry: "",
    currZip: "",
    permAddress: "",
    permCity: "",
    permState: "",
    permCountry: "",
    permZip: "",
    primaryLang: "",
    secondaryLang: "",
    thirdLang: "",
    aadharCard: "",
    panCard: "",
    note: "",
    email: "",
    contactNo: "",
    roleId: 0,
    isActive: true,
  });
  const [updateUserData, setUpdateUserData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    currAddress: "",
    currCity: "",
    currState: "",
    currCountry: "",
    currZip: "",
    permAddress: "",
    permCity: "",
    permState: "",
    permCountry: "",
    permZip: "",
    primaryLang: "",
    secondaryLang: "",
    thirdLang: "",
    aadharCard: "",
    panCard: "",
    note: "",
    email: "",
    contactNo: "",
    roleId: 0,
    isActive: true,
  });
  const [agentMasterData, setAgentMasterData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    permAddress: "",
    permCity: "",
    permState: "",
    permCountry: "",
    permZip: "",
    currAddress: "",
    currCity: "",
    currState: "",
    currCountry: "",
    currZip: "",
    panCard: "",
    aadharCard: "",
    primaryLang: "",
    secondaryLang: "",
    thirdLang: "",
    note: "",
    isActive: true,
    email: "",
    contactNo: "",
    agentNo: "",
    professionalStatus: "",
    gstin: "",
    companyName: "",
    bankName: "",
    bankAc: "",
    bankIfsc: "",
    bankAcType: "",
    workLocation1: "",
    workLocation2: "",
    status: "",
  });
  const [agentPricingTemplateData, setAgentPricingTemplateData] = useState({
    templateName: "",
    description: "",
    approvalRemarks: null,
    isActive: true,
    industry: 0,
    category: 0,
    education: 0,
    fullName: 0,
    dob: 0,
    primaryLanguage: 0,
    secondaryLanguage: 0,
    currCity: 0,
    currZip: 0,
    email1: 0,
    contactNo1: 0,
    expYears: 0,
    preferLocation1: 0,
    preferLocation2: 0,
    skill1: 0,
    skill2: 0,
    lastCompany: 0,
    designation: 0,
  });

  const [batchPriorityData, setBatchPriorityData] = useState([]);
  const [createBatchPriorityData, setCreateBatchPriorityData] = useState({
    id: 1,
  });
  const [updateBatchPriority, setUpdateBatchPriority] = useState([]);

  const [batchPriorityAssingend, setBatchPriorityAssingend] = useState([]);
  const [batchPriorityId, setBatchPriorityId] = useState("87");
  const [pageName, setPageName] = useState();
  const [tblHeader, setTblHeader] = useState([]);
  const [loader, setLoader] = useState(false);
  const [editId, setEditId] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  // used to select multiple value from select field for batch priority module
  const [batchNo, setBatchNo] = useState({
    batchId: 0,
    assignedTo: [createBatchPriorityData.id],
  });

  const [expanded, setExpanded] = useState(false);

  const [openCandidateModal, setOpenCandidateModal] = useState(false);

  const handleCloseCandidateModal = () => {
    setOpenCandidateModal(false);
  };
  const handleOpenCandidateModal = () => {
    setOpenCandidateModal(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const rows = [];

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

  const handleCloseLoader = () => {
    setLoader(false);
  };

  // table headings array for each module
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
      disablePadding: false,
      label: "Sr.No",
    },
    {
      id: "batchNo",
      numeric: false,
      disablePadding: false,
      label: "Batch No",
    },
    {
      id: "timestamp",
      numeric: false,
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
    setLoader(true);
    handler
      .dataGet(
        `/v1/candidates?limit=${rowsPerPage}&page=${page * rowsPerPage}`,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTblData(response.data.data.result.Candidates);
          setTblDataCount(response.data.data.count);
          console.log("tbldataCandidate", tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error("There was an error!- getCandidateMasterAPIcall", error);
      });
  };
  //candidate upload batch api call
  const getCandidateUploadBatchAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(
        `/v1/candidate-upload-batches?limit${rowsPerPage}&page=${page}`,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTblData(response.data.data.result);
          setTblDataCount(response.data.data.count);
          console.log("candidate-upload-batches", tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error(
          "There was an error!- getCandidateUploadBatchAPIcall",
          error
        );
      });
  };
  //fetch the agent master data
  const getAgentMasterAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/agents?take=${rowsPerPage}&skip=${page * rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTblData(response.data.data.result);
          setTblDataCount(response.data.data.count);
          console.log("tblData", tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error("There was an error!- getAgentMasterAPIcall", error);
      });
  };
  //fetch the candidate verification data
  const getCandidateVerificationAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(
        `/v1/candidate-verifications?take=${rowsPerPage}&skip=${
          page * rowsPerPage
        }`,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTblData(response.data.data.result);
          setTblDataCount(response.data.data.count);
          console.log("candidate verification", tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error(
          "There was an error!- getCandidateVerificationAPIcall",
          error
        );
      });
  };
  //fetch the agent pricing template data
  const getAgentTemplatePricingAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/agent-pricing-templates`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTblData(response.data.data.agentPricingTemplates);
          setCandidateUploadBatchAdminSelect(response.data.data);
          setTblDataCount(response.data.data.count);
          console.log("agent template data", candidateUploadBatchAdminSelect);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error(
          "There was an error!- getAgentTemplatePricingAPIcall",
          error
        );
      });
  };
  //fetch the candidate upload batch admin data
  const getCandidateUploadBatchAdminAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(
        `/v1/admin/candidate-upload-batches?limit=${rowsPerPage}&page=${
          page * rowsPerPage
        }`,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTblData(response.data.data.items);
          setTblDataCount(response.data.data.totalItems);
          console.log("upload batch ", tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error(
          "There was an error!- getCandidateUploadBatchAdminAPIcall",
          error
        );
      });
  };
  //fetch the category data
  const getCategoryAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(
        `/v1/categories?take=${rowsPerPage}&skip=${page * rowsPerPage}`,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTblData(response.data.data.categories);
          console.log("category", tblData);
          setTblDataCount(response.data.data.count);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error("There was an error!- getCategoryAPIcall", error);
      });
  };
  //fetch the company data
  const getCompanyAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/companies?take=${rowsPerPage}&skip=${page * rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTblData(response.data.data.result);
          setTblDataCount(response.data.data.count);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error("There was an error!- getCompanyAPIcall", error);
      });
  };
  //fetch the customer data
  const getCustomerAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);

    handler
      .dataGet(`/v1/customers?take=${rowsPerPage}&skip=${page * rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTblData(response.data.data.result);
          setTblDataCount(response.data.data.count);
          console.log("customer", tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error("There was an error!- getCustomerAPIcall", error);
      });
  };
  //fetch the industry data
  const getIndustryAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(
        `/v1/industries?take=${rowsPerPage}&skip=${page * rowsPerPage}`,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTblData(response.data.data.industries);
          console.log("industry", tblData);
          setTblDataCount(response.data.data.count);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error("There was an error!- getIndustryAPIcall", error);
      });
  };
  //fetch the roles data
  const getRoleAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/roles?take=${rowsPerPage}&skip=${page * rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTblData(response.data.data.roles);
          setTblDataCount(response.data.data.count);
          console.log("roles", tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error("There was an error!- getRoleAPIcall", error);
      });
  };
  //fetch the skillset data
  const getSkillSetAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/skills?take=${rowsPerPage}&skip=${page}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTblData(response.data.data.skills);
          setTblDataCount(response.data.data.count);
          console.log("skill set", tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error("There was an error!- getSkillSetAPIcall", error);
      });
  };
  //fetch the subscriptions data
  const getSubscriptionAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(
        `/v1/subscriptions?take=${rowsPerPage}&skip=${page * rowsPerPage}`,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTblData(response.data.data.subscriptions);
          setTblDataCount(response.data.data.count);
          console.log("subscriptions", tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error("There was an error!- getSubscriptionAPIcall", error);
      });
  };
  //fetch the users data
  const getUserAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/users?take=${rowsPerPage}&skip=${page * rowsPerPage}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTblData(response.data.data.result);
          setTblDataCount(response.data.data.count);
          console.log("users", tblData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error("There was an error!- getUserAPIcall", error);
      });
  };

  const getBatchPriorityAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/batch-priorities/passive-create`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setBatchPriorityData(response.data.data.batches);
          setCreateBatchPriorityData(response.data.data.users);
          console.log(
            "batch priority passive create",
            response.data.data.batches
          );
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getBatchPriorityAPIcall", error);
      });
  };
  const getBatchPriorityDataAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/batch-priorities`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setUpdateBatchPriority(response.data.data);
          // setBatchPriorityAssingend(response.data.data.assignedTo);
          // setTblDataCount(response.data.data.users);
          console.log("batch priority ", response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getBatchPriorityAPIcall", error);
      });
  };
  const getBatchPriorityStatsDataAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/admin/candidate-upload-batches/${batchPriorityId}/stats`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          // setUpdateBatchPriority(response.data.data);
          setBatchPriorityAssingend(response.data.data.assignedTo);
          // setTblDataCount(response.data.data.users);
          console.log("batch priority stats ", response.data.data.assignedTo);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getBatchPriorityAPIcall", error);
      });
  };

  //fetch the all permissions onClick of new button for role module
  const getPermissionsAPIcall = async (e) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    await handler
      .dataGet(`/v1/permissions`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setPermissions(response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getPermissionsAPIcall", error);
      });
  };
  const getRoleByIdAPIcall = async (e) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    await handler
      .dataGet(`/v1/roles/${editId}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setURoleData(response.data.data);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getRolesById", error);
      });
  };

  //get all the based on routes with permissions
  const getAllData = (pageName) => {
    console.log("getallData pagename :", pageName);
    switch (pageName) {
      case "candidate-master":
        getCandidateMasterAPIcall();
        break;
      case "candidate-upload-batch":
        getCandidateUploadBatchAPIcall();
        break;
      case "candidate-verification":
        getCandidateVerificationAPIcall();
        break;
      case "agent-master":
        getAgentMasterAPIcall();
        break;
      case "agent-pricing-template":
        getAgentTemplatePricingAPIcall();
        break;
      case "candidate-upload-batch-admin":
        getCandidateUploadBatchAdminAPIcall();
        break;
      case "batch-priority":
        getBatchPriorityAPIcall();
        getBatchPriorityDataAPIcall();
        break;
      case "category":
        getCategoryAPIcall();
        break;
      case "company":
        getCompanyAPIcall();
        break;
      case "customer":
        getCustomerAPIcall();
        break;
      case "industry":
        getIndustryAPIcall();
        break;
      case "role":
        getRoleAPIcall();
        // getPermissionsAPIcall();
        break;
      case "skillset":
        getSkillSetAPIcall();
        break;
      case "subscription":
        getSubscriptionAPIcall();
        break;
      case "user":
        getUserAPIcall();
        break;
      default:
        break;
    }
  };

  const getCompanyAPIcallById = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/companies/${editId}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setCompanyData(response.data.data);
          // setTblDataCount(response.data.data.users);
          console.log("batch priority", companyData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getBatchPriorityAPIcall", error);
      });
  };
  //get user details by id of user module modal on click of edit
  const getUserAPIcallById = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/users/${editId}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setUpdateUserData(response.data.data);
          // setTblDataCount(response.data.data.users);
          console.log("user Data to update by id", updateUserData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getBatchPriorityAPIcall", error);
      });
  };
  const getCandidateMsaterAPIcallById = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/candidates/${editId}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setUpdateCandidateMasterData(response.data.data);
          // setTblDataCount(response.data.data.users);
          console.log(
            "candidate Data to update by id",
            updateCandidateMasterData
          );
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getBatchPriorityAPIcall", error);
      });
  };
  const getCandidateVerificationById = (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/candidate-verifications/${id}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setUpdateCandidateVerificationData(response.data.data);
          console.log("candidate verification by id", response.data.data);
          console.log(
            "getcandidateVerification",
            updateCandidateVerificationData
          );
        } else if (response.status == 400) {
          window.alert(response.data.message);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getCandidateVerificationById", error);
      });
  };
  const getAgentPricingTemplateById = (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/agent-pricing-templates/${id}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setAgentPricingTemplateData(response.data.data);
          console.log("candidate verification by id", agentPricingTemplateData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getAgentPeicingTemplateById", error);
      });
  };

  const getAgentMasteById = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/agents/${editId}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setAgentMasterData(response.data.data);
          // console.log("agent by id",response.data.data);
          // console.log("getAgentMasterData",agentMasterData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getBatchPriorityAPIcall", error);
      });
  };

  const getAgentPricingForCndUplBatchAPICalls = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/agent-pricing-templates`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setCandidateUploadBatchAdminData(
            response.data.data.agentPricingTemplates
          );
          console.log("agent template data", candidateUploadBatchAdminData);
        } else if (response.status == 400) {
          window.alert(response.data.message);
        }
      })
      .catch((error) => {
        navigate("/login");
        alert("Timeout - Login Again");
        setLoader(false);
        console.error(
          "There was an error!- getAgentTemplatePricingAPIcall",
          error
        );
      });
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
        <TableRow style={{ backgroundColor: "black" }}>
          <TableCell padding="checkbox">
            {/* <Checkbox
              style={{ color: "white", paddingRight: "30px" }}
              label="My checkbox"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            /> */}
          </TableCell>
          {tblHeader.map((headCell) => (
            <TableCell
              style={{ color: "white" }}
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
      value: "Maharashtra",
      label: "Maharashtra",
    },
    {
      value: "Gujarat",
      label: "Gujarat",
    },
    {
      value: "Andhra Pradesh",
      label: "Andhra Pradesh",
    },
    {
      value: "Karnataka",
      label: "Karnataka",
    },
    {
      value: "Rajasthan",
      label: "Rajasthan",
    },
    {
      value: "Bihar",
      label: "Bihar",
    },
    {
      value: "Aasam",
      label: "Aasam",
    },
    {
      value: "Chattisgarh",
      label: "Chattisgarh",
    },
    {
      value: "M Pradesh",
      label: "M Pradesh",
    },
    {
      value: "Goa",
      label: "Goa",
    },
    {
      value: "Haryana",
      label: "Haryana",
    },
    {
      value: "Jharkhand",
      label: "Jharkhand",
    },
    {
      value: "Uttar Pradesh",
      label: "Uttar Pradesh",
    },
  ];
  const role = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Call Center Staff",
      label: "Call Center Staff",
    },
    {
      value: "HO Agent",
      label: "HO Agent",
    },
    {
      value: "User",
      label: "User",
    },
  ];
  const candidateConsent = [
    {
      value: "Consent Pending ",
      label: "Consent Pending ",
    },
    {
      value: "Consent Declined ",
      label: "Consent Declined ",
    },
    {
      value: "Consent Received ",
      label: "Consent Received ",
    },
  ];
  const callStatus = [
    {
      value: "Busy",
      label: "Busy",
    },
    {
      value: "Call Back",
      label: "Call Back",
    },
    {
      value: "Completed ",
      label: "Completed",
    },
    {
      value: "Disconnected ",
      label: "Disconnected",
    },
    {
      value: "Half Details ",
      label: "Half Details",
    },
    {
      value: "Not Reachable ",
      label: "Not Reachable",
    },
    {
      value: "Ringing ",
      label: "Ringing",
    },
    {
      value: "Switch Off ",
      label: "Switch Off",
    },
  ];

  const industrySelectField = [
    {
      label: industryData.title,
      value: industryData.title,
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getAllData(pageName);
  };

  // onchange of number of rows data will refreshed and shows intable
  const handleChangeRowsPerPage = (event, row) => {
    setPage(0);
    setRowsPerPage(row.props.value);
  };

  const handleClickOpenAddBtchprty = () => {
    setOpenAddBtchprty(true);
  };

  const handleCloseAddBtchprty = () => {
    setEditStatus(false);
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
  const handleChangeCndVrfnTab = (event, newValue) => {
    setCndVrfnTabValue(newValue);
  };

  // used to handle child modal of candidate master module modal to insert certificate
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
  // used to go next page for candidate master module
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  // used to go back page for candidate master module
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

  //multi select value for the select field of batch priority
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  // {editStatus?Object.keys(tblData).map((item)=>{setCategoryData(tblData[item])}):"teste 3"}

  //defined states and inputs for modules
  // const EnhancedTableToolbar = (props) => {

  // add API calls
  const addAPICalls = (pageName) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    switch (pageName) {
      case "candidate-master":
        handler
          .dataPost(`/v1/candidates`, candidateMasterData, {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          })
          .then((response) => {
            console.log(response);
            if (response.status == 201) {
              console.log(response.data.message);
              setOpenCandidateModal(false);
              getAgentMasterAPIcall();
              setOpenAlertMsg(true);
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
      case "candidate-verification":
        handler
          .dataPost(`/v1/candidate-verifications`, candidateVerificationData, {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          })
          .then((response) => {
            console.log(response);
            if (response.status == 201) {
              console.log(response.data.message);
              getCandidateVerificationAPIcall();
              setOpenAlertMsg(true);
			  setOpenCandidateModal(false);
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
      case "agent-master":
        handler
          .dataPost(`/v1/agents`, agentMasterData, {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          })
          .then((response) => {
            console.log(response);
            if (response.status == 201) {
              console.log(response.data.message);
			  setOpenCandidateModal(false);
              getAgentMasterAPIcall();
              setOpenAlertMsg(true);
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
      case "agent-pricing-template":
        handler
          .dataPost(`/v1/agent-pricing-templates`, agentPricingTemplateData, {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          })
          .then((response) => {
            console.log(response);
            if (response.status == 201) {
              console.log(response.data.message);
			  setOpenCandidateModal(false);
              getAgentTemplatePricingAPIcall();
              setOpenAlertMsg(true);
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
      case "candidate-upload-batch-admin":
        break;
      case "batch-priority":
        handler
          .dataPost(`/v1/batch-priorities`, batchNo, {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          })
          .then((response) => {
            console.log(response);
            if (response.status == 201) {
              console.log(response.data.message);
              getBatchPriorityAPIcall();
              setOpenAlertMsg(true);
			  setOpenCandidateModal(false);
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
      case "category":
        handler
          .dataPost(`/v1/categories`, categoryData, {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          })
          .then((response) => {
            console.log(response);
            if (response.status == 201) {
              console.log(response.data.message);
			  setOpenCandidateModal(false);
              getCategoryAPIcall();
              setOpenAlertMsg(true);
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
			  setOpenCandidateModal(false);
              getCompanyAPIcall();
              setOpenAlertMsg(true);
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
			  setOpenCandidateModal(false);
              getIndustryAPIcall();
              setOpenAlertMsg(true);
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
			  setOpenCandidateModal(false);
              getRoleAPIcall();
              setOpenAlertMsg(true);
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
          .dataPost(`/v1/skills`, skillSetData, {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          })
          .then((response) => {
            console.log(response);
            if (response.status == 201) {
              console.log(response.data.message);
			  setOpenCandidateModal(false);
              getSkillSetAPIcall();
              setOpenAlertMsg(true);
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
          .dataPost(`/v1/subscriptions`, subscriptionData, {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          })
          .then((response) => {
            console.log(response);
            if (response.status == 201) {
              console.log(response.data.message);
			  setOpenCandidateModal(false);
              getSubscriptionAPIcall();
              setOpenAlertMsg(true);
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
			  setOpenCandidateModal(false);
              getUserAPIcall();
              setOpenAlertMsg(true);
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
  };

  // update the record
  const updateAPICalls = (pageName) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    console.log(editId);
    switch (pageName) {
      case "candidate-master":
        let updateCandidatesMasterData = {
          ...updateCandidateMasterData,
          id: editId,
        };
        handler
          .dataPut(
            `/v1/candidates/${updateCandidatesMasterData.id}`,
            updateCandidatesMasterData,
            {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status == 204) {
              console.log(response.data.message);
              setOpenAlertMsg(true);
              setOpenCandidateModal(false);
              getCandidateMasterAPIcall();
            } else {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              window.alert(error.data.message);
            }
            console.error("There was an error!- updateCategoryAPICall", error);
          });
        break;
      case "candidate-upload-batch":
        return null;
      case "candidate-verification":
        let updateCandidateVerifnData = {
          ...updateCandidateVerificationData,
          id: editId,
        };
        handler
          .dataPut(
            `/v1/candidate-verifications/${updateCandidateVerifnData.id}`,
            updateCandidateVerifnData,
            {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status == 204) {
              console.log(response.data.message);
              setOpenAlertMsg(true);
			  setOpenCandidateModal(false);
              getCandidateVerificationAPIcall();
            } else {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              window.alert(error.data.message);
            }
            console.error("There was an error!- updateCategoryAPICall", error);
          });
        break;
      case "agent-master":
        let updateAgentMaster = {
          ...agentMasterData,
          id: editId,
        };
        setLoader(true);
        handler
          .dataPut(`/v1/agents/${updateAgentMaster.id}`, updateAgentMaster, {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          })
          .then((response) => {
            console.log(response);
            if (response.status == 204) {
              console.log(response.data.message);
              setOpenAlertMsg(true);
			  setOpenCandidateModal(false);
              getAgentMasterAPIcall();
            } else {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              window.alert(error.data.message);
            }
            console.error("There was an error!- updateAgentByAPICall", error);
          });
        break;
      case "agent-pricing-template":
        let updateAgentPricingTemplate = {
          ...agentMasterData,
          id: editId,
        };
        setLoader(true);
        handler
          .dataPost(
            `/v1/agent-pricing-templates/${updateAgentPricingTemplate.id}/active`,
            updateAgentPricingTemplate,
            {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status == 204) {
              console.log(response.data.message);
              setOpenAlertMsg(true);
			  setOpenCandidateModal(false);
              getAgentTemplatePricingAPIcall();
            } else {
              window.alert(response.data.message);
              console.log("else part");
              getAgentTemplatePricingAPIcall();
              setOpenAlertMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              window.alert(error.data.message);
            }
            console.error("There was an error!- updateCategoryAPICall", error);
          });
        break;
      case "candidate-upload-batch-admin":
        let updateCandidateUploadBatchAdmin = {
          // ...candidateUploadBatchAdminData,
          templateId: candidateUploadBatchAdminData.id,
        };
        handler
          .dataPut(
            `/v1/admin/candidate-upload-batches/${candidateUploadBatchAdminData.id}/change-pricing-template`,
            updateCandidateUploadBatchAdmin,
            {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status == 204) {
              console.log(response.data.message);
              setOpenAlertMsg(true);
			  setOpenCandidateModal(false);
              getCandidateUploadBatchAdminAPIcall();
            } else {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              window.alert(error.data.message);
            }
            console.error("There was an error!- updateCategoryAPICall", error);
          });
        break;
      case "category":
        let updateCategoryData = {
          ...categoryData,
          id: editId,
        };
        handler
          .dataPut(
            `/v1/categories/:${updateCategoryData.id}`,
            updateCategoryData,
            {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status == 204) {
              console.log(response.data.message);
              setOpenAlertMsg(true);
			  setOpenCandidateModal(false);
              getCategoryAPIcall();
            } else {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              window.alert(error.data.message);
            }
            console.error("There was an error!- updateCategoryAPICall", error);
          });
        break;
      case "company":
        let updateCompanyData = {
          ...companyData,
          id: editId,
        };
        handler
          .dataPut(
            `/v1/companies/:${updateCompanyData.id}`,
            updateCompanyData,
            {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status == 204) {
              console.log(response.data.message);
			  setOpenCandidateModal(false);
              setOpenAlertMsg(true);
              getCompanyAPIcall();
            } else {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              window.alert(error.data.message);
            }
            console.error("There was an error!- updateCompanyAPICall", error);
          });
        break;
      case "industry":
        let updateIndustryData = {
          ...industryData,
          id: editId,
        };
        handler
          .dataPut(
            `/v1/industries/:${updateIndustryData.id}`,
            updateIndustryData,
            {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status == 204) {
              console.log(response.data.message);
			  setOpenCandidateModal(false);
              setOpenAlertMsg(true);
              getIndustryAPIcall();
            } else {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              window.alert(error.data.message);
            }
            console.error("There was an error!- updateCompanyAPICall", error);
          });
        break;
      case "role":
        let udateRoleData = {
          ...roleData,
          id: editId,
        };
        handler
          .dataPut(
            `/v1/roles/:${udateRoleData.id}`,
            udateRoleData,
            {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status == 204) {
              console.log(response.data.message);
			        setOpenCandidateModal(false);
              setOpenAlertMsg(true);
              getRoleAPIcall();
            } else {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              window.alert(error.data.message);
            }
            console.error("There was an error!- updateRoleById", error);
          });
        break;
      case "skillset":
        let updateSkillsetData = {
          ...skillSetData,
          id: editId,
        };
        handler
          .dataPut(`/v1/skills/:${updateSkillsetData.id}`, updateSkillsetData, {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          })
          .then((response) => {
            console.log(response);
            if (response.status == 204) {
              console.log(response.data.message);
			  setOpenCandidateModal(false);
              setOpenAlertMsg(true);
              getSkillSetAPIcall();
            } else {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              window.alert(error.data.message);
            }
            console.error("There was an error!- updateSkillsetAPICall", error);
          });
        break;
      case "subscription":
        let updateSubscriptionData = {
          ...subscriptionData,
          id: editId,
        };
        handler
          .dataPut(
            `/v1/subscriptions/:${updateSubscriptionData.id}`,
            updateSubscriptionData,
            {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status == 204) {
              console.log(response.data.message);
			  setOpenCandidateModal(false);
              setOpenAlertMsg(true);
              getSubscriptionAPIcall();
            } else {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              window.alert(error.data.message);
            }
            console.error(
              "There was an error!- updateSubscriptionAPICall",
              error
            );
          });
        break;
      case "user":
        let updateUsersData = {
          ...updateUserData,
          id: editId,
        };
        handler
          .dataPut(`/v1/users/:${updateUsersData.id}`, updateUsersData, {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          })
          .then((response) => {
            console.log(response);
            if (response.status == 204) {
              console.log(response.data.message);
			  setOpenCandidateModal(false);
              setOpenAlertMsg(true);
              getUserAPIcall();
            } else {
              window.alert(response.data.message);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              window.alert(error.data.message);
            }
            console.error(
              "There was an error!- updateSubscriptionAPICall",
              error
            );
          });
        break;
    }
  };


  //it handle the buttons of content page
  const handleButtons = () => {
    switch (pageName) {
      case "candidate-master":
        return (
          <>
            {editStatus ? (
              <Button
                onClick={() => {
                  // handleClickOpen();
                  handleOpenCandidateModal();
                  getCandidateMsaterAPIcallById();
                }}
                style={{
                  marginTop: "0px",
                  // marginRight: "5px",
                  backgroundColor: "brown",
                  color: "white",
                }}
                variant="outlined"
              >
                <EditIcon />
                Edit
              </Button>
            ) : (
              <Button
                onClick={handleOpenCandidateModal}
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
              onClick={handleOpenCandidateModal}
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
              onClick={() => addAPICalls("candidate-verification")}
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
            {editStatus ? (
              <Button
                onClick={() => {
                  handleOpenCandidateModal();
                  getAgentMasteById();
                }}
                style={{
                  marginTop: "50px",
                  marginRight: "5px",
                  backgroundColor: "brown",
                  color: "white",
                }}
                variant="outlined"
              >
                <EditIcon />
                Edit
              </Button>
            ) : (
              <Button
                onClick={handleOpenCandidateModal}
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
            {editStatus ? (
              <Button
                onClick={() => {
                  updateAPICalls("agent-pricing-template");
                }}
                style={{
                  marginTop: "80px",
                  marginRight: "5px",
                  backgroundColor: "brown",
                  color: "white",
                }}
                variant="outlined"
              >
                <ToggleOn />
                Set Active
              </Button>
            ) : (
              <Button
                onClick={handleOpenCandidateModal}
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
            {!editStatus ? (
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
            ) : (
              <Button
                onClick={() => {
                  handleClickOpenAdminCanUplBtch();
                  getAgentPricingForCndUplBatchAPICalls();
                }}
                style={{
                  marginTop: "80px",
                  marginRight: "0px",
                  backgroundColor: "brown",
                  color: "white",
                }}
                variant="outlined"
              >
                {/* <FileUploadIcon /> */}
                Change Pricing Template
              </Button>
            )}
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
            {editStatus ? (
              <Button
                onClick={() => {
                  handleOpenCandidateModal();
                  getRoleByIdAPIcall();
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
                <EditIcon />
                Edit
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleOpenCandidateModal();
                  getPermissionsAPIcall();
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
        );
      case "user":
        return (
          <>
            {editStatus ? (
              <Button
                onClick={() => {
                  handleOpenCandidateModal();
                  getUserAPIcallById();
                }}
                style={{
                  marginTop: "80px",
                  marginRight: "5px",
                  backgroundColor: "brown",
                  color: "white",
                }}
                variant="outlined"
              >
                <EditIcon />
                Edit
              </Button>
            ) : (
              <Button
                onClick={handleOpenCandidateModal}
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

      default:
        return (
          <>
            {editStatus ? (
              <Button
                onClick={() => {
                  handleOpenCandidateModal();
                }}
                style={{
                  marginTop: "80px",
                  marginRight: "5px",
                  backgroundColor: "brown",
                  color: "white",
                }}
                variant="outlined"
              >
                <EditIcon />
                Edit
              </Button>
            ) : (
              <Button
                onClick={handleOpenCandidateModal}
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
        return (
          <>
            {Object.keys(updateBatchPriority).map((item, x) => (
              <Card
                sx={{
                  maxWidth: 345,
                  bgcolor: "#e6fbf0",
                  mb: 2,
                  border: "1px solid #b5ddc8",
                  boxShadow: "0 1px 4px 0.25px #b5ddc8",
                }}
              >
                <CardHeader
                  style={{ alignItem: "center", marginLeft: "110px" }}
                  action={
                    <IconButton aria-label="Edit">
                      <EditIcon
                        onClick={() => {
                          setEditStatus(true);
                          setId(updateBatchPriority[item].assignedTo[item].id);
                          setOpenAddBtchprty(true);
                        }}
                        style={{ color: "#d32f2f" }}
                      />
                    </IconButton>
                  }
                  title="Batch no"
                />
                <h3
                  style={{
                    color: "#d32f2f",
                    display: "flex",
                    alignItem: "center",
                    justifyContent: "center",
                    position: "absolute",
                    marginLeft: "162px",
                    marginTop: "17px",
                  }}
                >
                  {updateBatchPriority[item].batchId}
                </h3>

                <CircularProgress
                  style={{ marginLeft: "140px", marginBottom: "-20px" }}
                  color="error"
                  variant="determinate"
                  value={100}
                  size={70}
                  thickness={3.4}
                />

                <CardContent>
                  {/* {Object.keys(updateBatchPriority).map((item, x) => ( */}
                  <Typography variant="body2" color="text.secondary">
                    <b>Assigned To</b>
                    <p style={{ marginLeft: "40px", marginBottom: "-30px" }}>
                      {updateBatchPriority[item].assignedTo[item].fullName}
                    </p>
                  </Typography>
                  {/* ))} */}
                </CardContent>
                <CardActions disableSpacing>
                  <p
                    expand={expanded}
                    onClick={
                      handleExpandClick
                      // setBatchPriorityId(updateBatchPriority[item].batchId);
                      // console.log(batchPriorityId);
                      // getBatchPriorityStatsDataAPIcall();
                    }
                    aria-expanded={expanded}
                    aria-label="SHOW STATS"
                    style={{
                      fontSize: "13px",
                      color: "#d32f2f",
                      marginLeft: "230px",
                      font: "bold",
                      cursor: "pointer",
                    }}
                  >
                    SHOW STATS
                  </p>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  {/* {Object.keys(batchPriorityAssingend).map((stats, i) => { */}
                  <CardContent>
                    <List>
                      <tr>
                        <td>Owner:</td>
                        {/* <td>{batchPriorityAssingend[stats].name}</td> */}
                      </tr>
                      <tr>
                        <td>Uploaded by:</td>
                        <td>tes 2</td>
                      </tr>
                      <tr>
                        <td>Uploader role:</td>
                        <td>HO Agent</td>
                      </tr>
                      <tr>
                        <td>Current pricing template:</td>
                        <td>Navnath Test</td>
                      </tr>
                    </List>
                  </CardContent>
                  {/* })} */}
                </Collapse>
              </Card>
            ))}
          </>
        );

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
  const handleModalInput = () => {
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
                        <p style={{ marginLeft: "130px", marginTop: "-30px" }}>
                          (png,jpg)
                        </p>
                      </div>
                      <div>
                        <ListItem>
                          <TextField
                            id="filled-basic"
                            label="Full Name"
                            variant="filled"
                            value={
                              !editStatus
                                ? candidateMasterData.fullName
                                : updateCandidateMasterData.fullName
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    fullName: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    fullName: e.target.value,
                                  });
                              console.log(candidateMasterData.fullName);
                            }}
                            sx={{ width: "69ch", mb: 4 }}
                          />
                        </ListItem>
                        <ListItem>
                          <TextField
                            id="filled-basic"
                            label="Birthdate"
                            InputLabelProps={{ shrink: true }}
                            type="date"
                            value={
                              !editStatus
                                ? candidateMasterData.birthDate
                                : updateCandidateMasterData.dob
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    birthDate: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    dob: e.target.value,
                                  });
                            }}
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
                            value={
                              !editStatus
                                ? candidateMasterData.perm_address
                                : updateCandidateMasterData.permAddress
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    perm_address: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    permAddress: e.target.value,
                                  });
                            }}
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
                            value={
                              !editStatus
                                ? candidateMasterData.perm_city
                                : updateCandidateMasterData.permCity
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    perm_city: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    permCity: e.target.value,
                                  });
                            }}
                            sx={{ width: "69ch" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="State"
                            variant="filled"
                            value={
                              !editStatus
                                ? candidateMasterData.perm_state
                                : updateCandidateMasterData.permState
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    perm_state: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    permState: e.target.value,
                                  });
                            }}
                            sx={{ ml: 3, width: "69ch" }}
                          />
                        </ListItem>
                        <ListItem sx={{ mb: 5 }}>
                          <TextField
                            id="filled-basic"
                            label="Country"
                            disabled
                            value={
                              !editStatus
                                ? candidateMasterData.perm_country
                                : updateCandidateMasterData.permCountry
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    perm_country: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    permCountry: e.target.value,
                                  });
                            }}
                            variant="filled"
                            sx={{ width: "69ch" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="Zip Code"
                            value={
                              !editStatus
                                ? candidateMasterData.perm_zip
                                : updateCandidateMasterData.permZip
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    perm_zip: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    permZip: e.target.value,
                                  });
                            }}
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
                            value={
                              !editStatus
                                ? candidateMasterData.curr_address
                                : updateCandidateMasterData.currAddress
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    curr_address: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    currAddress: e.target.value,
                                  });
                            }}
                            rows={5}
                            variant="filled"
                          />
                        </ListItem>
                        <ListItem sx={{ mb: 5 }}>
                          <TextField
                            id="filled-basic"
                            label="City"
                            variant="filled"
                            value={
                              !editStatus
                                ? candidateMasterData.curr_city
                                : updateCandidateMasterData.currCity
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    curr_city: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    currCity: e.target.value,
                                  });
                            }}
                            sx={{ width: "69ch" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="State"
                            value={
                              !editStatus
                                ? candidateMasterData.curr_state
                                : updateCandidateMasterData.currState
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    curr_state: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    currState: e.target.value,
                                  });
                            }}
                            variant="filled"
                            sx={{ ml: 3, width: "69ch" }}
                          />
                        </ListItem>
                        <ListItem sx={{ mb: 5 }}>
                          <TextField
                            id="filled-basic"
                            label="Country"
                            disabled
                            value={
                              !editStatus
                                ? candidateMasterData.curr_country
                                : updateCandidateMasterData.currCountry
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    curr_country: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    currCountry: e.target.value,
                                  });
                            }}
                            variant="filled"
                            sx={{ width: "69ch" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="Zip Code"
                            value={
                              !editStatus
                                ? candidateMasterData.curr_zip
                                : updateCandidateMasterData.currZip
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    curr_zip: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    currZip: e.target.value,
                                  });
                            }}
                            variant="filled"
                            sx={{ ml: 3, width: "69ch" }}
                          />
                        </ListItem>
                        <ListItem sx={{ mb: 5 }}>
                          <TextField
                            id="filled-basic"
                            label="Primary email address"
                            variant="filled"
                            value={
                              !editStatus
                                ? candidateMasterData.email1
                                : updateCandidateMasterData.email1
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    email1: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    email1: e.target.value,
                                  });
                            }}
                            sx={{ width: "69ch" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="Secondary email address"
                            variant="filled"
                            value={
                              !editStatus
                                ? candidateMasterData.email2
                                : updateCandidateMasterData.email2
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    email2: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    email2: e.target.value,
                                  });
                            }}
                            sx={{ ml: 3, width: "69ch" }}
                          />
                        </ListItem>
                        <ListItem sx={{ mb: 5 }}>
                          <TextField
                            id="filled-basic"
                            label="Primary contact no"
                            variant="filled"
                            value={
                              !editStatus
                                ? candidateMasterData.contactNo1
                                : updateCandidateMasterData.contactNo1
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    contactNo1: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    contactNo1: e.target.value,
                                  });
                            }}
                            sx={{ width: "69ch" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="Secondary contact no"
                            variant="filled"
                            value={
                              !editStatus
                                ? candidateMasterData.contactNo2
                                : updateCandidateMasterData.contactNo2
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    contactNo2: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    contactNo2: e.target.value,
                                  });
                            }}
                            sx={{ ml: 3, width: "69ch" }}
                          />
                        </ListItem>
                        <ListItem sx={{ mb: 5 }}>
                          <TextField
                            id="filled-basic"
                            label="Aadhar no"
                            variant="filled"
                            value={
                              !editStatus
                                ? candidateMasterData.aadharNo
                                : updateCandidateMasterData.aadharNo
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    aadharNo: e.target.value,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    aadharNo: e.target.value,
                                  });
                            }}
                            sx={{ width: "69ch" }}
                          />
                          <TextField
                            id="filled-basic"
                            label="Status"
                            select
                            children
                            variant="filled"
                            sx={{ ml: 3, width: "69ch" }}
                          />
                        </ListItem>
                        <ListItem sx={{ mb: 5 }}>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Is Active"
                            value={
                              !editStatus
                                ? candidateMasterData.isActive
                                : updateCandidateMasterData.isActive
                            }
                            onChange={(e) => {
                              !editStatus
                                ? setCandidateMasterData({
                                    ...candidateMasterData,
                                    isActive: e.target.checked,
                                  })
                                : setUpdateCandidateMasterData({
                                    ...updateCandidateMasterData,
                                    isActive: e.target.checked,
                                  });
                            }}
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
                          {!editStatus ? (
                            <Button
                              style={{
                                backgroundColor: "brown",
                                color: "white",
                                margin: "10px",
                              }}
                              onClick={() => {
                                addAPICalls("candidate-master");
                              }}
                            >
                              SAVE AND NEXT
                            </Button>
                          ) : (
                            <Button
                              style={{
                                backgroundColor: "brown",
                                color: "white",
                                margin: "10px",
                              }}
                              onClick={() => {
                                updateAPICalls("candidate-master");
                              }}
                            >
                              UPDATE AND NEXT
                            </Button>
                          )}
                          <Button
                            onClick={() => {
                              handleNext();
                            }}
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

                          {!editStatus ? (
                            <Button
                              onClick={() => {
                                addAPICalls("candidate-master");
                              }}
                              style={{
                                backgroundColor: "brown",
                                color: "white",
                              }}
                            >
                              SAVE
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                updateAPICalls("candidate-master");
                              }}
                              style={{
                                backgroundColor: "brown",
                                color: "white",
                              }}
                            >
                              UPDATE
                            </Button>
                          )}
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
                      children
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
                    <b> exactly same as per the template</b> given above. Column
                    names are not case sensitive.
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
                    Following are<b> mandatory fields</b>, if<b> anyone </b> is
                    missing, record will be rejected.
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
                    fields in Excel sheet or in our system database, that value
                    will be ignored(consider blank)
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

      case "candidate-verification":
        return (
          <>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
              }}
            >
              <h3 style={{ color: "red", textAlign: "center" }}>
                Everything is readonly.
              </h3>

              <Card
                sx={{
                  maxWidth: 1545,
                  bgcolor: "#F0FDFF",
                  mb: 2,
                  border: "1px solid #b6e6ee",
                  boxShadow: "0 1px 4px 0.25px #b6e6ee",
                }}
              >
                <CardContent>
                  <ListItem
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                    }}
                  >
                    <b>Batch no :</b> {updateCandidateVerificationData.batchNo}
                    <b style={{ marginLeft: "10px" }}>Row no :</b>{" "}
                    {updateCandidateVerificationData.rowNo}
                    <b style={{ marginLeft: "10px" }}>Batch Owner :</b>{" "}
                    {updateCandidateVerificationData.createdBy}
                    <b style={{ marginLeft: "10px" }}>Role :</b>{" "}
                    {updateCandidateVerificationData.role}
                  </ListItem>
                </CardContent>
              </Card>
              <ListItem style={{ justifyContent: "flex-end" }}>
                <Button
                  style={{ backgroundColor: "brown", color: "white" }}
                  onClick={() => {
                    updateAPICalls("candidate-verification");
                  }}
                >
                  Save
                </Button>
                <Button
                  style={{
                    backgroundColor: "brown",
                    color: "white",
                    marginLeft: "10px",
                  }}
                >
                  Submit
                </Button>
                <Button
                  style={{
                    backgroundColor: "#f5f5f5",
                    color: "black",
                    marginLeft: "10px",
                  }}
                >
                  Exit
                </Button>
              </ListItem>
              <ListItem
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                }}
              >
                <Card
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    maxWidth: 1345,
                    backgroundColor: "#ffeaeb",
                    marginBottom: 2,
                    borderRadius: "3px",
                    border: "1px solid #eecacb",
                    boxShadow: "0 1px 4px 0.25px #eecacb",
                  }}
                >
                  <CardContent>
                    <TextField
                      select
                      required
                      sx={{ width: "30ch" }}
                      label="Candidate consent"
                      // value={updateCandidateVerificationData}
                    >
                      {candidateConsent.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      required
                      sx={{ width: "30ch", ml: 2 }}
                      label="Call Status"
                    >
                      {callStatus.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      multiline
                      rows={2}
                      sx={{ width: "50ch", ml: 2 }}
                      label="Comment"
                    />
                  </CardContent>
                </Card>
                <h3>Call Centre History (0)</h3>
              </ListItem>
              <ListItem
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                }}
              >
                <FormControlLabel
                  control={<Checkbox />}
                  label="Old Industry:"
                ></FormControlLabel>
                <b>NA</b>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Old Category:"
                ></FormControlLabel>
                <b>INSTRUMENTATION ENGINEER</b>
                <FormControlLabel
                  disabled
                  control={<Checkbox />}
                  label="Old Education:"
                ></FormControlLabel>
              </ListItem>
              {/* <ListItem> */}
              <TabContext value={cndVrfnTabValue}>
                <Box>
                  <TabList
                    style={{ backgroundColor: "#c7c1c1" }}
                    onChange={handleChangeCndVrfnTab}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="PART 1" value="1" />
                    <Tab label="PART 2" value="2" />
                    <Tab label="PART 3" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <ListItem
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                    }}
                  >
                    <TextField
                    disabled={editStatus}
                      required
                      sx={{ width: "30ch" }}
                      size="small"
                      label="Full Name"
                      value={updateCandidateVerificationData.fullName}
                      onChange={(e) => {
                        setUpdateCandidateVerificationData({
                          ...updateCandidateVerificationData,
                          fullName: e.target.value,
                        });
                      }}
                    />
                    <TextField
                    disabled={editStatus}
                      required
                      sx={{ ml: 3, width: "30ch" }}
                      size="small"
                      label="Primary Mobile"
                      value={updateCandidateVerificationData.contactNo1}
                      onChange={(e) => {
                        setUpdateCandidateVerificationData({
                          ...updateCandidateVerificationData,
                          contactNo1: e.target.value,
                        });
                      }}
                    />
                    <TextField
                    disabled={editStatus}
                      sx={{ ml: 3, width: "30ch" }}
                      size="small"
                      label="Secondary Mobile"
                      value={updateCandidateVerificationData.contactNo2}
                      onChange={(e) => {
                        setUpdateCandidateVerificationData({
                          ...updateCandidateVerificationData,
                          contactNo2: e.target.value,
                        });
                      }}
                    />
                    <TextField
                    disabled={editStatus}
                      sx={{ ml: 3, width: "30ch" }}
                      size="small"
                      label="Primary Email"
                      value={updateCandidateVerificationData.email1}
                      onChange={(e) => {
                        setUpdateCandidateVerificationData({
                          ...updateCandidateVerificationData,
                          email1: e.target.value,
                        });
                      }}
                    />
                  </ListItem>
                  <ListItem
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                    }}
                  >
                    <TextField
                      sx={{ width: "30ch" }}
                      size="small"
                      label="Total Exp years"
                      value={updateCandidateVerificationData.expYears}
                      onChange={(e) => {
                        setUpdateCandidateVerificationData({
                          ...updateCandidateVerificationData,
                          expYears: e.target.value,
                        });
                      }}
                    />
                    <TextField
                      sx={{ ml: 3, width: "30ch" }}
                      size="small"
                      label="Education"
                      value={updateCandidateVerificationData.education}
                      onChange={(e) => {
                        setUpdateCandidateVerificationData({
                          ...updateCandidateVerificationData,
                          education: e.target.value,
                        });
                      }}
                    />
                    <TextField
                      sx={{ ml: 3, width: "30ch" }}
                      size="small"
                      label="Birthdate"
                      value={updateCandidateVerificationData.dob}
                      onChange={(e) => {
                        setUpdateCandidateVerificationData({
                          ...updateCandidateVerificationData,
                          dob: e.target.value,
                        });
                      }}
                    />
                    <TextField
                      select
                      value={updateCandidateVerificationData.gender}
                      onSelect={(e) => {
                        setUpdateCandidateVerificationData({
                          ...updateCandidateVerificationData,
                          gender: e.target.value,
                        });
                      }}
                      sx={{ ml: 3, width: "30ch" }}
                      size="small"
                      label="Gender"
                    >
                      {gender.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </ListItem>
                  {/* <ListItem style={{display:'flex',flexDirection:'row',flexWrap:'nowrap'}}> */}
                  <Card
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      justifyContent: "space-around",
                      maxWidth: 1170,
                      backgroundColor: "#F0FDFF",
                      marginBottom: 2,
                      border: "1px solid #b6e6ee",
                      boxShadow: "0 1px 4px 0.25px #b6e6ee",
                    }}
                  >
                    <ListItem
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <b style={{ color: "red" }}>Industry</b>
                      <TextField
                        size="small"
                        sx={{ width: "30ch" }}
                        select
                        label="Industry"
                        value={updateCandidateVerificationData.industry}
                        onChange={(e) => {
                          setUpdateCandidateVerificationData({
                            ...updateCandidateVerificationData,
                            industry: e.target.value,
                          });
                        }}
                      >
                        {industrySelectField.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <Button
                        disabled
                        size="small"
                        style={{
                          backgroundColor: "gray",
                          color: "white",
                          marginTop: "20px",
                        }}
                      >
                        Add More
                      </Button>
                    </ListItem>
                    <ListItem
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <b style={{ color: "red" }}>Category</b>
                      <TextField
                        size="small"
                        sx={{ width: "30ch" }}
                        select
                        label="Category"
                        value={updateCandidateVerificationData.category}
                        onChange={(e) => {
                          setUpdateCandidateVerificationData({
                            ...updateCandidateVerificationData,
                            category: e.target.value,
                          });
                        }}
                      >
                        {industrySelectField.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <Button
                        disabled
                        size="small"
                        style={{
                          backgroundColor: "gray",
                          color: "white",
                          marginTop: "20px",
                        }}
                      >
                        Add More
                      </Button>
                    </ListItem>
                  </Card>
                  <ListItem
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                    }}
                  >
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Old Company:"
                    ></FormControlLabel>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Old Designation:"
                    ></FormControlLabel>
                  </ListItem>
                  <Card
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      // justifyContent:'space-around',
                      maxWidth: 1170,
                      backgroundColor: "#e6fbf0",
                      marginBottom: 2,
                      border: "1px solid #b5ddc8",
                      boxShadow: "0 1px 4px 0.25px #b5ddc8",
                    }}
                  >
                    <ListItem
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Currently Employed?"
                      ></FormControlLabel>
                      <ListItem
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                        }}
                      >
                        <TextField
                          size="small"
                          sx={{ width: "30ch" }}
                          label="Company Name"
                          value={
                            updateCandidateVerificationData.verification
                              .lastCompany
                          }
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData.verification,
                              lastCompany: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          select
                          label="Industry"
                          value={
                            updateCandidateVerificationData.verification
                              .industry
                          }
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData.verification,
                              industry: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          select
                          label="Category(Designation)"
                          value={
                            updateCandidateVerificationData.verification
                              .designation
                          }
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData.verification,
                              designation: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          size="small"
                          sx={{ width: "10ch", ml: 2 }}
                          helperText="Start date"
                          select
                          label="MM"
                        />
                        <TextField
                          size="small"
                          sx={{ width: "20ch", ml: 2 }}
                          select
                          label="YYYY"
                        />
                      </ListItem>

                      <ListItem
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                        }}
                      >
                        <TextField
                          size="small"
                          sx={{ width: "10ch", ml: 2 }}
                          helperText="End date"
                          select
                          label="MM"
                        />
                        <TextField
                          size="small"
                          sx={{ width: "20ch", ml: 2 }}
                          select
                          label="YYYY"
                        />
                        <TextField
                          size="small"
                          sx={{ width: "40ch", ml: 2 }}
                          multiline
                          rows={2}
                          label="Job Description"
                        />
                      </ListItem>
                    </ListItem>
                  </Card>
                  <ListItem>
                    <Button
                      disabled
                      size="small"
                      style={{ backgroundColor: "gray", color: "white" }}
                    >
                      Add More
                    </Button>
                  </ListItem>
                </TabPanel>
                <TabPanel value="2">
                  <Card
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      // justifyContent:'space-around',
                      maxWidth: 1170,
                      backgroundColor: "#F0FDFF",
                      marginBottom: 2,
                      border: "1px solid #b6e6ee",
                      boxShadow: "0 1px 4px 0.25px #b6e6ee",
                    }}
                  >
                    <ListItem
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <ListItem
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                        }}
                      >
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          label="Primary skill Name"
                          value={updateCandidateVerificationData.skill1}
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData,
                              skill1: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          select
                          label="Secondary skill"
                          value={updateCandidateVerificationData.skill2}
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData,
                              skill2: e.target.value,
                            });
                          }}
                        />
                      </ListItem>

                      <ListItem
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                        }}
                      >
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          label="Preffered location 1"
                          value={
                            updateCandidateVerificationData.preferLocation1
                          }
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData,
                              preferLocation1: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          label="Preffered location 2"
                          value={
                            updateCandidateVerificationData.preferLocation2
                          }
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData,
                              preferLocation2: e.target.value,
                            });
                          }}
                        />
                      </ListItem>
                      <ListItem
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                        }}
                      >
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          label="Primary Lanugage"
                          value={
                            updateCandidateVerificationData.primaryLanguage
                          }
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData,
                              primaryLanguage: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          label="Secondary Lanugage"
                          value={
                            updateCandidateVerificationData.secondaryLanguage
                          }
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData,
                              secondaryLanguage: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          label="Third Lanugage"
                          value={updateCandidateVerificationData.thirdLanguage}
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData,
                              thirdLanguage: e.target.value,
                            });
                          }}
                        />
                      </ListItem>
                    </ListItem>
                  </Card>

                  <ListItem
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                    }}
                  >
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Old Primary Language:"
                    ></FormControlLabel>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Old Secondary Language:"
                    ></FormControlLabel>
                  </ListItem>
                  <Card
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      // justifyContent:'space-around',
                      maxWidth: 1170,
                      backgroundColor: "#e6fbf0",
                      marginBottom: 2,
                      border: "1px solid #b5ddc8",
                      boxShadow: "0 1px 4px 0.25px #b5ddc8",
                    }}
                  >
                    <ListItem
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <ListItem
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                        }}
                      >
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          label="Current Pincode"
                          value={updateCandidateVerificationData.currZip}
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData,
                              currZip: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          label="Current City"
                          value={updateCandidateVerificationData.currCity}
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData,
                              currCity: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          label="Current State"
                          value={updateCandidateVerificationData.currState}
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData,
                              currState: e.target.value,
                            });
                          }}
                        />
                      </ListItem>

                      <ListItem
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                        }}
                      >
                        <TextField
                          size="small"
                          sx={{ width: "40ch", ml: 2 }}
                          multiline
                          rows={2}
                          label="Current Address"
                        />
                      </ListItem>
                    </ListItem>
                  </Card>
                </TabPanel>
                <TabPanel value="3">
                  <Card
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      // justifyContent:'space-around',
                      maxWidth: 1170,
                      backgroundColor: "#e6fbf0",
                      marginBottom: 2,
                      border: "1px solid #b5ddc8",
                      boxShadow: "0 1px 4px 0.25px #b5ddc8",
                    }}
                  >
                    <ListItem
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Same as current address"
                      ></FormControlLabel>
                      <ListItem
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                        }}
                      >
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          label="Permanent Pincode"
                          value={updateCandidateVerificationData.permZip}
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData,
                              permZip: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          label="Permanent City"
                          value={updateCandidateVerificationData.permCity}
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData,
                              permCity: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          size="small"
                          sx={{ width: "30ch", ml: 2 }}
                          label="Permanent State"
                          value={updateCandidateVerificationData.permState}
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData,
                              permState: e.target.value,
                            });
                          }}
                        />
                      </ListItem>

                      <ListItem
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                        }}
                      >
                        <TextField
                          size="small"
                          sx={{ width: "40ch", ml: 2 }}
                          multiline
                          rows={2}
                          label="Permanent Address"
                          value={updateCandidateVerificationData.permAddress}
                          onChange={(e) => {
                            setUpdateCandidateVerificationData({
                              ...updateCandidateVerificationData,
                              permAddress: e.target.value,
                            });
                          }}
                        />
                      </ListItem>
                    </ListItem>
                  </Card>
                  <ListItem
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <ListItem
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "nowrap",
                      }}
                    >
                      <TextField
                        size="small"
                        sx={{ width: "30ch", ml: 2 }}
                        label="Aadhar No"
                        value={updateCandidateVerificationData.aadharNo}
                        onChange={(e) => {
                          setUpdateCandidateVerificationData({
                            ...updateCandidateVerificationData,
                            aadharNo: e.target.value,
                          });
                        }}
                      />
                      <TextField
                        size="small"
                        sx={{ width: "30ch", ml: 2 }}
                        label="Pan No"
                        value={updateCandidateVerificationData.panNo}
                        onChange={(e) => {
                          setUpdateCandidateVerificationData({
                            ...updateCandidateVerificationData,
                            panNo: e.target.value,
                          });
                        }}
                      />
                      <TextField
                        size="small"
                        sx={{ width: "30ch", ml: 2 }}
                        label="Driving Licence no"
                        value={updateCandidateVerificationData.dlNo}
                        onChange={(e) => {
                          setUpdateCandidateVerificationData({
                            ...updateCandidateVerificationData,
                            dlNo: e.target.value,
                          });
                        }}
                      />
                    </ListItem>

                    <ListItem
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "nowrap",
                      }}
                    >
                      <TextField
                        size="small"
                        sx={{ width: "40ch", ml: 2 }}
                        multiline
                        rows={2}
                        label="Note"
                        value={updateCandidateVerificationData.note}
                        onChange={(e) => {
                          setUpdateCandidateVerificationData({
                            ...updateCandidateVerificationData,
                            note: e.target.value,
                          });
                        }}
                      />
                    </ListItem>
                  </ListItem>
                </TabPanel>
                <Box>
                  <TabList
                    style={{ backgroundColor: "#c7c1c1" }}
                    onChange={handleChangeCndVrfnTab}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="PART 1" value="1" />
                    <Tab label="PART 2" value="2" />
                    <Tab label="PART 3" value="3" />
                  </TabList>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "brown",
                      color: "white",
                      marginLeft: "10px",
                    }}
                    onClick={() => {
                      updateAPICalls("candidate-verification");
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#f5f5f5",
                      color: "black",
                      marginLeft: "10px",
                    }}
                  >
                    Exit
                  </Button>
                </Box>
              </TabContext>
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
                          label="Agent No"
                          variant="filled"
                          disabled={editStatus}
                          sx={{ width: "30ch" }}
                          value={agentMasterData.agentNo}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              agentNo: e.target.value,
                            });
                          }}
                        />

                        {cmpyvalue === "company" ? (
                          <>
                            <TextField
                              id="filled-basic"
                              label="Company Name"
                              type="name"
                              value={agentMasterData.companyName}
                              onChange={(e) => {
                                setAgentMasterData({
                                  ...agentMasterData,
                                  companyName: e.target.value,
                                });
                              }}
                              variant="filled"
                              sx={{ width: "30ch", ml: 4 }}
                            />
                            <TextField
                              id="filled-basic"
                              label="GSTIN"
                              type="name"
                              value={agentMasterData.gstin}
                              onChange={(e) => {
                                setAgentMasterData({
                                  ...agentMasterData,
                                  gstin: e.target.value,
                                });
                              }}
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
                          value={agentMasterData.fullName}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              fullName: e.target.value,
                            });
                          }}
                          type="name"
                          variant="filled"
                          sx={{ width: "30ch" }}
                        />
                        <TextField
                          id="filled-basic"
                          label="Birthdate"
                          InputLabelProps={{ shrink: true }}
                          type="date"
                          value={agentMasterData.dob}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              dob: e.target.value,
                            });
                          }}
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
                            control={<Radio />}
                            label="Female"
                            value={agentMasterData.gender}
                            onChange={(e) => {
                              setAgentMasterData({
                                ...agentMasterData,
                                gender: e.target.value,
                              });
                            }}
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Male"
                            checked
                            value={agentMasterData.gender}
                            onChange={(e) => {
                              setAgentMasterData({
                                ...agentMasterData,
                                gender: e.target.value,
                              });
                            }}
                          />
                          <FormControlLabel
                            control={<Radio />}
                            label="Other"
                            value={agentMasterData.gender}
                            onChange={(e) => {
                              setAgentMasterData({
                                ...agentMasterData,
                                gender: e.target.value,
                              });
                            }}
                          />
                        </RadioGroup>
                      </List>
                      <List>
                        <TextField
                          id="filled-basic"
                          label="Email"
                          required
                          disabled={editStatus}
                          type="email"
                          variant="filled"
                          sx={{ width: "30ch" }}
                          value={agentMasterData.email}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              email: e.target.value,
                            });
                          }}
                        />
                        <TextField
                          id="filled-basic"
                          label="Contact no"
                          required
                          type="number"
                          variant="filled"
                          value={agentMasterData.contactNo}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              contactNo: e.target.value,
                            });
                          }}
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
                          value={agentMasterData.currAddress}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              currAddress: e.target.value,
                            });
                          }}
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
                          value={agentMasterData.currZip}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              currZip: e.target.value,
                            });
                          }}
                          variant="filled"
                          sx={{ width: "30ch" }}
                        />
                        <TextField
                          id="filled-basic"
                          label="Current city"
                          required
                          value={agentMasterData.currCity}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              currCity: e.target.value,
                            });
                          }}
                          type="address"
                          variant="filled"
                          sx={{ width: "30ch", ml: 4 }}
                        />
                        <TextField
                          id="filled-basic"
                          label="Current state"
                          required
                          value={agentMasterData.currState}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              currState: e.target.value,
                            });
                          }}
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
                          value={agentMasterData.permAddress}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              permAddress: e.target.value,
                            });
                          }}
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
                          value={agentMasterData.permZip}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              permZip: e.target.value,
                            });
                          }}
                          variant="filled"
                          sx={{ width: "30ch" }}
                        />
                        <TextField
                          id="filled-basic"
                          label="Permanent city"
                          required
                          value={agentMasterData.permCity}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              permCity: e.target.value,
                            });
                          }}
                          type="address"
                          variant="filled"
                          sx={{ width: "30ch", ml: 4 }}
                        />
                        <TextField
                          id="filled-basic"
                          label="Permanent state"
                          required
                          value={agentMasterData.permState}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              permState: e.target.value,
                            });
                          }}
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
                          value={agentMasterData.panCard}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              panCard: e.target.value,
                            });
                          }}
                          type="name"
                          variant="filled"
                          sx={{ width: "30ch" }}
                        />
                        <TextField
                          id="filled-basic"
                          label="Aadhar card"
                          required
                          value={agentMasterData.aadharCard}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              aadharCard: e.target.value,
                            });
                          }}
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
                          value={agentMasterData.primaryLang}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              primaryLang: e.target.value,
                            });
                          }}
                          type="name"
                          variant="filled"
                          sx={{ width: "30ch" }}
                        />
                        <TextField
                          id="filled-basic"
                          label="Secondary language"
                          required
                          value={agentMasterData.secondaryLang}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              secondaryLang: e.target.value,
                            });
                          }}
                          type="name"
                          variant="filled"
                          sx={{ width: "30ch", ml: 4 }}
                        />
                        <TextField
                          id="filled-basic"
                          label="Third language"
                          required
                          value={agentMasterData.thirdLang}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              thirdLang: e.target.value,
                            });
                          }}
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
                          value={agentMasterData.note}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              note: e.target.value,
                            });
                            console.log(agentMasterData.note);
                          }}
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
                          value={agentMasterData.isActive}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              isActive: e.target.checked,
                            });
                          }}
                        />
                      </List>
                      <List>
                        {!editStatus ? (
                          <Button
                            onClick={() => addAPICalls("agent-master")}
                            style={{ color: "white", backgroundColor: "brown" }}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            onClick={() => updateAPICalls("agent-master")}
                            style={{ color: "white", backgroundColor: "brown" }}
                          >
                            Update
                          </Button>
                        )}
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
                        value={agentMasterData.bankName}
                        onChange={(e) => {
                          setAgentMasterData({
                            ...agentMasterData,
                            bankName: e.target.value,
                          });
                        }}
                        variant="filled"
                        sx={{ width: "30ch" }}
                      />
                      <TextField
                        id="filled-basic"
                        label="A/C no"
                        type="name"
                        value={agentMasterData.bankAc}
                        onChange={(e) => {
                          setAgentMasterData({
                            ...agentMasterData,
                            bankAc: e.target.value,
                          });
                        }}
                        variant="filled"
                        sx={{ width: "30ch", ml: 4 }}
                      />
                      <TextField
                        id="filled-basic"
                        label="IFSC Code"
                        type="name"
                        value={agentMasterData.bankIfsc}
                        onChange={(e) => {
                          setAgentMasterData({
                            ...agentMasterData,
                            bankIfsc: e.target.value,
                          });
                        }}
                        variant="filled"
                        sx={{ width: "30ch", ml: 4 }}
                      />
                      <TextField
                        id="filled-basic"
                        label="A/C Type"
                        type="name"
                        value={agentMasterData.bankAcType}
                        onChange={(e) => {
                          setAgentMasterData({
                            ...agentMasterData,
                            bankAcType: e.target.value,
                          });
                        }}
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
                        value={agentMasterData.professionalStatus}
                        onChange={(e) => {
                          setAgentMasterData({
                            ...agentMasterData,
                            professionalStatus: e.target.value,
                          });
                        }}
                        variant="filled"
                        sx={{ width: "30ch" }}
                      />
                      <TextField
                        id="filled-basic"
                        label="Sub work location 1 "
                        type="name"
                        value={agentMasterData.workLocation1}
                        onChange={(e) => {
                          setAgentMasterData({
                            ...agentMasterData,
                            workLocation1: e.target.value,
                          });
                        }}
                        variant="filled"
                        sx={{ width: "30ch", ml: 4 }}
                      />
                      <TextField
                        id="filled-basic"
                        label="Sub work location 2"
                        type="name"
                        value={agentMasterData.workLocation2}
                        onChange={(e) => {
                          setAgentMasterData({
                            ...agentMasterData,
                            workLocation2: e.target.value,
                          });
                        }}
                        variant="filled"
                        sx={{ width: "30ch", ml: 4 }}
                      />
                    </List>
                    <List>
                      <ProfessionalTab />
                    </List>
                    <List>
                      <Button
                        onClick={() => addAPICalls("agent-master")}
                        style={{
                          color: "white",
                          backgroundColor: "brown",
                          marginTop: 3,
                        }}
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
          <Box>
            <List
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mr: 20,
                alignItems: "flex-start",
              }}
            >
              {!editStatus?(<><Button sx={{ color: "white", bgcolor: "brown", mr: 1 }}>
                Save
              </Button>
              <Button sx={{ color: "black", bgcolor: "#f5f0e4" }}>Exit</Button></>):null}

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
                disabled={editStatus}
                  required
                  id="filled-basic"
                  label="Template Name"
                  type="name"
                  variant="filled"
                  value={agentPricingTemplateData.templateName}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      templateName: e.target.value,
                    });
                  }}
                  sx={{ width: "30ch" }}
                />
                <TextField
                disabled={editStatus}
                  id="filled-basic"
                  label="Description"
                  type="name"
                  value={agentPricingTemplateData.description}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      description: e.target.value,
                    });
                  }}
                  variant="filled"
                  sx={{ width: "40ch", ml: 4 }}
                />
                <TextField
                disabled={editStatus}
                  id="filled-basic"
                  label="Approval Remarks"
                  type="name"
                  value={agentPricingTemplateData.approvalRemarks}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      approvalRemarks: e.target.value,
                    });
                  }}
                  variant="filled"
                  sx={{ width: "40ch", ml: 4 }}
                />
              </List>
              <List sx={{ mt: 4, mb: 4 }}>
                <TextField
                disabled={editStatus}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  value={agentPricingTemplateData.industry}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      industry: e.target.value,
                    });
                  }}
                  label="Industry"
                  variant="outlined"
                />
                <TextField
                disabled={editStatus}
                  sx={{ ml: 2 }}
                  id="outlined-basic"
                  size="small"
                  value={agentPricingTemplateData.category}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      category: e.target.value,
                    });
                  }}
                  type="number"
                  label="Category"
                  variant="outlined"
                />
                <TextField
                disabled={editStatus}
                  sx={{ ml: 2 }}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Education"
                  variant="outlined"
                  value={agentPricingTemplateData.education}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      education: e.target.value,
                    });
                  }}
                />
              </List>
              <List>
                <TextField
                disabled={editStatus}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Full Name"
                  variant="outlined"
                  value={agentPricingTemplateData.fullName}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      fullName: e.target.value,
                    });
                  }}
                />
              </List>
              <List sx={{ mt: 4, mb: 4 }}>
                <TextField
                disabled={editStatus}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Birthdate"
                  variant="outlined"
                  value={agentPricingTemplateData.dob}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      dob: e.target.value,
                    });
                  }}
                />
              </List>
              <List>
                <TextField
                disabled={editStatus}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Primary language"
                  variant="outlined"
                  value={agentPricingTemplateData.primaryLanguage}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      primaryLanguage: e.target.value,
                    });
                  }}
                />
                <TextField
                disabled={editStatus}
                  sx={{ ml: 2 }}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Secondary language"
                  variant="outlined"
                  value={agentPricingTemplateData.secondaryLanguage}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      secondaryLanguage: e.target.value,
                    });
                  }}
                />
              </List>
              <List sx={{ mt: 4, mb: 4 }}>
                <TextField
                disabled={editStatus}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Primary Mobile"
                  variant="outlined"
                  value={agentPricingTemplateData.contactNo1}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      contactNo1: e.target.value,
                    });
                  }}
                />
              </List>
              <List>
                <TextField
                disabled={editStatus}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Current city"
                  variant="outlined"
                  value={agentPricingTemplateData.currCity}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      currCity: e.target.value,
                    });
                  }}
                />
                <TextField
                disabled={editStatus}
                  sx={{ ml: 2 }}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Current pincode"
                  variant="outlined"
                  value={agentPricingTemplateData.currZip}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      currZip: e.target.value,
                    });
                  }}
                />
              </List>
              <List sx={{ mt: 4, mb: 4 }}>
                <TextField
                disabled={editStatus}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Primary Email"
                  variant="outlined"
                  value={agentPricingTemplateData.email1}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      email1: e.target.value,
                    });
                  }}
                />
              </List>
              <List>
                <TextField
                disabled={editStatus}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Preffered location 1"
                  variant="outlined"
                  value={agentPricingTemplateData.preferLocation1}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      preferLocation1: e.target.value,
                    });
                  }}
                />
                <TextField
                disabled={editStatus}
                  sx={{ ml: 2 }}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Preffered location 2"
                  variant="outlined"
                  value={agentPricingTemplateData.preferLocation2}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      preferLocation2: e.target.value,
                    });
                  }}
                />
              </List>
              <List sx={{ mt: 4, mb: 4 }}>
                <TextField
                disabled={editStatus}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Work Exp yrs"
                  variant="outlined"
                  value={agentPricingTemplateData.expYears}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      expYears: e.target.value,
                    });
                  }}
                />
              </List>
              <List>
                <TextField
                disabled={editStatus}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Last company name"
                  variant="outlined"
                  value={agentPricingTemplateData.lastCompany}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      lastCompany: e.target.value,
                    });
                  }}
                />
                <TextField
                disabled={editStatus}
                  sx={{ ml: 2 }}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Designation"
                  variant="outlined"
                  value={agentPricingTemplateData.designation}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      designation: e.target.value,
                    });
                  }}
                />
              </List>
              <List sx={{ mt: 4, mb: 4 }}>
                <TextField
                disabled={editStatus}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Primary skills"
                  variant="outlined"
                  value={agentPricingTemplateData.skill1}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      skill1: e.target.value,
                    });
                  }}
                />
                <TextField
                disabled={editStatus}
                  sx={{ ml: 2 }}
                  id="outlined-basic"
                  size="small"
                  type="number"
                  label="Secondary skills"
                  variant="outlined"
                  value={agentPricingTemplateData.skill2}
                  onChange={(e) => {
                    setAgentPricingTemplateData({
                      ...agentPricingTemplateData,
                      skill2: e.target.value,
                    });
                  }}
                />
              </List>
              <List>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox disabled={editStatus} defaultChecked />}
                    label="Is Active"
                    value={agentPricingTemplateData.isActive}
                    onChange={(e) => {
                      setAgentPricingTemplateData({
                        ...agentPricingTemplateData,
                        isActive: e.target.checked,
                      });
                    }}
                  />
                </FormGroup>
              </List>
              {!editStatus?(<List sx={{ mt: 4, mb: 4 }}>
                <Button
                  onClick={() => addAPICalls("agent-pricing-template")}
                  style={{ color: "white", backgroundColor: "brown" }}
                >
                  Save
                </Button>
                <Button
                  style={{
                    backgroundColor: "#f5f0e4",
                    color: "black",
                  }}
                >
                  Exit
                </Button>
              </List>):null}
            </Box>
          </Box>
          </>
        );

      case "candidate-upload-batch-admin":
        return;
      case "category":
        return (
          <>
            <div
              style={{
                width: "100%",
                typography: "body1",
                marginLeft: "70px",
              }}
            >
              <List style={{ marginBottom: "10px" }}>
                <TextField
                  required
                  id="filled-basic"
                  // key={categoryData}
                  label="Title"
                  name="title"
                  value={categoryData.title}
                  type="name"
                  variant="filled"
                  style={{ width: "130ch" }}
                  onChange={(e) => {
                    setCategoryData({ ...categoryData, title: e.target.value });
                    console.log(categoryData);
                  }}
                />
              </List>
              <List sx={{ mb: 5 }}>
                <TextField
                  id="filled-basic"
                  label="Description"
                  type={"name"}
                  variant="filled"
                  value={
                    categoryData.description ? categoryData.description : " "
                  }
                  onChange={(e) => {
                    setCategoryData({
                      ...categoryData,
                      description: e.target.value,
                    });
                  }}
                  style={{ width: "130ch" }}
                />
              </List>
              <List>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        value={categoryData.isActive}
                        onChange={() => {
                          setCategoryData((prev) => ({
                            ...prev,
                            isActive: !categoryData.isActive,
                          }));
                        }}
                      />
                    }
                    label="Is Active"
                  />
                </FormGroup>
              </List>
              <List>
                {editStatus === false ? (
                  <Button
                    onClick={() => {
                      addAPICalls("category");
                    }}
                    style={{ backgroundColor: "brown", color: "white" }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      updateAPICalls("category");
                    }}
                    style={{ backgroundColor: "brown", color: "white" }}
                  >
                    update
                  </Button>
                )}
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
                  onChange={(e) => {
                    setCompanyData({
                      ...companyData,
                      companyName: e.target.value,
                    });
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
                  onChange={(e) => {
                    setCompanyData({
                      ...companyData,
                      description: e.target.value,
                    });
                  }}
                  variant="filled"
                  sx={{ width: "130ch" }}
                />
              </List>
              <List sx={{ mb: 5 }}>
                <TextField
                  id="filled-basic"
                  label="Industry Name"
                  type="name"
                  value={companyData.industry}
                  onChange={(e) => {
                    setCompanyData({
                      ...companyData,
                      industry: e.target.value,
                    });
                  }}
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
                    onChange={(e) => {
                      setCompanyData({
                        ...companyData,
                        isActive: e.target.value,
                      });
                    }}
                  />
                </FormGroup>
              </List>
              <List>
                {editStatus === false ? (
                  <Button
                    onClick={() => {
                      addAPICalls("company");
                    }}
                    style={{
                      backgroundColor: "brown",
                      color: "white",
                      marginTop: "12px",
                    }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      updateAPICalls("company");
                    }}
                    style={{
                      backgroundColor: "brown",
                      color: "white",
                      marginTop: "12px",
                    }}
                  >
                    Update
                  </Button>
                )}
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
                  onChange={(e) => {
                    setIndustryData({
                      ...industryData,
                      title: e.target.value,
                    });
                  }}
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
                  onChange={(e) => {
                    setIndustryData({
                      ...industryData,
                      description: e.target.value,
                    });
                  }}
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
                    onChange={(e) => {
                      setIndustryData({
                        ...industryData,
                        isActive: e.target.checked,
                      });
                    }}
                  />
                </FormGroup>
              </List>
              <List>
                {!editStatus ? (
                  <Button
                    onClick={() => addAPICalls("industry")}
                    style={{ backgroundColor: "brown", color: "white" }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => updateAPICalls("industry")}
                    style={{ backgroundColor: "brown", color: "white" }}
                  >
                    update
                  </Button>
                )}
              </List>
            </Box>
          </>
        );

      case "role":
        return (
          <>
            <Box sx={{ width: "100%", typography: "body1", ml: 17 }}>
              <List sx={{ mb: 5 }}>
                <TextField
                  required
                  id="filled-basic"
                  label="Title"
                  type="name"
                  variant="filled"
                  value={roleData.name}
                  onChange={(e) => {
                    setRoleData({ ...roleData, name: e.target.value });
                  }}
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
                  onChange={(e) => {
                    setRoleData({
                      ...roleData,
                      description: e.target.value,
                    });
                  }}
                  sx={{ width: "130ch" }}
                />
              </List>
              <List>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        value={roleData.isActive}
                        onChange={() => {
                          setRoleData((prev) => ({
                            ...prev,
                            isActive: !roleData.isActive,
                          }));
                        }}
                      />
                    }
                    label="Is Active"
                  />
                </FormGroup>
              </List>
              <List>
                <b>Permissions Section</b>
                {Object.keys(permissions).map((item,index) => (
                  <>
                    <List >
                      <p style={{ color: "brown" }}>
                        {permissions[item].group}
                      </p>
                    <FormGroup style={{ display: "flex", flexDirection: "row" }}>
                      <FormControlLabel
                        control={<Checkbox checked={uroleData.permissions[index]?true:false}
                          value={roleData.permissionId}
                          onChange={(e)=>{
                            if (e.target.checked) {
                              // console.log("permissions[item].id",permissions[item].id)
                              checkedp.push(permissions[item].id)
                              setRoleData({...roleData, permissionId: checkedp});
                            } else {
                              roleData.permissionId.splice(checkedp.indexOf(e.target.value), 1);
                            }
                            // console.log(roleData);
                          }
                          }/>}
                        label={permissions[item].displayName}
						          />
                    </FormGroup>
				            </List>
                  </>
                ))}
                {/* <p style={{ color: "brown" }}>Admin-Candidate Upload Batch</p>
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
										</FormGroup> */}
              </List>
              <List>
                {!editStatus?(<Button
                  onClick={() => addAPICalls("role")}
                  style={{ backgroundColor: "brown", color: "white" }}
                >
                  Save
                </Button>):
                (<Button
                  onClick={() => updateAPICalls("role")}
                  style={{ backgroundColor: "brown", color: "white" }}
                >
                  Update
                </Button>)}
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
            </Box>
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
                  value={skillSetData.title}
                  onChange={(e) => {
                    setSkillSetData({ ...skillSetData, title: e.target.value });
                  }}
                  sx={{ width: "130ch" }}
                />
              </List>
              <List sx={{ mb: 5 }}>
                <TextField
                  id="filled-basic"
                  label="Description"
                  type="name"
                  value={skillSetData.description}
                  onChange={(e) => {
                    setSkillSetData({
                      ...skillSetData,
                      description: e.target.value,
                    });
                  }}
                  variant="filled"
                  sx={{ width: "130ch" }}
                />
              </List>
              <List>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Is Active"
                    value={skillSetData.isActive}
                    onChange={(e) => {
                      setSkillSetData({
                        ...skillSetData,
                        isActive: e.target.checked,
                      });
                    }}
                  />
                </FormGroup>
              </List>
              <List>
                {!editStatus ? (
                  <Button
                    onClick={() => addAPICalls("skillset")}
                    style={{ backgroundColor: "brown", color: "white" }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      updateAPICalls("skillset");
                    }}
                    style={{ backgroundColor: "brown", color: "white" }}
                  >
                    update
                  </Button>
                )}
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
                    disabled={editStatus}
                    value={subscriptionData.planName}
                    onChange={(e) => {
                      setSubscriptionData({
                        ...subscriptionData,
                        planName: e.target.value,
                      });
                    }}
                    sx={{ width: "80ch" }}
                  />
                </List>
                <List sx={{ mt: 4, mb: 4 }}>
                  <TextField
                    id="filled-basic"
                    label="Data Count"
                    variant="filled"
                    disabled={editStatus}
                    value={subscriptionData.dataCount}
                    onChange={(e) => {
                      setSubscriptionData({
                        ...subscriptionData,
                        dataCount: e.target.value,
                      });
                    }}
                    sx={{ width: "40ch" }}
                  />
                  <TextField
                    id="filled-basic"
                    label="Duration in months"
                    variant="filled"
                    disabled={editStatus}
                    value={subscriptionData.durationMonths}
                    onChange={(e) => {
                      setSubscriptionData({
                        ...subscriptionData,
                        durationMonths: e.target.value,
                      });
                    }}
                    sx={{ width: "40ch", ml: 3 }}
                  />
                  <TextField
                    id="filled-basic"
                    label="Price"
                    disabled={editStatus}
                    value={subscriptionData.price}
                    onChange={(e) => {
                      setSubscriptionData({
                        ...subscriptionData,
                        price: e.target.value,
                      });
                    }}
                    variant="filled"
                    sx={{ width: "40ch", ml: 3 }}
                  />
                </List>
                <List>
                  <TextField
                    id="filled-basic"
                    label="Note"
                    value={subscriptionData.note}
                    onChange={(e) => {
                      setSubscriptionData({
                        ...subscriptionData,
                        note: e.target.value,
                      });
                    }}
                    variant="filled"
                    sx={{ width: "126ch", mb: 4 }}
                  />
                </List>
                <List>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Is Active"
                      value={subscriptionData.isActive}
                      onChange={(e) => {
                        setSubscriptionData({
                          ...subscriptionData,
                          isActive: e.target.checked,
                        });
                      }}
                    />
                  </FormGroup>
                </List>
                <List>
                  {!editStatus ? (
                    <Button
                      onClick={() => addAPICalls("subscription")}
                      style={{ color: "white", backgroundColor: "brown" }}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() => updateAPICalls("subscription")}
                      style={{ color: "white", backgroundColor: "brown" }}
                    >
                      Update
                    </Button>
                  )}
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
                  value={
                    !editStatus ? userData.fullName : updateUserData.fullName
                  }
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, fullName: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          fullName: e.target.value,
                        });
                  }}
                  sx={{ width: "40ch" }}
                />
                <TextField
                  type="date"
                  id="filled-basic"
                  label="Birthdate"
                  value={!editStatus ? userData.dob : updateUserData.dob}
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, dob: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          dob: e.target.value,
                        });
                  }}
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "40ch", ml: 3 }}
                />
                <TextField
                  select
                  id="filled-basic"
                  label="Gender"
                  value={!editStatus ? userData.gender : updateUserData.gender}
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, gender: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          gender: e.target.value,
                        });
                  }}
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
                  value={!editStatus ? userData.email : updateUserData.email}
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, email: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          email: e.target.value,
                        });
                  }}
                  sx={{ width: "40ch" }}
                />
                <TextField
                  required
                  id="filled-basic"
                  label="Contact no"
                  value={
                    !editStatus ? userData.contactNo : updateUserData.contactNo
                  }
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, contactNo: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          contactNo: e.target.value,
                        });
                  }}
                  variant="filled"
                  sx={{ width: "40ch", ml: 3 }}
                />
                <TextField
                  required
                  select
                  id="filled-basic"
                  label="Role"
                  value={!editStatus ? userData.roleId : updateUserData.roleId}
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, roleId: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          roleId: e.target.value,
                        });
                  }}
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
                  value={
                    !editStatus
                      ? userData.currAddress
                      : updateUserData.currAddress
                  }
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({
                          ...userData,
                          currAddress: e.target.value,
                        })
                      : setUpdateUserData({
                          ...updateUserData,
                          currAddress: e.target.value,
                        });
                  }}
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
                  value={
                    !editStatus ? userData.currZip : updateUserData.currZip
                  }
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, currZip: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          currZip: e.target.value,
                        });
                  }}
                  sx={{ width: "40ch" }}
                />
                <TextField
                  id="filled-basic"
                  label="Current city"
                  variant="filled"
                  value={
                    !editStatus ? userData.currCity : updateUserData.currCity
                  }
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, currCity: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          currCity: e.target.value,
                        });
                  }}
                  sx={{ width: "40ch", ml: 3 }}
                />
                <TextField
                  select
                  id="filled-basic"
                  label="Current State"
                  value={
                    !editStatus ? userData.currState : updateUserData.currState
                  }
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, currState: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          currState: e.target.value,
                        });
                  }}
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
                    control={<Checkbox />}
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
                  value={
                    !editStatus
                      ? userData.permAddress
                      : updateUserData.permAddress
                  }
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({
                          ...userData,
                          permAddress: e.target.value,
                        })
                      : setUpdateUserData({
                          ...updateUserData,
                          permAddress: e.target.value,
                        });
                  }}
                  multiline
                  rows={4}
                  sx={{ width: "100ch" }}
                />
              </List>
              <List>
                <TextField
                  id="filled-basic"
                  label="Permanent pincode"
                  value={
                    !editStatus ? userData.permZip : updateUserData.permZip
                  }
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, permZip: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          permZip: e.target.value,
                        });
                  }}
                  variant="filled"
                  sx={{ width: "40ch" }}
                />
                <TextField
                  id="filled-basic"
                  label="Permanent city"
                  variant="filled"
                  value={
                    !editStatus ? userData.permCity : updateUserData.permCity
                  }
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, permCity: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          permCity: e.target.value,
                        });
                  }}
                  sx={{ width: "40ch", ml: 3 }}
                />
                <TextField
                  required
                  select
                  id="filled-basic"
                  label="Permanent State"
                  variant="filled"
                  value={!editStatus ? userData.permState : updateUserData}
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, permState: e.target.value })
                      : setUserData({
                          ...updateUserData,
                          permState: e.target.value,
                        });
                  }}
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
                  value={
                    !editStatus ? userData.panCard : updateUserData.panCard
                  }
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, panCard: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          panCard: e.target.value,
                        });
                  }}
                  variant="filled"
                  sx={{ width: "40ch" }}
                />
                <TextField
                  id="filled-basic"
                  label="Aadhar card"
                  variant="filled"
                  value={
                    !editStatus
                      ? userData.aadharCard
                      : updateUserData.aadharCard
                  }
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, aadharCard: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          aadharCard: e.target.value,
                        });
                  }}
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
                  value={
                    !editStatus
                      ? userData.primaryLang
                      : updateUserData.primaryLang
                  }
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({
                          ...userData,
                          primaryLang: e.target.value,
                        })
                      : setUpdateUserData({
                          ...updateUserData,
                          primaryLang: e.target.value,
                        });
                  }}
                  sx={{ width: "40ch" }}
                />
                <TextField
                  id="filled-basic"
                  label="Secondary Language"
                  variant="filled"
                  value={
                    !editStatus
                      ? userData.secondaryLang
                      : updateUserData.secondaryLang
                  }
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({
                          ...userData,
                          secondaryLang: e.target.value,
                        })
                      : setUpdateUserData({
                          ...updateUserData,
                          secondaryLang: e.target.value,
                        });
                  }}
                  sx={{ width: "40ch", ml: 3 }}
                />
                <TextField
                  id="filled-basic"
                  label="Third Language"
                  variant="filled"
                  value={
                    !editStatus ? userData.thirdLang : updateUserData.thirdLang
                  }
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, thirdLang: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          thirdLang: e.target.value,
                        });
                  }}
                  sx={{ width: "40ch", ml: 3 }}
                />
              </List>
              <List sx={{ mb: 4, mt: 4 }}>
                <TextField
                  required
                  id="filled-basic"
                  label="Note"
                  variant="filled"
                  value={!editStatus ? userData.note : updateUserData.note}
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, note: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          note: e.target.value,
                        });
                  }}
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
                    value={
                      !editStatus ? userData.isActive : updateUserData.isActive
                    }
                    onChange={(e) => {
                      !editStatus
                        ? setUserData({ ...userData, isActive: e.target.value })
                        : setUpdateUserData({
                            ...updateUserData,
                            isActive: e.target.value,
                          });
                    }}
                  />
                </FormGroup>
              </List>
              <List sx={{ mb: 4, mt: 4 }}>
                {!editStatus ? (
                  <Button
                    onClick={() => addAPICalls("user")}
                    style={{ backgroundColor: "brown", color: "white" }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => updateAPICalls("user")}
                    style={{ backgroundColor: "brown", color: "white" }}
                  >
                    Update
                  </Button>
                )}
              </List>
            </Box>
          </>
        );
      default:
        break;
    }
  };

  const handleCommonModal = () => {
    const commonModal = (
      <div>
        <Dialog
          fullScreen
          open={openCandidateModal}
          onClose={handleCloseCandidateModal}
        >
          <Backdrop
            sx={{
              color: "#7d1810",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={loader}
          >
            <CircularProgress size={130} thickness={2} color="inherit" />
          </Backdrop>
          <Box sx={{ bgcolor: "brown", color: "white", height: "55px" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseCandidateModal}
              aria-label="close"
            >
              <CloseIcon style={{ marginLeft: "10px", fontSize: "35px" }} />
            </IconButton>
            {!editStatus ? modalTitle : `Edit Record - ${editId}`}
            <Button sx={{ ml: 155, color: "white" }}>Save</Button>
          </Box>
          <DialogContent>{handleModalInput()}</DialogContent>
        </Dialog>
      </div>
    );
    return commonModal;
  };

  const handleTableDesign = () => {
    const handleModalsInputs = (
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
            <Stack spacing={2} sx={{ width: "100%" }}>
              {editStatus === true ? (
                <Snackbar
                  open={openAlertMsg}
                  autoHideDuration={6000}
                  onClose={() => setOpenAlertMsg(false)}
                >
                  <Alert
                    onClose={() => setOpenAlertMsg(false)}
                    severity="success"
                    sx={{ width: "100%", backgroundColor: "#24f05e" }}
                  >
                    Data successfully Updated!
                  </Alert>
                </Snackbar>
              ) : (
                <Snackbar
                  open={openAlertMsg}
                  autoHideDuration={6000}
                  onClose={() => setOpenAlertMsg(false)}
                >
                  <Alert
                    onClose={() => setOpenAlertMsg(false)}
                    severity="success"
                    sx={{ width: "100%", backgroundColor: "#24f05e" }}
                  >
                    Data successfully inserted!
                  </Alert>
                </Snackbar>
              )}
            </Stack>
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

        {/* admin candidate upload batch modal */}
        <Dialog
          fullWidth
          open={openAdminCanUplBtch}
          onClose={handleCloseAdminCanUplBtch}
        >
          <DialogTitle>Admin - Candidate Upload Batch</DialogTitle>

          {!editStatus ? (
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
          ) : (
            <>
              <DialogContent>
                <List>
                  <tr>
                    <td>Batch no:</td>
                    <td>{candidateUploadBatchAdminSelect.id}</td>
                  </tr>
                  <tr>
                    <td>Uploaded by:</td>
                    <td>{candidateUploadBatchAdminSelect.createdBy}</td>
                  </tr>
                  <tr>
                    <td>Uploader role:</td>
                    <td>HO Agent</td>
                  </tr>
                  <tr>
                    <td>Current pricing template:</td>
                    <td>Navnath Test</td>
                  </tr>
                </List>
                <List>
                  <Select
                    onChange={(e) => {
                      setCandidateUploadBatchAdminData({
                        ...candidateUploadBatchAdminData,
                        id: e.target.value,
                      });
                      console.log("tt1", candidateUploadBatchAdminData.id);
                      console.log("all data", candidateUploadBatchAdminData);
                    }}
                    label="New pricing template"
                    value={candidateUploadBatchAdminData.id}
                    required
                    style={{ width: "50ch" }}
                  >
                    {Object.keys(candidateUploadBatchAdminData).map(
                      (item, x) => (
                        <MenuItem
                          key={item}
                          value={candidateUploadBatchAdminData[item].id}
                        >
                          <ListItemText
                            primary={
                              candidateUploadBatchAdminData[item].templateName
                            }
                          />
                        </MenuItem>
                      )
                    )}
                  </Select>
                </List>
                <tr>
                  <p>*indicates required field</p>
                </tr>
              </DialogContent>
            </>
          )}
          <DialogActions>
            <Button onClick={handleCloseAdminCanUplBtch}>Close</Button>
            <Button
              onClick={() => {
                updateAPICalls("candidate-upload-batch-admin");
                handleCloseAdminCanUplBtch();
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* batch priority modal */}
        <Dialog
          fullWidth
          open={openAddBtchprty}
          onClose={handleCloseAddBtchprty}
        >
          {!editStatus ? (
            <List>
              <DialogTitle>Add Batch Priority</DialogTitle>

              <DialogContent>
                <List sx={{ mb: 3 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Batch no
                  </InputLabel>
                  <Select
                    Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    fullWidth
                    value={batchNo.batchId}
                    variant="filled"
                    onChange={(e) => {
                      setBatchNo({
                        ...batchNo,
                        batchId: e.target.value,
                      });
                    }}
                    input={<OutlinedInput label="Tag" />}
                    MenuProps={MenuProps}
                  >
                    {batchPriorityData.map((item) => (
                      <MenuItem key={item} value={item}>
                        <ListItemText primary={item} />
                      </MenuItem>
                    ))}
                  </Select>
                </List>
                <List>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Assigned To
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    // multiple
                    fullWidth
                    value={createBatchPriorityData.id}
                    variant="filled"
                    onChange={(e) => {
                      setCreateBatchPriorityData({
                        ...createBatchPriorityData,
                        id: e.target.value,
                      });
                    }}
                    input={<OutlinedInput label="Tag" />}
                    // renderValue={(selected) => selected.join(", ")}
                    // MenuProps={MenuProps}
                  >
                    {Object.keys(createBatchPriorityData).map((item, i) => (
                      <MenuItem
                        key={
                          createBatchPriorityData[item].fullName +
                          " - " +
                          createBatchPriorityData[item].role
                        }
                        value={
                          createBatchPriorityData[item].fullName +
                          " - " +
                          createBatchPriorityData[item].role
                        }
                      >
                        <CheckBox />
                        <ListItemText
                          primary={
                            createBatchPriorityData[item].fullName +
                            " - " +
                            createBatchPriorityData[item].role
                          }
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </List>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAddBtchprty}>Close</Button>
                <Button
                  onClick={() => {
                    addAPICalls("batch-priority");
                  }}
                >
                  Save
                </Button>
              </DialogActions>
            </List>
          ) : (
            <List>
              <DialogTitle>Update Batch Priority</DialogTitle>

              <DialogContent>
                <List sx={{ mb: 3 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Batch no
                  </InputLabel>
                  <Select
                    Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    fullWidth
                    value={batchNo.batchId}
                    variant="filled"
                    onChange={(e) => {
                      setBatchNo({
                        ...batchNo,
                        batchId: e.target.value,
                      });
                    }}
                    input={<OutlinedInput label="Tag" />}
                    MenuProps={MenuProps}
                  >
                    {batchPriorityData.map((item) => (
                      <MenuItem key={item} value={item}>
                        <ListItemText primary={item} />
                      </MenuItem>
                    ))}
                  </Select>
                </List>
                <List>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Assigned To
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    // multiple
                    fullWidth
                    value={createBatchPriorityData.id}
                    variant="filled"
                    onChange={(e) => {
                      setCreateBatchPriorityData({
                        ...createBatchPriorityData,
                        id: e.target.value,
                      });
                    }}
                    input={<OutlinedInput label="Tag" />}
                    // renderValue={(selected) => selected.join(", ")}
                    // MenuProps={MenuProps}
                  >
                    {Object.keys(createBatchPriorityData).map((item, i) => (
                      <MenuItem
                        key={
                          createBatchPriorityData[item].fullName +
                          " - " +
                          createBatchPriorityData[item].role
                        }
                        value={
                          createBatchPriorityData[item].fullName +
                          " - " +
                          createBatchPriorityData[item].role
                        }
                      >
                        <CheckBox />
                        <ListItemText
                          primary={
                            createBatchPriorityData[item].fullName +
                            " - " +
                            createBatchPriorityData[item].role
                          }
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </List>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAddBtchprty}>Close</Button>
                <Button
                  onClick={() => {
                    addAPICalls("batch-priority");
                  }}
                >
                  Update
                </Button>
              </DialogActions>
            </List>
          )}
        </Dialog>
      </Toolbar>
    );
    return handleModalsInputs;
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
    // useStyles,
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
    Transition,
    getComparator,
    descendingComparator,
    handleChangeRowsPerPage,
    handleChangePage,
    handleRequestSort,
    handleClick,
    handleChangeDense,
    isSelected,
    handleCommonModal,

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
    tblDataCount,
    loader,
    handleCloseLoader,
    setEditId,
    editId,
    setEditStatus,
    setCategoryData,
    setCompanyData,
    setIndustryData,
    setSkillSetData,
    setSubscriptionData,
    setUserData,
    setRoleData,
    setCandidateMasterData,
    handleClickOpen,
    getCandidateVerificationById,
    getAgentPricingTemplateById,
    setAgentMasterData,
    setCandidateUploadBatchAdminData,
    setCandidateUploadBatchAdminSelect,
    openModal,
    handleClose,
    Transition,
    IconButton,
    editStatus,
    modalTitle,
    DialogContent,
    Dialog,
    CloseIcon,
    handleTableDesign,
    handleOpenCandidateModal,
  };

  return StateContainer;
};

export default ContentLogic;
