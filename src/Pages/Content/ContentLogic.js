import {
  forwardRef,
  React,
  useCallback,
  useState,
  Fragment,
  useRef,
  useEffect,
} from "react";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Outlet } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { styled } from "@mui/material/styles";
import * as XLSX from "xlsx/xlsx.mjs";
import { read, utils } from "xlsx";
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
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tabs,
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
import {
  CheckBox,
  Close,
  CropSquareSharp,
  Edit,
  Info,
  PriorityHigh,
  Search,
  ToggleOn,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ProfessionalTab from "../../Container/Drawer/Agent Master/Professional Tab/ProfessionalTab";
import { Link } from "react-router-dom";
import Help from "../../Container/Drawer/Help/Help";
import handler from "../../handlers/generalHandlers";
import { Stack } from "@mui/system";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FileUpload from "react-mui-fileuploader";
import axios from "axios";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

// Redux method imports
import AuditLog from "../../reusable/AuditLog/AuditLog";
import { useDispatch, useSelector } from "react-redux";
import { auditLogDetails } from "../../store/AuditLog/action";
import helpers from "../../helpers";
import handlers from "../../handlers";
import LoginHistoryDesign from "../LoginHistory/LoginHistoryDesign";

const ContentLogic = (props) => {
  //Common States
  const dispatch = useDispatch();
  const auditLogData = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [pageTitle, setPageTitle] = useState();
  const [buttonText, setButtonText] = useState();
  const [modalTitle, setModalTitle] = useState();
  const [numSelected] = useState([]);

  //Table Data for Every Module
  const [tblData, setTblData] = useState([]);
  const [tblDataCount, setTblDataCount] = useState([]);

  //To Get The Data As Per Rows on page
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //Unused states
  const [id, setId] = useState("");
  const [openModal, setOpenModal] = useState(false);

  //State for common modal of the all modules
  const [openCandidateModal, setOpenCandidateModal] = useState(false);

  //State for alert msg and err msg
  const [openAlertMsg, setOpenAlertMsg] = useState(false);
  const [openErrMsg, setOpenErrtMsg] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  //state for agent pricing template module
  const [filterForAgentPT, setFilterForAgentPT] = useState();

  //state for candidate upload batch module
  const [bulkUpload, setBulkUpload] = useState([]);
  const [uploadBulkCnd, setUploadBulkCnd] = useState();

  // state for the admin candidate upload batch module
  const [confirmationData, setConfirmationData] = useState([]);
  const [bulkData, setBulkData] = useState([]);
  const [uploadBulkData, setUploadBulkData] = useState();
  const [openApproval, setOpenApproval] = useState(true);
  const [openAdminCanUplBtch, setOpenAdminCanUplBtch] = useState(false);
  const [tabOfCndBatchValue, setTabOfCndBatchValue] = useState("1");
  const [filterTableOnTabs, setFilterTableOnTabs] = useState("in-progress");
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
    useState({});
  const [candidateUploadBatchAdminDataAudit, setCandidateUploadBatchAdminDataAudit] =
    useState({
      id:0,
      templateName:''
    });
  const [cndUpdBatchAdmin, setCndUpdBatchAdmin] = useState({
    id: 0,
    templateName: "",
  });

  // state for store the input fields value of candidate master

  //This state used to handle work experience and certificate modal
  const [openChildModal, setOpenChilModal] = useState(false);
  const [openChildModalCerti, setOpenChilModalCerti] = useState(false);
  //This is Used to go to the next page
  const [skipped, setSkipped] = useState(new Set());
  //State for the handle tab of candidate master module
  const [activeStep, setActiveStep] = useState(0);
  const [candidateMasterData, setCandidateMasterData] = useState({
    aadharNo: "",
    // gender: "MALE",
    dob: null,
    permAddress: "",
    contactNo1: "",
    contactNo2: "",
    curr_address: "",
    curr_city: "",
    curr_country: "India",
    curr_state: "",
    curr_zip: "",
    email1: "",
    email2: "",
    fullName: "",
    gender: "",
    perm_address: "",
    perm_city: "",
    perm_country: "India",
    perm_state: "",
    perm_zip: "",
    registrationStatus: "",
    totalExpMonths: "",
    totalExpYears: "",
    // birthDate:new Date(),
    isActive: true,
    industry: "",
    category: "",
    expYears: "",
    prefLocation1: "",
    prefLocation2: "",
    skill1: "",
    skill2: "",
    primaryLang: "",
    secondaryLang: "",
    lastCompany: "",
    designation: "",
    education: "",
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
  //audit log state
  const [updateCandidateMasterDataAudit, setUpdateCandidateMasterDataAudit] = useState({
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

  const [image, setImage] = useState();

  //Filter record based on the page fields
  const [filterData, setFilterData] = useState({
    fullName: "",
    contact: "",
    id: 0,
    isActive: true,
  });

  //States for the candidate varification modules
  const [cndVrfnTabValue, setCndVrfnTabValue] = useState("1");

  const [candidateVerificationData, setCandidateVerificationData] = useState(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [candidateConsentVal, setCandidateConsentVal] = useState("");
  const [candidateCallStatusVal, setCandidateCallStatusVal] = useState("");
  const [callCenter, setCallCenter] = useState({
    id: 0,
    callStatus: "",
    candidateConsent: candidateConsentVal,
  });
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
      industries: [
        {
          id: 3,
          title: "",
        },
        {
          id: 5,
          title: "",
        },
      ],
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

      categories: [
        {
          id: 0,
          title: "",
        },
      ],
      CandidateCategory: [
        {
          categoryId: 0,
          id: 0,
          title: "",
        },
      ],
      CandidateIndustry: [
        {
          title: "",
          industryId: 0,
          id: 0,
        },
      ],
      CandidateWorkHistory: [
        {
          industryId: 0,
          id: 0,
          company: "",
          industryTitle: "",
          categoryId: 0,
          categoryTitle: "",
          endDate: "",
          startDate: "",
          isEmployed: false,
          description: "",
        },
      ],
      callCentre: {
        id: 0,
        callStatus: "",
        candidateConsent: "",
      },
    });
    const [updateCandidateVerificationDataAuditLog, setUpdateCandidateVerificationDataAuditLog] =
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
      industries: [
        {
          id: 3,
          title: "",
        },
        {
          id: 5,
          title: "",
        },
      ],
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

      categories: [
        {
          id: 0,
          title: "",
        },
      ],
      CandidateCategory: [
        {
          categoryId: 0,
          id: 0,
          title: "",
        },
      ],
      CandidateIndustry: [
        {
          title: "",
          industryId: 0,
          id: 0,
        },
      ],
      CandidateWorkHistory: [
        {
          industryId: 0,
          id: 0,
          company: "",
          industryTitle: "",
          categoryId: 0,
          categoryTitle: "",
          endDate: "",
          startDate: "",
          isEmployed: false,
          description: "",
        },
      ],
      callCentre: {
        id: 0,
        callStatus: "",
        candidateConsent: "",
      },
    });
  const [filterForCndVerifiction, setFilterForCndVerifiction] = useState();

  //states for the agent master module
  const [cmpyvalue, setCmpyValue] = useState("");
  const [tabValue, setTabValue] = useState("1");
  const [sameAddressAgent, setSameAddressAgent] = useState(false);
  const [agentMasterData, setAgentMasterData] = useState({
    fullName: "",
    dob: "",
    gender: "MALE",
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
  const [agentMasterDataAudit, setAgentMasterDataAudit] = useState({
    fullName: "",
    dob: "",
    gender: "MALE",
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
    totalAmount: 0,
    modifiedOn: "",
    CreatedBy: "",
    ModifiedBy: "",
    createdOn: "",
  });
  const [agentMasterPan, setAgentMasterPan] = useState();
  const [agentMasterPOI, setAgentMasterPOI] = useState();
  const [agentMasterPOA, setAgentMasterPOA] = useState();
  const [agentMasterBankDoc, setAgentMasterBankDoc] = useState();

  // states for the batch priority module
  const [batchPriorityData, setBatchPriorityData] = useState([]);
  const [createBatchPriorityData, setCreateBatchPriorityData] = useState({
    id: 1,
  });
  const [updateBatchPriority, setUpdateBatchPriority] = useState([]);
  const [batchPriorityAssingend, setBatchPriorityAssingend] = useState([]);
  const [batchPriority, setBatchPriority] = useState([]);
  const [batchPriorityId, setBatchPriorityId] = useState("87");

  // State for page name when user route from one module to another
  const [pageName, setPageName] = useState();

  //State for set the table heading based on the route
  const [tblHeader, setTblHeader] = useState([]);

  //State for loader
  const [loader, setLoader] = useState(false);

  //State for the store the id and handle the status is updating or adding new record
  const [editId, setEditId] = useState();
  const [editStatus, setEditStatus] = useState(false);

  //State used for to set the same address 
  const [sameAddress, setSameAddress] = useState(false);

  //Used to select multiple value from select field for batch priority module
  const [batchNo, setBatchNo] = useState({
    batchId: 0,
    assignedTo: [createBatchPriorityData.id],
  });
  const [openAddBtchprty, setOpenAddBtchprty] = useState(false);

  // state for open confirmation modal of admin candidate upload batch module
  const [openConfirmation, setOpenConfirmation] = useState(false);

  //state for store the input fields value of category
  const [categoryData, setCategoryData] = useState({
    title: "",
    description: "",
    isActive: false,
    CreatedBy: "",
    ModifiedBy: "",
    createdBy: 0,
    createdOn: "",
    modifiedBy: 0,
    modifiedOn: "",
  });
  //state for handle audit 
  const [categoryDataAudit, setCategoryDataAudit] = useState({
    title: "",
    description: "",
    isActive: false,
    CreatedBy: "",
    ModifiedBy: "",
    createdBy: 0,
    createdOn: "",
    modifiedBy: 0,
    modifiedOn: "",
  });

  //state for store the input fields value of company
  const [companyData, setCompanyData] = useState({
    companyName: " ",
    description: "",
    isActive: true,
    industryId: 0,
    title: "",
  });
  //state for audit log while updating
  const [companyDataAudit, setCompanyDataAudit] = useState({
    companyName: " ",
    description: "",
    isActive: true,
    industryId: 0,
    title: "",
  });
  const [filterDataForCompany, setFilterDataForCompany] = useState([]);

  //state for store the input fields value of customer
  const [customerData, setCustomerData] = useState({
    fullName:'',
    companyName: " ",
    dob:null,
    gender:'',
    state:'',
    country:'INDIA',
    profileImage:'',
    isActive: true,
  });
  const [filterDataForCustomer, setFilterDataForCustomer] = useState([]);

  //state for store the input fields value of industry
  const [industryData, setIndustryData] = useState(
    {
      title: "",
      description: "",
      isActive: true,
      id: 0,
    },
  );
  const [industryDataAudit, setIndustryDataAudit] = useState(
    {
      title: "",
      description: "",
      isActive: true,
      id: 0,
    },
  );
  const [filterDataForIndustry, setFilterDataForIndustry] = useState([]);
  const [checkedp, setCheckedP] = useState([]);

  //state for store the input fields value of role
  const [permissions, setPermissions] = useState([]);
  const [roleData, setRoleData] = useState({
    name: "",
    description: "",
    isActive: true,
    id: 0,
    permissionId: [],
  });
  const [filterDataForRole, setFilterDataForRole] = useState([]);
  const [uroleData, setURoleData] = useState({
    permissions: [],
  });
  const [roleForUser, setRoleForUSer] = useState({
    id: 0,
    name: "",
  });

  //state for store the input fields value of skillset
  const [filterDataForSkillSets, setFilterDataForSkillSets] = useState([]);
  const [skillSetData, setSkillSetData] = useState({
    title: "",
    description: "",
    isActive: true,
  });
  const [skillSetDataForAuditLog, setSkillSetDataForAuditLog] = useState({
    title: "",
    description: "",
    isActive: true,
  });

  //state for store the input fields value of subscriptions
  const [subscriptionData, setSubscriptionData] = useState({
    planName: "",
    dataCount: 1,
    durationMonths: 12,
    price: 1999,
    note: "",
    isActive: true,
  });
  // For Audit Log 
  const [subscriptionDataForAudit, setSubscriptionDataForAudit] = useState({
    planName: "",
    dataCount: 1,
    durationMonths: 12,
    price: 1999,
    note: "",
    isActive: true,
  });
  const [filterDataForSubscription, setFilterDataForSubscription] = useState(
    []
  );

  //state for store the input fields value of user
  const [industryForCompany, setIndustryForCompany] = useState({
    id: 0,
    title: "",
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
  const [updateUserDataForAudit, setUpdateUserDataForAudit] = useState({
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
  const [filterDataForUser, setFilterDataForUser] = useState([]);

  // States for the other category module
  const [categoryFields, setCategoryFields] = useState("");
  const [otherIndustryC, setOtherIndustryC] = useState({
    candidateId: 20947,
    description: "",
    id: 20,
    itemIdtoUpdate: 17601,
    mode: '',
    text: "",
    type: "INDUSTRY",
  });
  const [filterDataForCategory, setFilterDataForCategory] = useState([]);
 
  const [otherIndCategory, setOtherIndCategory] = useState([]);
  const [otherIndCategoryResult, setOtherIndCategoryResult] = useState([]);
  const [otherIndCategoryStats, setOtherIndCategoryStats] = useState([]);
  const [otherIndCategoryPassive, setOtherIndCategoryPassive] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [openOtherIndCategory, setOpenOtherIndCategory] = useState(false);

  //State for the Work experience and training/certificate table in candidate master module
  const [candidateId, setCandidateId] = useState("");
  const [workExperianceData, setWorkExperianceData] = useState({
    companyId: 5,
    description: "",
    endDate: moment("").date(),
    skillId: [2, 3, 4],
    startDate: moment("").date(),
  });
  const [trainingCert, setTrainCert] = useState(false);
  const [trainingCertData, setTrainingCertData] = useState({
    candidateId: !editStatus ? candidateId : editId,
    title: "",
    type: "",
    description: "",
    issuedBy: "",
    issueDate: moment("").date(),
    skillId: 189,
  });
  const [expData, setExptData] = useState([]);
  const [trainCertData, setTrainCertData] = useState([]);

  //State for the Certificate/training table in candidate master module
  const [certificateData, setCertificateData] = useState({
    title: "",
    description: "",
    issueDate: null,
    issuedBy: "",
    skillId: "",
    type: "",
  });
  const [candidateVerDashboard, setCandidateVerDashboard] = useState([]);

  // States for the add multiple industry when we click on add more button in candidate verification module
  const [inputFields, setInputFields] = useState([
    {
      industries: "",
    },
  ]);
  const [inputCategories, setInputCategories] = useState([
    {
      categories: "",
    },
  ]);
  const [inputEmployement, setInputEmployement] = useState([
    {
      cEmp: "",
    },
  ]);

  //To handle the other industry category example modal
  const handleCloseOtherIndCategory = () => {
    setOpenOtherIndCategory(false);
  };
  const handleOpenOtherIndCategory = () => {
    setOpenOtherIndCategory(true);
  };

  //Add and remove multiple industries when click on add more btn
  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        industries: "",
      },
    ]);
  };
  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };
  const handleChangeField = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };

  //Add and remove multiple categories when click on add more btn
  const addInputFieldForCategory = () => {
    setInputCategories([
      ...inputCategories,
      {
        industries: "",
      },
    ]);
  };
  const removeInputFieldsForCategory = (index) => {
    const rows = [...inputCategories];
    rows.splice(index, 1);
    setInputCategories(rows);
  };
  const handleChangeFieldForCategory = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputCategories];
    list[index][name] = value;
    setInputCategories(list);
  };

  //Add and remove multiple employment details when click on add more btn
  const addInputFieldForEmployer = () => {
    setInputEmployement([
      ...inputEmployement,
      {
        cEmp: "",
      },
    ]);
  };
  const removeInputFieldsForEmployer = (index) => {
    const rows = [...inputEmployement];
    rows.splice(index, 1);
    setInputEmployement(rows);
  };
  const handleChangeFieldForEmployer = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputEmployement];
    list[index][name] = value;
    setInputEmployement(list);
  };

  //Unused
  const inputCurrEmployed = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];
  const [arrCurrEmployed, setArrCurrentEmployed] = useState(inputCurrEmployed);
  const addInputCurrEmployed = () => {
    setArrCurrentEmployed((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };
  const handleChangeCurrEmployed = (e) => {
    e.preventDefault();
    const index = e.target.id;
    setArrCurrentEmployed((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;
      return newArr;
    });
  };
  const inputArrCategory = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];
  const [arrCategory, setArrCategory] = useState(inputArrCategory);
  const addInputCategory = () => {
    setArrCategory((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };
  const handleChangeCategory = (e) => {
    e.preventDefault();
    const index = e.target.id;
    setArrCategory((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;
      return newArr;
    });
  };

  //Handle Common Modal and edit status
  const handleCloseCandidateModal = () => {
    setOpenCandidateModal(false);
    setEditStatus(false);
  };
  const handleOpenCandidateModal = () => {
    setOpenCandidateModal(true);
  };

  //Used to Exapand info about batch priority 
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //Open and Close Common Modal Effect
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const rows = [];

  //Used to Filter records based on descending
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

  //Handle to disable the Loader
  const handleCloseLoader = () => {
    setLoader(false);
  };

  //form validations for each module
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchemaForCandidateMaster = Yup.object().shape({
    fullname: Yup.string().required("Full Name is required"),
    mobileNo: Yup.string()
      .required("Contact number is not valid")
      .min(10, "Contact number is not valid"),
    aadharNo: Yup.string()
      .required("Aadhar number is required")
      .min(12, "Aadhar number is not valid"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    // photo: Yup.mixed()
    // .test("required", "photo is required", value => value.length > 0)
    // .test("fileSize", "File Size is too large", (value) =>
    // {
    //   console.log("value",value);
    //   return value.length && value[0].size <= 1024;
    // })
    // .test("fileType", "Unsupported File Format", (value) =>{
    //   return value.length && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
    // }
    // )
  });
  const validationForWorkExp = Yup.object().shape({
    companyId: Yup.string().required("Company Name is required"),
    skillId: Yup.string().required("Skills are required"),
    startDate: Yup.date()
      .default(() => new Date())
      .required("Start date is required"),
    endDate: Yup.date().when(
      "startDate",
      (startDate, schema) => startDate && schema.min(startDate)
    ),
  });
  const validationForCertificate = Yup.object().shape({
    certificateName: Yup.string().required("Certificate Name is required"),
    issuedBy: Yup.string().required("Issued by is required"),
  });
  const validationCandidateVfn = Yup.object().shape({
    candidateConsent: Yup.string().required("Candidate conset is required"),
    callStat: Yup.string().required("Call Status is required"),
  });
  const validationAgentMstr = Yup.object().shape({
    agentNo: Yup.string().required("Agent no is required"),
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter correct email address"),
    mobileNo: Yup.string()
      .required("Contact number is not valid")
      .min(10, "Contact number is not valid"),
    currAddress: Yup.string().required("Current address is required"),
    currPin: Yup.string().required("Current pincode is required"),
    currCity: Yup.string().required("Current city is required"),
    currState: Yup.string().required("Current state is required"),
  });
  const validationAgentTmpt = Yup.object().shape({
    agentTitle: Yup.string().required("Template name is required"),
  });
  const validationBatchPty = Yup.object().shape({
    batchNum: Yup.string().required("Batch no is required"),
    assignedTo: Yup.string().required("Assigned to is required"),
  });
  const validationCategory = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });
  const validationCompany = Yup.object().shape({
    title: Yup.string().required("Company Name is required"),
  });
  const validationIndustry = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });
  const validationRole = Yup.object().shape({
    rName: Yup.string().required("Name is required"),
  });
  const validationSkillset = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });
  const validationSubscription = Yup.object().shape({
    title: Yup.string().required("Plan name is required"),
  });
  const validationUsers = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter correct email address"),
    mobileNo: Yup.string()
      .required("Contact number is not valid")
      .min(10, "Contact number is not valid"),
    role: Yup.string().required("Role is required"),
    currAddress: Yup.string().required("Current Address is required"),
    currPin: Yup.string().required("Current pincode is required"),
    currCity: Yup.string().required("Current city is required"),
    currState: Yup.string().required("Current state is required"),
  });

  //Form validation required method
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaForCandidateMaster),
  });
  const {
    register: register2,
    handleSubmit: handleSubmitReset,
    formState: { errors: errors2 },
  } = useForm({
    resolver: yupResolver(validationForWorkExp),
  });
  const {
    register: register3,
    handleSubmit: handleSubmitCert,
    formState: { errors: errors3 },
  } = useForm({
    resolver: yupResolver(validationForCertificate),
  });
  const {
    register: register4,
    handleSubmit: handleSubmitCndVfn,
    formState: { errors: errors4 },
  } = useForm({
    resolver: yupResolver(validationCandidateVfn),
  });
  const {
    register: register5,
    handleSubmit: handleSubmitAgentMstr,
    formState: { errors: errors5 },
  } = useForm({
    resolver: yupResolver(validationAgentMstr),
  });
  const {
    register: register6,
    handleSubmit: handleSubmitAgentTmpt,
    formState: { errors: errors6 },
  } = useForm({
    resolver: yupResolver(validationAgentTmpt),
  });
  const {
    register: register7,
    handleSubmit: handleSubmitBatchPrty,
    formState: { errors: errors7 },
  } = useForm({
    resolver: yupResolver(validationBatchPty),
  });
  const {
    register: register8,
    handleSubmit: handleSubmitCategory,
    formState: { errors: errors8 },
  } = useForm({
    resolver: yupResolver(validationCategory),
  });
  const {
    register: register9,
    handleSubmit: handleSubmitCompany,
    formState: { errors: errors9 },
  } = useForm({
    resolver: yupResolver(validationCompany),
  });
  const {
    register: register10,
    handleSubmit: handleSubmitIndustry,
    formState: { errors: errors10 },
  } = useForm({
    resolver: yupResolver(validationIndustry),
  });
  const {
    register: register11,
    handleSubmit: handleSubmitRole,
    formState: { errors: errors11 },
  } = useForm({
    resolver: yupResolver(validationRole),
  });
  const {
    register: register12,
    handleSubmit: handleSubmitSkill,
    formState: { errors: errors12 },
  } = useForm({
    resolver: yupResolver(validationSkillset),
  });
  const {
    register: register13,
    handleSubmit: handleSubmitSubscritpion,
    formState: { errors: errors13 },
  } = useForm({
    resolver: yupResolver(validationSubscription),
  });
  const {
    register: registerUser,
    handleSubmit: handleSubmitUsers,
    formState: { errors: errorsUsers },
  } = useForm({
    resolver: yupResolver(validationUsers),
  });

  //Call Methods With the Validation
  const onSubmit = async (data) => {
    addAPICalls("candidate-master");
    // setTimeout(() => {
    //   addProfileImg()
    // }, 10000);
  };
  const onSubmitExp = (data) => {
    addWorkExperienceAPICall();
  };
  const onSubmitCert = (data) => {
    addCertificateAPICalls();

    // console.log("data onSubmitCert ", data);
  };
  const onUpdateCert = (data) => {
    updateTrainingCertAPICall();
  };
  const onSubmitCndVfn = (data) => {
    updateAPICalls("candidate-verification");
  };
  const onSubmitAgentMstr = (data) => {
    addAPICalls("agent-master");
  };
  const onUpdateAgentMstr = (data) => {
    updateAPICalls("agent-master");
  };
  const onSubmitAgentTmpt = (data) => {
    addAPICalls("agent-pricing-template");
  };
  const onSubmitBatchPrty = (data) => {
    addAPICalls("batch-priority");
  };
  const onSubmitCategory = (data) => {
    addAPICalls("category");
  };
  const onSubmitCompany = (data) => {
    addAPICalls("company");
  };
  const onSubmitIndustry = (data) => {
    addAPICalls("industry");
  };
  const onSubmitRole = (data) => {
    addAPICalls("role");
  };
  const onSubmitSkillset = (data) => {
    addAPICalls("skillset");
  };
  const onSubmitSubscription = (data) => {
    addAPICalls("subscription");
  };
  const onSubmitUser = (data) => {
    addAPICalls("user");
  };

  //Table heading array for each module
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
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Actions",
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
    // {
    //   id: "inProgress",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "In-Progress",
    // },
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
    {
      id: "actions",
      numeric: true,
      disablePadding: false,
      label: "Actions",
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
    {
      id: "Actions",
      numeric: false,
      disablePadding: false,
      label: "Actions",
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
    {
      id: "Actions",
      numeric: false,
      disablePadding: false,
      label: "Actions",
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
    {
      id: "action",
      numeric: true,
      disablePadding: false,
      label: "Action",
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
    {
      id: "Actions",
      numeric: false,
      disablePadding: false,
      label: "Actions",
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
    {
      id: "Actions",
      numeric: false,
      disablePadding: false,
      label: "Actions",
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
    {
      id: "Actions",
      numeric: false,
      disablePadding: false,
      label: "Actions",
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
    {
      id: "Actions",
      numeric: false,
      disablePadding: false,
      label: "Actions",
    },
  ];
  const loginHistory =[
    {
      id: "SrNo",
      numeric: false,
      disablePadding: true,
      label: "Sr.No",
    },
    {
      id: "userName",
      numeric: false,
      disablePadding: true,
      label: "User Name",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: true,
      label: "Email",
    },
    {
      id: "Logged In Date And Time",
      numeric: false,
      disablePadding: true,
      label: "Logged In Date And Time",
    },
  ]

  //Candidate Master API Call
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        // alert("Timeout - Login Again");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        setLoader(false);
        navigate("/login");
        console.error("There was an error!- getCandidateMasterAPIcall", error);
      });
  };

  //Filter records of candidate master module
  const filterCandiateMasterAPICall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(
        `/v1/filter-candidate?fullName=${filterData.fullName}&contact=${
          filterData.contact
        }&id=${17562}`,
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        setLoader(false);
        navigate("/login");
        console.error("There was an error!- getCandidateMasterAPIcall", error);
      });
  };

  //Get the Candidate Master data based on id
  const getCandidateMsaterAPIcallById = (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/candidates/${id}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setUpdateCandidateMasterData(response.data.data);
          setUpdateCandidateMasterDataAudit(response.data.data);
          console.log(
            "candidate Data to update by id",
            updateCandidateMasterData
          );
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getBatchPriorityAPIcall", error);
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        navigate("/login");
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        setLoader(false);
        navigate("/login");
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        navigate("/login");
        setLoader(false);
        console.error(
          "There was an error!- getCandidateVerificationAPIcall",
          error
        );
      });
  };

  const getDashboardAPICall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/candidate-verifications/dashboard`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setCandidateVerDashboard(response.data.data.count);
          console.log("candidate verification", candidateVerDashboard);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        navigate("/login");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        setLoader(false);
        navigate("/login");
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
        `/v1/admin/candidate-upload-batches?mode=${filterTableOnTabs}&limit=${rowsPerPage}&page=${
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        navigate("/login");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
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
          // console.log("category", tblData);
          setTblDataCount(response.data.data.count);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        navigate("/login");
        setLoader(false);
        console.error("There was an error!- getCategoryAPIcall", error);
      });
  };

  //fetch for filter the category data
  const getCategoryAPIcallForFilter = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/all-categories?all=*`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setFilterDataForCategory(response.data.data.categories);
          setTblDataCount(response.data.data.count);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        navigate("/login");
        // alert("Timeout - Login Again");
        setLoader(false);
        console.error("There was an error!- getCompanyAPIcall", error);
      });
  };
  //fetch for filter the company data
  const getCompanyForFilterAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/all-companies`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setFilterDataForCompany(response.data.data.result);
          setTblDataCount(response.data.data.count);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
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
          setTblData(response.data.data.customers);
          setTblDataCount(response.data.data.count);
          console.log("customer", tblData);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        navigate("/login");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        setLoader(false);
        console.error("There was an error!- getCustomerAPIcall", error);
      });
  };
  //fetch the customer data
  const getCustomerAPIcallFilter = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/all-customers`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setFilterDataForCustomer(response.data.data.customers);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        navigate("/login");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        navigate("/login");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        setLoader(false);
        console.error("There was an error!- getIndustryAPIcall", error);
      });
  };

  //fetch the industry data for filter
  const getIndustryForFilterAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/all-industries`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setFilterDataForIndustry(response.data.data.industries);
          setIndustryForCompany(response.data.data.industries);
          setTblDataCount(response.data.data.count);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        navigate("/login");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        navigate("/login");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        setLoader(false);
        console.error("There was an error!- getRoleAPIcall", error);
      });
  };

  //fetch the roles data for filter
  const getRoleForFilterAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/all-roles`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setFilterDataForRole(response.data.data.roles);
          setRoleForUSer(response.data.data.roles);
          setTblDataCount(response.data.data.count);
          console.log("roles", tblData);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        navigate("/login");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        setLoader(false);
        console.error("There was an error!- getSkillSetAPIcall", error);
      });
  };

  //fetch the skillset data
  const getSkillSetForFilterAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/all-skills`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setFilterDataForSkillSets(response.data.data.skills);
          setTblDataCount(response.data.data.count);
          console.log("skill set", tblData);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        navigate("/login");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
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
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        navigate("/login");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        setLoader(false);
        console.error("There was an error!- getSubscriptionAPIcall", error);
      });
  };

  //fetch the subscriptions data for filter
  const getSubscriptionForFilterAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/all-subscriptions`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setFilterDataForSubscription(response.data.data.subscriptions);
          setTblDataCount(response.data.data.count);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        navigate("/login");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        navigate("/login");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        setLoader(false);
        console.error("There was an error!- getUserAPIcall", error);
      });
  };

  //fetch the users data for filter
  const getUserForFilterAPIcall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/all-users`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setFilterDataForUser(response.data.data.result);
          setTblDataCount(response.data.data.count);
          console.log("users", tblData);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        navigate("/login");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        setLoader(false);
        console.error("There was an error!- getUserAPIcall", error);
      });
  };

  //Fetch the Batch Priority data Passive Create
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getBatchPriorityAPIcall", error);
      });
  };

  //Fetch the Batch Priority data
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
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
          setBatchPriority(response.data.data);
          console.log("batch priority stats ", response.data.data.assignedTo);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getPermissionsAPIcall", error);
      });
  };

  // Fetch the Role By id
  const getRoleByIdAPIcall = async () => {
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getRolesById", error);
      });
  };

  //Fetch Other Industry Category Data
  const getOtherIndustryCategoryAPIcall = async () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    await handler
      .dataGet(`/v1/admin/other-industries-categories`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setOtherIndCategory(response.data.data.candidates);
          setOtherIndCategoryResult(response.data.data.result);
          setOtherIndCategoryStats(response.data.data.stats);
          // setTblDataCount(response.data.data.count);
          // console.log("industry category", otherIndCategory);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          console.log("somthing wrong in other industry category");
        }
      })
      .catch((error) => {
        // alert("Timeout - Login Again");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        setLoader(false);
        navigate("/login");
        console.error("There was an error!- getCandidateMasterAPIcall", error);
      });
  };

  //Fetch the Company Data By id
  const getCompanyAPIcallById = (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/companies/${id}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setCompanyData(response.data.data);
          setCompanyDataAudit(response.data.data)
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getCompanyDataById", error);
      });
  };

  //get user details by id of user module modal on click of edit
  const getUserAPIcallById = (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setUpdateUserData(response.data.data);
          setUpdateUserDataForAudit(response.data.data)
          // setTblDataCount(response.data.data.users);
          console.log("user Data to update by id", updateUserData);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getBatchPriorityAPIcall", error);
      });
  };

  //Fetch Candidate Verification Data By Id
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
          setUpdateCandidateVerificationDataAuditLog(response.data.data)

        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error(
          "There was an error!- getCandidateVerificationById",
          error
        );
      });
  };

  //Fetch Candidate verification Passive update
  const getCandidateVerificationPassiveUpdate = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/candidate-verifications/passive-update`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setIndustryData(response.data.data.industries);
          setCategoryData(response.data.data.categories);
          // console.log("candidate passivee update by id", response.data.data);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error(
          "There was an error!- getCandidateVerificationById",
          error
        );
      });
  };

  //Fetch Agent Pricing Template Data By Id
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
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error(
          "There was an error!- getAgentPeicingTemplateById",
          error
        );
      });
  };

  //Fetch Agent Master Data By Id
  const getAgentMasteById = (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/agents/${id}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setAgentMasterData(response.data.data);
          setAgentMasterDataAudit(response.data.data);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getBatchPriorityAPIcall", error);
      });
  };

  //Fetch Category Data By Id
  const getCategoryById = (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/categories/${id}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setCategoryData(response.data.data);
          setCategoryDataAudit(response.data.data);
          console.log("agent by id", response.data.data);
          // console.log("getAgentMasterData",agentMasterData);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getCategoryById", error);
      });
  };

  //Fetch Industry Data By Id
  const getIndustryById = (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/industries/${id}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setIndustryData(response.data.data);
          setIndustryDataAudit(response.data.data)
          // console.log("industy by id",response.data.data);
          // console.log("getAgentMasterData",agentMasterData);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getCategoryById", error);
      });
  };

  //Fetch Skillset Data By Id
  const getCustomerById = (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/customers/${id}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setCustomerData(response.data.data)
          console.log("data",response.data);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getSkillSetById", error);
      });
  };

  //Fetch Skillset Data By Id
  const getSkillSetById = (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/skills/${id}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setSkillSetData(response.data.data);
          setSkillSetDataForAuditLog(response.data.data)
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getSkillSetById", error);
      });
  };

  //Fetch Subscription Data By Id
  const getSubscriptionByIdAPIcall = (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/subscriptions/${id}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setSubscriptionData(response.data.data);
          setSubscriptionDataForAudit(response.data.data)
          // console.log("agent by id",response.data.data);
          // console.log("getAgentMasterData",agentMasterData);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getSkillSetById", error);
      });
  };

  //Fetch Agent Pricing for Candidate Upload Batch Data
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
          setCandidateUploadBatchAdminDataAudit(response.data.data.agentPricingTemplates)
          setCndUpdBatchAdmin(response.data.data.agentPricingTemplates);
          console.log("agent template data", candidateUploadBatchAdminData);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        navigate("/login");
        setErrMsg("Timeout - Login Again");
        setOpenErrtMsg(true);
        setLoader(false);
        console.error(
          "There was an error!- getAgentTemplatePricingAPIcall",
          error
        );
      });
  };

  //Add work experience in candidate master module
  const addWorkExperienceAPICall = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataPost(
        `/v1/candidates/${!editStatus ? candidateId : editId}/work-history`,
        workExperianceData,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status == 201) {
          handleCloseChildModal();
          setOpenAlertMsg(true);
        } else {
          // setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          // setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        if (error.status == 400) {
          setErrMsg(error.data.message);
          setOpenErrtMsg(true);
        }
        console.error("There was an error!- createCompany", error);
      });
  };

  //add new training or certificate data
  const addCertificateAPICalls = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataPost(
        `/v1/candidates/${!editStatus ? candidateId : editId}/training-cert`,
        trainingCertData,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status == 201) {
          setErrMsg(response.data.message);
          handleCloseChildModalCerti();
          setOpenAlertMsg(true);
          getTrainingCertData();
          setLoader(true);
          setTrainCert(false);
        } else {
          setOpenErrtMsg(true);
          // setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        if (error.status == 400) {
          setErrMsg(error.data.message);
          setOpenErrtMsg(true);
        }
        console.error("There was an error!- addCertificateAPICalls", error);
      });
  };

  //get training or certificate data
  const getTrainingCertData = async () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    await handler
      .dataGet(`/v1/candidates/${editId}/training-history`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setTrainCertData(response.data.data);
          console.log("training or certificate :", response.data.data);
          setLoader(false);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getExperienceData", error);
        setLoader(false);
      });
  };

  //get experience data
  const getExperienceData = async () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    await handler
      .dataGet(`/v1/candidates/${editId}/work-history/`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setExptData(response.data.data);
          setLoader(false);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getExperienceData", error);
        setLoader(false);
      });
  };

  //delete training/certificate data
  const deleteTrainingCertAPICall = (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataDelete(`/v1/candidates/${editId}/training-history/${id}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 204) {
          console.log(response.data.message);
          getTrainingCertData();
        } else {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        if (error.status == 400) {
          setErrMsg(error.data.message);
          setOpenErrtMsg(true);
        }
        console.error("There was an error!- updateCategoryAPICall", error);
      });
  };

  //get training/certificate data by id
  const getTrainingCertByIdAPIcall = (trainingCertId) => {
    handleClickOpenChildModalCerti();
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    handler
      .dataGet(`/v1/candidates/${editId}/training-history/${trainingCertId}`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setLoader(false);
          setTrainingCertData(response.data.data);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getSkillSetById", error);
      });
  };

  //update training/certificate data
  const updateTrainingCertAPICall = (trainingCertId) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    let updateTrainingCertData = {
      ...trainingCertData,
    };
    handler
      .dataPut(
        `/v1/candidates/${editId}/training-history/${trainingCertId}`,
        updateTrainingCertData,
        {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status == 204) {
          console.log(response.data.message);
          getTrainingCertData();
          setOpenAlertMsg(true);
          handleClickOpenChildModalCerti();
          setTrainCert(false);
        } else {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        if (error.status == 400) {
          setErrMsg(error.data.message);
          setOpenErrtMsg(true);
        }
        console.error("There was an error!- updateCategoryAPICall", error);
      });
  };

  // upload profile image of candidate master module
  const addProfileImg = async () => {
    const formData = new FormData();
    // console.log(image.forEach((file) =>formData.append("image", file)));
    image.forEach((file) => formData.append("image", file));
    // formData.append('image',image)
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataPost(`/v1/upload-profile`, formData, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          console.log("response",response.data.path);
        } else {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        if (error.status == 404) {
          setErrMsg(error.data.message);
          setOpenErrtMsg(true);
        }
        console.error("There was an error!- uploadImage", error);
      });
  };

  // upload profile image of candidate master module
  const addCustomerProfileImg = async () => {
    const formData = new FormData();
    // console.log(image.forEach((file) =>formData.append("image", file)));
    // image.forEach((file) => formData.append("image", file));
    formData.append('image',image)
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataPost(`/v1/upload-customer-profile`, formData, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          setCustomerData({...customerData,profileImage:response.data.path})
        } else {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        if (error.status == 404) {
          setErrMsg(error.data.message);
          setOpenErrtMsg(true);
        }
        console.error("There was an error!- uploadImage", error);
      });
  };

  //upload documents of agent master module
  const addAgentMasterDocs = async (id) => {
    const formData = new FormData();
    // agentMasterPan.forEach((files) => formData.append("file", files));
    formData.append("file", agentMasterPan);
    formData.append("file", agentMasterPOI);
    formData.append("file", agentMasterPOA);
    formData.append("file", agentMasterBankDoc);
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataPost(`/v1/upload-agent-master/${id}`, formData, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        } else {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        if (error.status == 404) {
          setErrMsg(error.data.message);
          setOpenErrtMsg(true);
        }
        console.error("There was an error!- uploadAgentMasterDoc", error);
      });
  };

  //both api for the upload and add data into database of admin candidate upload batch module
  const addAdminCndUpl = async (id) => {
    const formData = new FormData();
    // uploadBulkData.forEach((file) => formData.append("file", file));
    formData.append("file", uploadBulkData);
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataPost(`/v1/upload-admin-candidate-uploadBatch`, formData, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          addBulkDataAdminCnd();
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        } else {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        if (error.status == 404) {
          setErrMsg(error.data.message);
          setOpenErrtMsg(true);
        }
        console.error("There was an error!- uploadImage", error);
      });
  };

  //Add Bulk Data with help of excel file
  const addBulkDataAdminCnd = () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataPost(`/v1/admin/candidate-upload-batches`, bulkData, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 201) {
          // addProfileImg(response.data.data.id);
          // getCandidateMasterAPIcall();
          setOpenAlertMsg(true);
          // handleNext();
          console.log(
            "response of admin candidate upload file :",
            response.data.data
          );
        } else {
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        if (error.status == 400) {
          setErrMsg(error.data.message);
          setOpenErrtMsg(true);
        }
        console.error("There was an error!- createCompany", error);
      });
  };

  //both api for the upload and add data into database of admin candidate upload batch module
  const addCndUplBatch = async (id) => {
    const formData = new FormData();
    // uploadBulkData.forEach((file) => formData.append("file", file));
    formData.append("file", uploadBulkCnd);
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataPost(`/v1/upload-candidate-uploadBatch`, formData, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          addBulkDataCndUpload(response.data.path);
          
        } else {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        if (error.status == 404) {
          setErrMsg(error.data.message);
          setOpenErrtMsg(true);
        }
        console.error("There was an error!- uploadImage", error);
      });
  };

  //Add Bulk Data with help of excel file
  const addBulkDataCndUpload = (path) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    handler
      .dataPost(`/v1/candidate-upload-batches`, bulkUpload, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 201) {
          // addProfileImg(response.data.data.id);
          // getCandidateMasterAPIcall();
          setOpenAlertMsg(true);
          // handleNext();
          console.log(
            "response of admin candidate upload file :",
            response.data.data
          );
          const logData = {}
          console.log("upload 1",path);

          if (uploadBulkCnd) {
            console.log("upload",path);
            Object.assign(logData, {
                "Uploaded File": path,
            })
        }
              let logDataString = JSON.stringify(logData)
                  let fullName = convertTokenToObj.name
                  let Email = convertTokenToObj.userEmail
                  let auditlog = {
                    userName: fullName
                        ? fullName:"",
                    email: Email
                        ? Email
                        : "",
                    updatedFiled: logDataString,
                    operationName: "Candidate upload batch file uploaded sucessfully"
                }
                let userActivities = {
                  userName: fullName
                      ? fullName:"",
                  email: Email
                      ? Email
                      : "",
                  dataId:response.data.data.id,
                  userLoginId:convertTokenToObj.id,
                  userActivity: logDataString,
                  operationName: "Candidate upload batch file uploaded sucessfully"
              }
                handler.dataPost(`/v1/user-activity/${helpers.auditLog.candidateUploadBatch}`,userActivities,{
                  headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
                }).then(()=>{
                  console.log("user activity added")
                })
                handlers.auditLog.addAuditLog(auditlog,
                  helpers.auditLog.candidateUploadBatch,response.data.data.id,{
                  headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
                }).then(()=>{
                  console.log("Audit log added")
                })
        } else {
          setOpenErrtMsg(true);
        }
      })
      .catch((error) => {
        if (error.status == 400) {
          setErrMsg(error.data.message);
          setOpenErrtMsg(true);
        }
        console.error("There was an error!- createCompany", error);
      });
  };

  //get passive data for existing other industry category module
  const getPassiveForOtherIndustry = async () => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    setLoader(true);
    await handler
      .dataGet(`/v1/admin/other-industries-categories/passive`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setOtherIndCategoryPassive(response.data.data.categories);
          setLoader(false);
        } else if (response.status == 400) {
          setErrMsg(response.data.message);
          setOpenErrtMsg(true);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getPassiveData", error);
        setLoader(false);
      });
  };

  //get all the based on routes with permissions
  const getAllData = (pageName) => {
      // console.log("getallData pagename :", pageName);
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
        case "other-industry-category":
          getOtherIndustryCategoryAPIcall();
          getPassiveForOtherIndustry()
          break;
        case "category":
          getCategoryAPIcall();
          getCategoryAPIcallForFilter();
          break;
        case "company":
          getCompanyAPIcall();
          getCompanyForFilterAPIcall();
          getIndustryForFilterAPIcall();
          break;
        case "customer":
          getCustomerAPIcall();
          getCustomerAPIcallFilter();
          break;
        case "industry":
          getIndustryAPIcall();
          getIndustryForFilterAPIcall();
          break;
        case "role":
          getRoleAPIcall();
          getRoleForFilterAPIcall();
          // getPermissionsAPIcall();
          break;
        case "skillset":
          getSkillSetAPIcall();
          getSkillSetForFilterAPIcall();
          break;
        case "subscription":
          getSubscriptionAPIcall();
          getSubscriptionForFilterAPIcall();
          break;
        case "user":
          getUserAPIcall();
          getUserForFilterAPIcall();
          getRoleForFilterAPIcall();
          break;
        default:
          break;
      }
    };

  //Method for Table Heading 
  const EnhancedTableHead = (props) => {
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
          <TableCell padding="checkbox"></TableCell>
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
  };

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  //Styles
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

  //Array to use in select field
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
      id: 4,
    },
    {
      value: "Call Center Staff",
      label: "Call Center Staff",
      id: 5,
    },
    {
      value: "HO Agent",
      label: "HO Agent",
      id: 6,
    },
    {
      value: "User",
      label: "User",
      id: 2,
    },
  ];
  const candidateConsent = [
    {
      value: "PENDING",
      label: "Consent Pending ",
    },
    {
      value: "DECLINED",
      label: "Consent Declined ",
    },
    {
      value: "RECEIVED",
      label: "Consent Received ",
    },
  ];
  const callStatus = [
    {
      value: "BUSY",
      label: "Busy",
    },
    {
      value: "CALL_BACK",
      label: "Call Back",
    },
    {
      value: "COMPLETED",
      label: "Completed",
    },
    {
      value: "DISCONNECTED",
      label: "Disconnected",
    },
    {
      value: "HALF_DETAILS",
      label: "Half Details",
    },
    {
      value: "NOT_REACHABLE",
      label: "Not Reachable",
    },
    {
      value: "RINGING",
      label: "Ringing",
    },
    {
      value: "SWITCH_OFF",
      label: "Switch Off",
    },
  ];
  const callStatusDeclined = [
    {
      value: "NOT_REACHABLE",
      label: "Not Reachable",
    },
    {
      value: "NOT_INTERESTED",
      label: "Not Interested",
    },
    {
      value: "WRONG_NO",
      label: "Wrong No",
    },
  ];
  const callStatusPending = [
    {
      value: "BUSY",
      label: "Busy",
    },
    {
      value: "CALL_BACK",
      label: "Call Back",
    },
    {
      value: "DISCONNECTED",
      label: "Disconnected",
    },
    {
      value: "NOT_REACHABLE",
      label: "Not Reachable",
    },
    {
      value: "RINGING",
      label: "Ringing",
    },
    {
      value: "SWITCH_OFF",
      label: "Switch Off",
    },
  ];
  const industrySelectField = [
    {
      label: industryData.title,
      value: industryData.title,
    },
  ];
  const categoryList = [
    {
      value: "New",
      label: "New",
    },
    {
      value: "Existing",
      label: "Existing",
    },
  ];

  //Used in Pagination to get the new page data
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getAllData(pageName);
  };

  // onchange of number of rows data will refreshed and shows intable
  const handleChangeRowsPerPage = (event, row) => {
    setPage(0);
    setRowsPerPage(row.props.value);
  };

  //Open And Close Batch Priority Modal
  const handleClickOpenAddBtchprty = () => {
    setOpenAddBtchprty(true);
  };
  const handleCloseAddBtchprty = () => {
    setEditStatus(false);
    setOpenAddBtchprty(false);
  };

  //Open And Close Admin Candidate Upload Batch Modal
  const handleClickOpenAdminCanUplBtch = () => {
    setOpenAdminCanUplBtch(true);
  };
  const handleCloseAdminCanUplBtch = () => {
    setOpenAdminCanUplBtch(false);
  };

  //Handle the tabs of Agent Master module
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  //Handle the tabs of Candidate Verification module
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
    setTrainCert(false);
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
    link.download = `bulk-candidate-upload-template.xlsx`;
    link.href = "../../Images/bulk-candidate-upload-template.xlsx";
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

  //grouping all the role module checkbox
  const dict = {};
  for (const item of permissions) {
    if (item.group in dict) {
      dict[item.group].push({
        displayName: item.displayName,
        id: item.id,
      });
    } else {
      dict[item.group] = [
        {
          displayName: item.displayName,
          id: item.id,
        },
      ];
    }
  }
  // if you need an array
  const list = [];
  for (const key in dict) {
    list.push({
      group: key,
      items: dict[key],
    });
  }

  //condition based fields to use while adding,updating and if both address are same for the candidate master module
  const permCurrAddress = () => {
    return !editStatus
      ? candidateMasterData.curr_address
      : updateCandidateMasterData.currAddress;
  };
  const permCurrCity = () => {
    return !editStatus
      ? candidateMasterData.curr_city
      : updateCandidateMasterData.currCity;
  };
  const permCurrState = () => {
    return !editStatus
      ? candidateMasterData.curr_state
      : updateCandidateMasterData.currState;
  };
  const permCurrZip = () => {
    return !editStatus
      ? candidateMasterData.curr_zip
      : updateCandidateMasterData.currZip;
  };

  //condition based fields to use while adding,updating and if both address are same for the user module
  const permCurrUserAddss = () => {
    return !editStatus ? userData.permAddress : updateUserData.permAddress;
  };
  const permCurrUserZip = () => {
    return !editStatus ? userData.permZip : updateUserData.permZip;
  };
  const permCurrUserCity = () => {
    return !editStatus ? userData.permCity : updateUserData.permCity;
  };
  const permCurrUserState = () => {
    return !editStatus ? userData.permState : updateUserData.permState;
  };

    // its handle the call status when we change the consent of candidate verification
    const handleCallStatus = () => {
      switch (candidateConsentVal) {
        case "RECEIVED":
          return (
            <div>
              {callStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </div>
          );
        case "PENDING":
          return (
            <>
              {callStatusPending.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </>
          );
        case "DECLINED":
          return (
            <>
              {callStatusDeclined.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </>
          );
  
        default:
          break;
      }
    };
    // handle the tabs value of admin candidate upload batch module
    const handleTabOfCndtUpBatch = (event, newValue) => {
      setTabOfCndBatchValue(newValue);
      // switch (newValue) {
      //   case "1":
      //     // console.log("test set name")
      //     setFilterTableOnTabs("in-progress")
      //     getAllData('candidate-upload-batch-admin')
  
      //     break;
      //   case "2":
      //     // console.log("test 2 set name")
      //     setFilterTableOnTabs("pending-approval")
      //     getAllData('candidate-upload-batch-admin')
  
      //     break;
      //   case "3":
      //     // console.log("test 2 set name")
      //     setFilterTableOnTabs("processed")
      //     getAllData('candidate-upload-batch-admin')
  
      //     break;
  
      //   default:
      //     break;
      // }
    };
  
    //filter method for candidate verification module
    let filterCndVerification = (e) => {
      setFilterForCndVerifiction(tblData);
      let targetValue = e.target.value;
      const filteredData = filterForCndVerifiction.filter((item) => {
        return (
          item.fullName.toLowerCase().includes(targetValue.toLowerCase()) ||
          item.contactNo1.toString().includes(targetValue)
        );
      });
      if (targetValue) {
        setTblData(filteredData);
      } else {
        getCandidateVerificationAPIcall();
      }
    };
  
    //filter method for category module
    let filterCategory = (e) => {
      let targetValue = e.target.value;
      const filteredData = filterDataForCategory.filter((item) => {
        return item.title.toLowerCase().includes(targetValue.toLowerCase());
        // item.contactNo1.toString().includes(searchTerm)
      });
      if (targetValue) {
        setTblData(filteredData);
      } else getCategoryAPIcall();
    };
  
    //filter method for agent pricing template module
    let filterAgenPT = (e) => {
      setFilterForAgentPT(tblData);
      let targetValue = e.target.value;
      const filteredData = filterForAgentPT.filter((item) => {
        return (
          // console.log("item",item),
          item.templateName.toLowerCase().includes(targetValue.toLowerCase())
          // item.contactNo1.toString().includes(searchTerm)
        );
      });
      if (targetValue) {
        setTblData(filteredData);
      } else {
        getAgentTemplatePricingAPIcall();
      }
    };
  
    //filter method for company module
    let filterCompany = (e) => {
      let targetValue = e.target.value;
      const filteredData = filterDataForCompany.filter((item) => {
        return item.companyName.toLowerCase().includes(targetValue.toLowerCase());
        // item.contactNo1.toString().includes(searchTerm)
      });
      if (targetValue) {
        setTblData(filteredData);
      } else getCompanyAPIcall();
    };
  
    //filter method for industry module
    let filterIndustry = (e) => {
      let targetValue = e.target.value;
      const filteredData = filterDataForIndustry.filter((item) => {
        return item.title.toLowerCase().includes(targetValue.toLowerCase());
        // item.contactNo1.toString().includes(searchTerm)
      });
      if (targetValue) {
        setTblData(filteredData);
      } else getIndustryAPIcall();
    };
  
    //filter method for role module
    let filterRole = (e) => {
      let targetValue = e.target.value;
      const filteredData = filterDataForRole.filter((item) => {
        return item.name.toLowerCase().includes(targetValue.toLowerCase());
        // item.contactNo1.toString().includes(searchTerm)
      });
      if (targetValue) {
        setTblData(filteredData);
      } else getRoleAPIcall();
    };
    //filter method for skillset module
    let filterSkillSet = (e) => {
      let targetValue = e.target.value;
      const filteredData = filterDataForSkillSets.filter((item) => {
        return item.title.toLowerCase().includes(targetValue.toLowerCase());
        // item.contactNo1.toString().includes(searchTerm)
      });
      if (targetValue) {
        setTblData(filteredData);
      } else getSkillSetAPIcall();
    };

    //filter method for customer module
    let filterCustomer = (e) => {
      let targetValue = e.target.value;
      const filteredData = filterDataForCustomer.filter((item) => {
        return item.fullName.toLowerCase().includes(targetValue.toLowerCase());
        // item.companyName.toString().includes(searchTerm)
        console.log(filteredData);
      });
      if (targetValue) {
        setTblData(filteredData);
      } else getCustomerAPIcall();
    };
  
    //filter method for subscription module
    let filterSubscriptions = (e) => {
      let targetValue = e.target.value;
      const filteredData = filterDataForSubscription.filter((item) => {
        return item.planName.toLowerCase().includes(targetValue.toLowerCase());
        // item.contactNo1.toString().includes(searchTerm)
      });
      if (targetValue) {
        setTblData(filteredData);
      } else getSubscriptionAPIcall();
    };
    //filter method for user module
    let filterUser = (e) => {
      let targetValue = e.target.value;
      const filteredData = filterDataForUser.filter((item) => {
        return item.fullName.toLowerCase().includes(targetValue.toLowerCase());
        // item.contactNo1.toString().includes(searchTerm)
      });
      if (targetValue) {
        setTblData(filteredData);
      } else getUserAPIcall();
    };

    // function for workExperice table of candidate master module
    function WorkExperianceCol(sr, document, value, upload, status, comments) {
      return { sr, document, value, upload, status, comments };
    }
  
    // To Upload Documents
    const handleChangeFileUpload1 = (event) => {
      setAgentMasterPan(event.target.files[0]);
    };
    const handleChangeFileUpload2 = (event) => {
      setAgentMasterPOI(event.target.files[0]);
    };
    const handleChangeFileUpload3 = (event) => {
      setAgentMasterPOA(event.target.files[0]);
    };
    const handleChangeFileUpload4 = (event) => {
      setAgentMasterBankDoc(event.target.files[0]);
    };
  
    //In professional tab table heading of agent master
    const rowsAgentMaster = [
      WorkExperianceCol(
        1,
        "Pan card",
        <p>Pan Card</p>,
        // <TextField sx={{ width: "30ch" }} select id="outlined-basic" label="Pan Card" variant="outlined" />,
        <TextField id="outlined-basic" variant="outlined" />,
        <input type="file" onChange={handleChangeFileUpload1} />,
        4.0
      ),
      WorkExperianceCol(
        2,
        "Proof of identity",
        <TextField
          sx={{ width: "30ch" }}
          select
          label="Select"
          id="outlined-basic"
          variant="outlined"
        />,
        <TextField id="outlined-basic" variant="outlined" />,
        <input type="file" onChange={handleChangeFileUpload2} />
      ),
      WorkExperianceCol(
        3,
        "Proof of address",
        <TextField
          sx={{ width: "30ch" }}
          select
          id="outlined-basic"
          label="Select"
          variant="outlined"
        />,
        <TextField id="outlined-basic" variant="outlined" />,
        <input type="file" onChange={handleChangeFileUpload3} />
      ),
      WorkExperianceCol(
        4,
        "Bank Document",
        <TextField
          sx={{ width: "30ch" }}
          select
          id="outlined-basic"
          label="Select"
          variant="outlined"
        />,
        <TextField id="outlined-basic" variant="outlined" />,
        <input type="file" onChange={handleChangeFileUpload4} />
      ),
    ];
  
    //professional tabl of agent master module
    const ProfessionalTab = () => {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sr</TableCell>
                <TableCell align="center">Documents</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">Value</TableCell>
                <TableCell align="center">Upload</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsAgentMaster.map((row) => (
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
                  {/* <Button onClick={addAgentMasterDocs}>Upload</Button> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    };
  
    // read data from excel file and add into the candidate upload batch module table
    const handleFileUploadCndUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const binaryData = e.target.result;
        const workbook = XLSX.read(binaryData, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(sheet);
        setBulkUpload(sheetData);
        // console.log("sheet data : ",sheetData);
      };
  
      reader.readAsBinaryString(file);
      // console.log("ex data --- ",bulkData);
    };
  
    //search city and state by zipcode
    const searchAddByZip = () => {
      setLoader(true);
      axios
        .get(
          `https://api.postalpincode.in/pincode/${
            !editStatus
              ? candidateMasterData.perm_zip
              : updateCandidateMasterData.permZip
          }`
        )
        .then((response) => {
          if (response.status == 200) {
            setLoader(false);
            response.data.map((i) => {
              i.PostOffice.map((e) => {
                setCandidateMasterData({
                  ...candidateMasterData,
                  perm_city: e.District,
                  perm_state: e.State,
                });
                setUpdateCandidateMasterData({
                  ...updateCandidateMasterData,
                  permCity: e.District,
                  permState: e.State,
                });
              });
            });
          } else if (response.status == 400) {
            setErrMsg(response.data.message);
            setOpenErrtMsg(true);
            setLoader(false);
          }
        })
        .catch((error) => {
          console.error("There was an error!- getzipcode", error);
        });
    };
    //search city and state by zipcode
    const searchCurrAddByZip = () => {
      setLoader(true);
      axios
        .get(
          `https://api.postalpincode.in/pincode/${
            !editStatus
              ? candidateMasterData.curr_zip
              : updateCandidateMasterData.currZip
          }`
        )
        .then((response) => {
          if (response.status == 200) {
            setLoader(false);
            response.data.map((i) => {
              i.PostOffice.map((e) => {
                setCandidateMasterData({
                  ...candidateMasterData,
                  curr_city: e.District,
                  curr_state: e.State,
                });
                setUpdateCandidateMasterData({
                  ...updateCandidateMasterData,
                  currCity: e.District,
                  currState: e.State,
                });
              });
            });
          } else if (response.status == 400) {
            setErrMsg(response.data.message);
            setOpenErrtMsg(true);
            setLoader(false);
          }
        })
        .catch((error) => {
          console.error("There was an error!- getzipcode", error);
        });
    };
    //search city and state by zipcode
    const searchAddByZipForAgent = () => {
      setLoader(true);
      axios
        .get(`https://api.postalpincode.in/pincode/${agentMasterData.currZip}`)
        .then((response) => {
          if (response.status == 200) {
            setLoader(false);
            response.data.map((i) => {
              i.PostOffice.map((e) => {
                setAgentMasterData({
                  ...agentMasterData,
                  currCity: e.District,
                  currState: e.State,
                });
              });
            });
          } else if (response.status == 400) {
            setErrMsg(response.data.message);
            setOpenErrtMsg(true);
            setLoader(false);
          }
        })
        .catch((error) => {
          console.error("There was an error!- getzipcode", error);
        });
    };
    //search city and state by zipcode
    const searchPermAddByZipForAgent = () => {
      setLoader(true);
      axios
        .get(`https://api.postalpincode.in/pincode/${agentMasterData.permZip}`)
        .then((response) => {
          if (response.status == 200) {
            setLoader(false);
            response.data.map((i) => {
              i.PostOffice.map((e) => {
                setAgentMasterData({
                  ...agentMasterData,
                  permCity: e.District,
                  permState: e.State,
                });
              });
            });
          } else if (response.status == 400) {
            setErrMsg(response.data.message);
            setOpenErrtMsg(true);
            setLoader(false);
          }
        })
        .catch((error) => {
          console.error("There was an error!- getzipcode", error);
        });
    };
    //search city and state by zipcode
    const searchAddByZipForUser = () => {
      setLoader(true);
      axios
        .get(
          `https://api.postalpincode.in/pincode/${
            !editStatus ? userData.permZip : updateUserData.permZip
          }`
        )
        .then((response) => {
          if (response.status == 200) {
            setLoader(false);
            response.data.map((i) => {
              i.PostOffice.map((e) => {
                setUserData({
                  ...userData,
                  permCity: e.District,
                  permState: e.State,
                });
                setUpdateUserData({
                  ...updateUserData,
                  permCity: e.District,
                  permState: e.State,
                });
              });
            });
          } else if (response.status == 400) {
            setErrMsg(response.data.message);
            setOpenErrtMsg(true);
            setLoader(false);
          }
        })
        .catch((error) => {
          console.error("There was an error!- getzipcode", error);
        });
    };
    //search city and state by zipcode
    const searchCurrAddByZipForUser = () => {
      setLoader(true);
      axios
        .get(
          `https://api.postalpincode.in/pincode/${
            !editStatus ? userData.currZip : updateUserData.currZip
          }`
        )
        .then((response) => {
          if (response.status == 200) {
            setLoader(false);
            response.data.map((i) => {
              i.PostOffice.map((e) => {
                setUserData({
                  ...userData,
                  currCity: e.District,
                  currState: e.State,
                });
                setUpdateUserData({
                  ...updateUserData,
                  currCity: e.District,
                  currState: e.State,
                });
              });
            });
          } else if (response.status == 400) {
            setErrMsg(response.data.message);
            setOpenErrtMsg(true);
            setLoader(false);
          }
        })
        .catch((error) => {
          console.error("There was an error!- getzipcode", error);
        });
    };

  //update the redux state for audit log 
  const handleUpdateAuditData = (id) => {
    dispatch(auditLogDetails(id, helpers.auditLog.candidateMaster));
  };
  //update the redux state for audit log 
  const handleUpdateAuditDataAgentM= (id) => {
    dispatch(auditLogDetails(id, helpers.auditLog.agentMaster));
  };

  //update the redux state for audit log 
  const handleUpdateAuditDataAgentPricing= (id) => {
    dispatch(auditLogDetails(id, helpers.auditLog.agentPricingTemplate));
  };
  //update the redux state for audit log 
  const handleUpdateAuditDataCandidateVerification= (id) => {
    dispatch(auditLogDetails(id, helpers.auditLog.candidateVerification));
  };
  //update the redux state for audit log 
  const handleUpdateAuditDataAdminCndUpBatch= (id) => {
    dispatch(auditLogDetails(id, helpers.auditLog.adminCandidateUploadBatch));
  };
  //update the redux state for audit log 
  const handleUpdateAuditDataOtherMCategory= (id) => {
    dispatch(auditLogDetails(id, helpers.auditLog.otherMasterCategory));
  };
  //update the redux state for audit log 
  const handleUpdateAuditDataOtherMCompany= (id) => {
    dispatch(auditLogDetails(id, helpers.auditLog.otherMasterCompany));
  };
  //update the redux state for audit log 
  const handleUpdateAuditDataOtherMIndustry= (id) => {
    dispatch(auditLogDetails(id, helpers.auditLog.otherMasterIndustry));
  };
  //update the redux state for audit log 
  const handleUpdateAuditDataOtherMRole= (id) => {
    dispatch(auditLogDetails(id, helpers.auditLog.otherMastersRole));
  };
  //update the redux state for audit log 
  const handleUpdateAuditDataOtherMSkillSet= (id) => {
    dispatch(auditLogDetails(id, helpers.auditLog.otherMastersSkillSet));
  };
  //update the redux state for audit log 
  const handleUpdateAuditDataOtherMSubscription= (id) => {
    dispatch(auditLogDetails(id, helpers.auditLog.otherMastersSubscription));
  };
  //update the redux state for audit log 
  const handleUpdateAuditDataOtherMUser= (id) => {
    dispatch(auditLogDetails(id, helpers.auditLog.otherMastersUsers));
  };

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
              getCandidateMasterAPIcall();
              setOpenAlertMsg(true);
              handleNext();
              const logData = {}
                    if (candidateMasterData.fullName) {
                        Object.assign(logData, {
                            "Full Name": candidateMasterData.fullName,
                        })
                    }
                    if (candidateMasterData.dob) {
                      Object.assign(logData, {
                        "BirthDate": candidateMasterData.dob,
                      })
                  }
                    if (candidateMasterData.gender) {
                      Object.assign(logData, {
                        "Gender": candidateMasterData.gender,
                      })
                  }
                    if (candidateMasterData.perm_address) {
                      Object.assign(logData, {
                        "Permanent address": candidateMasterData.perm_address,
                      })
                  }
                    if (candidateMasterData.perm_city) {
                      Object.assign(logData, {
                        "Permanant City": candidateMasterData.perm_city,
                      })
                  }
                    if (candidateMasterData.perm_state) {
                      Object.assign(logData, {
                        "Permanent State": candidateMasterData.perm_state,
                      })
                  }
                    if (candidateMasterData.perm_country) {
                      Object.assign(logData, {
                        "Permanent Country": candidateMasterData.perm_country,
                      })
                  }
                    if (candidateMasterData.perm_zip) {
                      Object.assign(logData, {
                        "Permanent Zip": candidateMasterData.perm_zip,
                      })
                  }
                    if (candidateMasterData.curr_address) {
                      Object.assign(logData, {
                        "Current Address": candidateMasterData.curr_address,
                      })
                  }
                    if (candidateMasterData.curr_city) {
                      Object.assign(logData, {
                        "Current City": candidateMasterData.curr_city,
                      })
                  }
                    if (candidateMasterData.curr_country) {
                      Object.assign(logData, {
                        "Current Country": candidateMasterData.curr_country,
                      })
                  }
                    if (candidateMasterData.curr_zip) {
                      Object.assign(logData, {
                        "Current Zip": candidateMasterData.curr_zip,
                      })
                  }
                    if (candidateMasterData.email1) {
                      Object.assign(logData, {
                        "Primary Email Address": candidateMasterData.email1,
                      })
                  }
                    if (candidateMasterData.email2) {
                      Object.assign(logData, {
                        "Secondary Email Address": candidateMasterData.email2,
                      })
                  }
                    if (candidateMasterData.contactNo1) {
                      Object.assign(logData, {
                        "Primary Contact Number": candidateMasterData.contactNo1,
                      })
                  }
                    if (candidateMasterData.contactNo2) {
                      Object.assign(logData, {
                        "Secondary Contact Number": candidateMasterData.contactNo2,
                      })
                  }
                    if (candidateMasterData.aadharNo) {
                      Object.assign(logData, {
                        "Aadhar Number": candidateMasterData.aadharNo,
                      })
                  }
                    if (candidateMasterData.registrationStatus) {
                      Object.assign(logData, {
                        "Registration Status": candidateMasterData.registrationStatus,
                      })
                  }
                  let logDataString = JSON.stringify(logData)
                  let fullName = convertTokenToObj.name
                  let Email = convertTokenToObj.userEmail
                  let auditlog = {
                    userName: fullName
                        ? fullName:"",
                    email: Email
                        ? Email
                        : "",
                    updatedFiled: logDataString,
                    operationName: "Candidate Master added successfully."
                }
                let userActivities = {
                  userName: fullName
                      ? fullName:"",
                  email: Email
                      ? Email
                      : "",
                  dataId:response.data.data.id,
                  userLoginId:convertTokenToObj.id,
                  userActivity: logDataString,
                  operationName: "Candidate Master added successfully."
              }
                handler.dataPost(`/v1/user-activity/${helpers.auditLog.candidateMaster}`,userActivities,{
                  headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
                }).then(()=>{
                  console.log("user activity added")
                })
                handlers.auditLog.addAuditLog(auditlog,
                  helpers.auditLog.candidateMaster,response.data.data.id,{
                  headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
                }).then(()=>{
                  console.log("Audit log added")
                })
                
            } else {
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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
              const logData = {}
              let logDataString = JSON.stringify(logData)
                  let fullName = convertTokenToObj.name
                  let Email = convertTokenToObj.userEmail
                  let auditlog = {
                    userName: fullName
                        ? fullName:"",
                    email: Email
                        ? Email
                        : "",
                    updatedFiled: logDataString,
                    operationName: "Candidate verification new data assigned successfully."
                }
                let userActivities = {
                  userName: fullName
                      ? fullName:"",
                  email: Email
                      ? Email
                      : "",
                  dataId:response.data.data.id,
                  userLoginId:convertTokenToObj.id,
                  userActivity: logDataString,
                  operationName: "Candidate verification new data assigned successfully."
              }
                handler.dataPost(`/v1/user-activity/${helpers.auditLog.candidateVerification}`,userActivities,{
                  headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
                }).then(()=>{
                  console.log("user activity added")
                })
                handlers.auditLog.addAuditLog(auditlog,
                  helpers.auditLog.candidateVerification,response.data.data.id,{
                  headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
                }).then(()=>{
                  console.log("Audit log added")
                })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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
              console.log(response.data.data);
              addAgentMasterDocs(response.data.data.id);
              setOpenCandidateModal(false);
              getAgentMasterAPIcall();
              setOpenAlertMsg(true);

              const logData = {}
              if (agentMasterData.professionalStatus) {
                Object.assign(logData, {
                  "Professional Status": agentMasterData.professionalStatus,
                })
              }
              if (agentMasterData.note) {
                Object.assign(logData, {
                  "Note": agentMasterData.note,
                })
              }
              if (agentMasterData.agentNo) {
                Object.assign(logData, {
                  "Agent Number": agentMasterData.agentNo,
                })
              }
              if (agentMasterData.fullName) {
                Object.assign(logData, {
                  "Full Name": agentMasterData.fullName,
                })
              }
              if (agentMasterData.dob) {
                Object.assign(logData, {
                  "BirthDate": agentMasterData.dob,
                })
              }
              if (agentMasterData.gender) {
                Object.assign(logData, {
                  "Gender": agentMasterData.gender,
                })
              }
              if (agentMasterData.email) {
                Object.assign(logData, {
                  "Email": agentMasterData.email,
                })
              }
              if (agentMasterData.contactNo) {
                Object.assign(logData, {
                  "Contact Number": agentMasterData.contactNo,
                })
              }
              if (agentMasterData.currAddress) {
                Object.assign(logData, {
                  "Current Address": agentMasterData.currAddress,
                })
              }
              if (agentMasterData.currZip) {
                Object.assign(logData, {
                  "Current Zip": agentMasterData.currZip,
                })
              }
              if (agentMasterData.currCity) {
                Object.assign(logData, {
                  "Current City": agentMasterData.currCity,
                })
              }
              if (agentMasterData.currState) {
                Object.assign(logData, {
                  "Current State": agentMasterData.currState,
                })
              }
              if (agentMasterData.permAddress) {
                Object.assign(logData, {
                  "Permanent Address": agentMasterData.permAddress,
                })
              }
              if (agentMasterData.permZip) {
                Object.assign(logData, {
                  "Permanent Zip": agentMasterData.permZip,
                })
              }
              if (agentMasterData.permCity) {
                Object.assign(logData, {
                  "Permanent City": agentMasterData.permCity,
                })
              }
              if (agentMasterData.permState) {
                Object.assign(logData, {
                  "Permanent State": agentMasterData.permState,
                })
              }
              if (agentMasterData.panCard) {
                Object.assign(logData, {
                  "Pan Card": agentMasterData.panCard,
                })
              }
              if (agentMasterData.aadharCard) {
                Object.assign(logData, {
                  "Aadhar Card ": agentMasterData.aadharCard,
                })
              }
              if (agentMasterData.primaryLang) {
                Object.assign(logData, {
                  "Primary Language": agentMasterData.primaryLang,
                })
              }
              if (agentMasterData.secondaryLang) {
                Object.assign(logData, {
                  "Secondary Language": agentMasterData.secondaryLang,
                })
              }
              if (agentMasterData.thirdLang) {
                Object.assign(logData, {
                  "Third Language": agentMasterData.thirdLang,
                })
              }
              if (agentMasterData.isActive) {
                Object.assign(logData, {
                  "Status": agentMasterData.isActive,
                })
              }
              if (agentMasterData.bankAc) {
                Object.assign(logData, {
                  "Bank Account": agentMasterData.bankAc,
                })
              }
              if (agentMasterData.bankAcType) {
                Object.assign(logData, {
                  "Bank Account Type": agentMasterData.bankAcType,
                })
              }
              if (agentMasterData.bankIfsc) {
                Object.assign(logData, {
                  "Bank IFSC": agentMasterData.bankIfsc,
                })
              }
              if (agentMasterData.bankName) {
                Object.assign(logData, {
                  "Bank Account": agentMasterData.bankName,
                })
              }
              if (agentMasterData.workLocation1) {
                Object.assign(logData, {
                  "Work Location 1": agentMasterData.workLocation1,
                })
              }
              if (agentMasterData.workLocation2) {
                Object.assign(logData, {
                  "Work Location 2": agentMasterData.workLocation2,
                })
              }

            let logDataString = JSON.stringify(logData)
            let fullName = convertTokenToObj.name
            let Email = convertTokenToObj.userEmail
            let auditlog = {
              userName: fullName
                  ? fullName:"",
              email: Email
                  ? Email
                  : "",
              contactNumber: auditLogData
                  ? auditLogData.contactNo
                  : "",
              updatedFiled: logDataString,
              operationName: "Agent Master added successfully."
              }
              let userActivities = {
                userName: fullName
                    ? fullName:"",
                email: Email
                    ? Email
                    : "",
                dataId:response.data.data.id,
                userLoginId:convertTokenToObj.id,
                userActivity: logDataString,
                operationName: "Agent Master added successfully."
            }
              handler.dataPost(`/v1/user-activity/${helpers.auditLog.agentMaster}`,userActivities,{
                headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
              }).then(()=>{
                console.log("user activity added")
              })
              handlers.auditLog.addAuditLog(auditlog,
                helpers.auditLog.agentMaster,response.data.data.id,{
                headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
              }).then(()=>{
                console.log("Audit log added")
              })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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
              const logData = {}
              if (agentPricingTemplateData.templateName) {
                Object.assign(logData, {
                  "Template Name": agentPricingTemplateData.templateName,
                })
            }
            if (agentPricingTemplateData.description) {
              Object.assign(logData, {
                "Description": agentPricingTemplateData.description,
              })
            }
              if (agentPricingTemplateData.approvalRemarks) {
                Object.assign(logData, {
                  "Approval Remark": agentPricingTemplateData.approvalRemarks,
                })
            }
            if (agentPricingTemplateData.industry) {
              Object.assign(logData, {
                "Industry": agentPricingTemplateData.industry,
              })
            }
            if (agentPricingTemplateData.category) {
              Object.assign(logData, {
                "Industry": agentPricingTemplateData.category,
              })
            }
            if (agentPricingTemplateData.education) {
              Object.assign(logData, {
                "Education": agentPricingTemplateData.education,
              })
            }
            if (agentPricingTemplateData.fullName) {
              Object.assign(logData, {
                "Full Name": agentPricingTemplateData.fullName,
              })
            }
            if (agentPricingTemplateData.dob) {
              Object.assign(logData, {
                "BirthDate": agentPricingTemplateData.dob,
              })
            }
            if (agentPricingTemplateData.primaryLanguage) {
              Object.assign(logData, {
                "Primary Language": agentPricingTemplateData.primaryLanguage,
              })
            }
            if (agentPricingTemplateData.secondaryLanguage) {
              Object.assign(logData, {
                "Secondary Language": agentPricingTemplateData.secondaryLanguage,
              })
            }
            if (agentPricingTemplateData.contactNo1) {
              Object.assign(logData, {
                "Mobile No": agentPricingTemplateData.contactNo1,
              })
            }
            if (agentPricingTemplateData.currCity) {
              Object.assign(logData, {
                "Current City": agentPricingTemplateData.currCity,
              })
            }
            if (agentPricingTemplateData.currZip) {
              Object.assign(logData, {
                "Current Zip": agentPricingTemplateData.currZip,
              })
            }
            if (agentPricingTemplateData.email1) {
              Object.assign(logData, {
                "Primary Email": agentPricingTemplateData.email1,
              })
            }
            if (agentPricingTemplateData.preferLocation1) {
              Object.assign(logData, {
                "Prefered Location 1": agentPricingTemplateData.preferLocation1,
              })
            }
            if (agentPricingTemplateData.preferLocation2) {
              Object.assign(logData, {
                "Prefered Location 2": agentPricingTemplateData.preferLocation2,
              })
            }
            if (agentPricingTemplateData.expYears) {
              Object.assign(logData, {
                "Work Exp Yrs": agentPricingTemplateData.expYears,
              })
            }
            if (agentPricingTemplateData.lastCompany) {
              Object.assign(logData, {
                "Last Company Name": agentPricingTemplateData.lastCompany,
              })
            }
            if (agentPricingTemplateData.designation) {
              Object.assign(logData, {
                "Designation": agentPricingTemplateData.designation,
              })
            }
            if (agentPricingTemplateData.skill1) {
              Object.assign(logData, {
                "Skill 1": agentPricingTemplateData.skill1,
              })
            }
            if (agentPricingTemplateData.skill2) {
              Object.assign(logData, {
                "Skill 2": agentPricingTemplateData.skill2,
              })
            }
            if (agentPricingTemplateData.isActive) {
              Object.assign(logData, {
                "Is Active": agentPricingTemplateData.isActive,
              })
            }

            let logDataString = JSON.stringify(logData)
            let fullName = convertTokenToObj.name
            let Email = convertTokenToObj.userEmail
            let auditlog = {
              userName: fullName
                  ? fullName:"",
              email: Email
                  ? Email
                  : "",
              contactNumber: auditLogData
                  ? auditLogData.contactNo
                  : "",
              updatedFiled: logDataString,
              operationName: "Agent Pricing Template added successfully."
          }
          let userActivities = {
            userName: fullName
                ? fullName:"",
            email: Email
                ? Email
                : "",
            dataId:response.data.data.id,
            userLoginId:convertTokenToObj.id,
            userActivity: logDataString,
            operationName: "Agent Pricing Template added successfully."
        }
          handler.dataPost(`/v1/user-activity/${helpers.auditLog.agentPricingTemplate}`,userActivities,{
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          }).then(()=>{
            console.log("user activity added")
          })
          handlers.auditLog.addAuditLog(auditlog,
            helpers.auditLog.agentPricingTemplate,response.data.data.id,{
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          }).then(()=>{
            console.log("Audit log added")
          })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
            }
            console.error("There was an error!- createAgentPricingTemplate", error);
          });
        break;
      case "candidate-upload-batch-admin":
        setLoader(true);
        handler
          .dataPost(
            `/v1/admin/candidate-upload-batches/${confirmationData.id}/approval`,
            null,
            {
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }
          )
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              // console.log(response.data.message);
              getCandidateUploadBatchAdminAPIcall();
              setOpenAlertMsg(true);
              setOpenConfirmation(false)
              // setOpenAddBtchprty(false);
              setLoader(false);
              const logData ={}
              let logDataString = JSON.stringify(logData)
              let fullName = convertTokenToObj.name
              let Email = convertTokenToObj.userEmail
                let userActivities = {
                  userName: fullName
                      ? fullName:"",
                  email: Email
                      ? Email
                      : "",
                  dataId:helpers.auditLog.adminCandidateUploadBatch,
                  userLoginId:convertTokenToObj.id,
                  userActivity: logDataString,
                  operationName: "Batch approval done successful."
              }
                handler.dataPost(`/v1/user-activity/${helpers.auditLog.adminCandidateUploadBatch}`,userActivities,{
                  headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
                }).then(()=>{
                  console.log("user activity added")
                })
            } else {
              // setErrMsg(response.data.message);
              // setOpenErrtMsg(true);
              setOpenAddBtchprty(false);
              setLoader(false);
              setOpenAlertMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
            }
            console.error("There was an error!- createBatchPriority", error);
          });
        break;
      case "batch-priority":
        setLoader(true);
        handler
          .dataPost(`/v1/batch-priorities`, batchNo, {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          })
          .then((response) => {
            if (response.status == 201) {
              console.log(response.data.message);
              getBatchPriorityAPIcall();
              setOpenAlertMsg(true);
              setOpenAddBtchprty(false);
              setLoader(true);
            } else {
              // setErrMsg(response.data.message);
              // setOpenErrtMsg(true);
              setOpenAddBtchprty(false);
              setLoader(false);
              setOpenAlertMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
            }
            console.error("There was an error!- createBatchPriority", error);
          });
        break;
      case "other-industry-category":
        setLoader(true);
        handler
          .dataPost(`/v1/admin/other-industries-categories`, otherIndustryC, {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          })
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              setOpenAlertMsg(true);
              setOpenOtherIndCategory(false);
              setLoader(false);

              const logData = {}
              if (otherIndustryC.candidateId) {
                Object.assign(logData, {
                  "CandidateId": otherIndustryC.candidateId,
                })
              }
              if (otherIndustryC.description) {
                Object.assign(logData, {
                  "Description": otherIndustryC.description,
                })
              }
              if (otherIndustryC.id) {
                Object.assign(logData, {
                  "Id": otherIndustryC.id,
                })
              }
              if (otherIndustryC.mode) {
                Object.assign(logData, {
                  "Mode": otherIndustryC.mode,
                })
              }
              if (otherIndustryC.text) {
                Object.assign(logData, {
                  "Text": otherIndustryC.text,
                })
              }
              if (otherIndustryC.type) {
                Object.assign(logData, {
                  "Type": otherIndustryC.type,
                })
              }
  
              let logDataString = JSON.stringify(logData)
              let fullName = convertTokenToObj.name
              let Email = convertTokenToObj.userEmail
              let auditlog = {
                userName: fullName
                    ? fullName:"",
                email: Email
                    ? Email
                    : "",
                contactNumber: auditLogData
                    ? auditLogData.contactNo
                    : "",
                updatedFiled: logDataString,
                operationName: "Other Industry Category Added Successfully."
            }
            handlers.auditLog.addAuditLog(auditlog,
              helpers.auditLog.adminOtherIndustryCategory,response.data.data.id,{
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }).then(()=>{
              console.log("Audit log added")
            })
            } else {
              setOpenAddBtchprty(false);
              setLoader(false);
              setOpenAlertMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
            }
            console.error("There was an error!- createBatchPriority", error);
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
              setOpenCandidateModal(false);
              getCategoryAPIcall();
              setOpenAlertMsg(true);

              const logData = {}
              if (categoryData.title) {
                Object.assign(logData, {
                  "Title": categoryData.title,
                })
              }
              if (categoryData.description) {
                Object.assign(logData, {
                  "Description": categoryData.description,
                })
              }
              if (categoryData.isActive) {
                Object.assign(logData, {
                  "Is Active": categoryData.isActive,
                })
              }
  
              let logDataString = JSON.stringify(logData)
              let fullName = convertTokenToObj.name
              let Email = convertTokenToObj.userEmail
              let auditlog = {
                userName: fullName
                    ? fullName:"",
                email: Email
                    ? Email
                    : "",
                contactNumber: auditLogData
                    ? auditLogData.contactNo
                    : "",
                updatedFiled: logDataString,
                operationName: "Category added successfully."
            }
            handlers.auditLog.addAuditLog(auditlog,
              helpers.auditLog.otherMasterCategory,response.data.data.id,{
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }).then(()=>{
              console.log("Audit log added")
            })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 409) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
            }
            console.error("There was an error!- createCategory", error);
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

              const logData = {}
              if (companyData.companyName) {
                Object.assign(logData, {
                  "Company Name": companyData.companyName,
                })
              }
              if (companyData.description) {
                Object.assign(logData, {
                  "Description": companyData.description,
                })
              }
              if (companyData.industryId) {
                Object.assign(logData, {
                  "Industry Id": companyData.industryId,
                })
              }
              if (companyData.title) {
                Object.assign(logData, {
                  "Industry Title": companyData.title,
                })
              }
              if (companyData.isActive) {
                Object.assign(logData, {
                  "Is Active": companyData.isActive,
                })
              }
  
              let logDataString = JSON.stringify(logData)
              let fullName = convertTokenToObj.name
              let Email = convertTokenToObj.userEmail
              let auditlog = {
                userName: fullName
                    ? fullName:"",
                email: Email
                    ? Email
                    : "",
                contactNumber: auditLogData
                    ? auditLogData.contactNo
                    : "",
                updatedFiled: logDataString,
                operationName: "Company added successfully."
            }
            handlers.auditLog.addAuditLog(auditlog,
              helpers.auditLog.otherMasterCompany,response.data.data.id,{
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }).then(()=>{
              console.log("Audit log added")
            })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              // window.alert(error.data.message);
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
            }
            console.error("There was an error!- createCompany", error);
          });
        break;
      case "customer":
        handler
        .dataPost(`/v1/customer`, customerData, {
          headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
        })
        .then((response) => {
          console.log(response);
          if (response.status == 201) {
            console.log(response.data.message);
            setOpenCandidateModal(false);
            getCustomerAPIcall();
            setOpenAlertMsg(true);
          } else {
            setErrMsg(response.data.message);
            setOpenErrtMsg(true);
          }
        })
        .catch((error) => {
          if (error.status == 400) {
            // window.alert(error.data.message);
            setErrMsg(error.data.message);
            setOpenErrtMsg(true);
          }
          console.error("There was an error!- createCustomer", error);
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

              const logData = {}
              if (industryData.title) {
                Object.assign(logData, {
                  "Title": industryData.title,
                })
              }
              if (industryData.description) {
                Object.assign(logData, {
                  "Description": industryData.description,
                })
              }
              if (industryData.isActive) {
                Object.assign(logData, {
                  "Is Active": industryData.isActive,
                })
              }
  
              let logDataString = JSON.stringify(logData)
              let fullName = convertTokenToObj.name
              let Email = convertTokenToObj.userEmail
              let auditlog = {
                userName: fullName
                    ? fullName:"",
                email: Email
                    ? Email
                    : "",
                contactNumber: auditLogData
                    ? auditLogData.contactNo
                    : "",
                updatedFiled: logDataString,
                operationName: "Industry added successfully."
            }
            handlers.auditLog.addAuditLog(auditlog,
              helpers.auditLog.otherMasterIndustry,response.data.data.id,{
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }).then(()=>{
              console.log("Audit log added")
            })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              // window.alert(error.data.message);
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
            }
            console.error("There was an error!- createIndustry", error);
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

              const logData = {}
              if (roleData.title) {
                Object.assign(logData, {
                  "Title": roleData.title,
                })
              }
              if (roleData.description) {
                Object.assign(logData, {
                  "Description": roleData.description,
                })
              }
              if (roleData.isActive) {
                Object.assign(logData, {
                  "Is Active": roleData.isActive,
                })
              }
              if (roleData.permissionId) {
                Object.assign(logData, {
                  "Permission Id": roleData.permissionId,
                })
              }
              
              let logDataString = JSON.stringify(logData)
              let fullName = convertTokenToObj.name
              let Email = convertTokenToObj.userEmail
              let auditlog = {
                userName: fullName
                    ? fullName:"",
                email: Email
                    ? Email
                    : "",
                contactNumber: auditLogData
                    ? auditLogData.contactNo
                    : "",
                updatedFiled: logDataString,
                operationName: "Role added successfully."
            }
            handlers.auditLog.addAuditLog(auditlog,
              helpers.auditLog.otherMastersRole,response.data.data.id,{
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }).then(()=>{
              console.log("Audit log added")
            })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              // window.alert(error.data.message);
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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

              const logData = {}
              if (skillSetData.title) {
                Object.assign(logData, {
                  "Title": skillSetData.title,
                })
              }
              if (skillSetData.description) {
                Object.assign(logData, {
                  "Description": skillSetData.description,
                })
              }
              if (skillSetData.isActive) {
                Object.assign(logData, {
                  "Is Active": skillSetData.isActive,
                })
              }
  
              let logDataString = JSON.stringify(logData)
              let fullName = convertTokenToObj.name
              let Email = convertTokenToObj.userEmail
              let auditlog = {
                userName: fullName
                    ? fullName:"",
                email: Email
                    ? Email
                    : "",
                contactNumber: auditLogData
                    ? auditLogData.contactNo
                    : "",
                updatedFiled: logDataString,
                operationName: "SkillSet added successfully."
            }
            handlers.auditLog.addAuditLog(auditlog,
              helpers.auditLog.otherMastersSkillSet,response.data.data.id,{
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }).then(()=>{
              console.log("Audit log added")
            })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              // window.alert(error.data.message);
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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
               //For Audit Log
               const logData = {}
               if (subscriptionData.planName) {
                 Object.assign(logData, {
                   "Plan Name": subscriptionData.planName,
                 })
               }
               if (subscriptionData.dataCount) {
                 Object.assign(logData, {
                   "Data Count": subscriptionData.description,
                 })
               }
               if (subscriptionData.durationMonths ) {
                 Object.assign(logData, {
                   "Duration in Month": subscriptionData.durationMonths,
                 })
               }
               if (subscriptionData.price) {
                 Object.assign(logData, {
                   "Price": subscriptionData.price,
                 })
               }
               if (subscriptionData.note) {
                 Object.assign(logData, {
                   "Note": subscriptionData.note,
                 })
               }
               if (subscriptionData.isActive) {
                 Object.assign(logData, {
                   "Is Active": subscriptionData.isActive,
                 })
               }
   
               let logDataString = JSON.stringify(logData)
               let fullName = convertTokenToObj.name
               let Email = convertTokenToObj.userEmail
               let auditlog = {
                 userName: fullName
                     ? fullName:"",
                 email: Email
                     ? Email
                     : "",
                 contactNumber: auditLogData
                     ? auditLogData.contactNo
                     : "",
                 updatedFiled: logDataString,
                 operationName: "Subscription Added successfully."
             }
             handlers.auditLog.addAuditLog(auditlog,
               helpers.auditLog.otherMastersSubscription,response.data.data.id,{
               headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
             }).then(()=>{
               console.log("Audit log added")
             })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              // window.alert(error.data.message);
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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
               //For Audit Log
               const logData = {}
               if (userData.fullName) {
                 Object.assign(logData, {
                   "Full Name": userData.fullName,
                 })
               }
               if (userData.dob) {
                 Object.assign(logData, {
                   "BirthDate": userData.dob,
                 })
               }
               if (userData.gender ) {
                 Object.assign(logData, {
                   "Gender": userData.gender,
                 })
               }
               if (userData.email) {
                 Object.assign(logData, {
                   "Email": userData.email,
                 })
               }
               if (userData.contactNo) {
                 Object.assign(logData, {
                   "Contact No": userData.contactNo,
                 })
               }
               if (userData.roleId) {
                 Object.assign(logData, {
                   "Role Id": userData.roleId,
                 })
               }
               if (userData.currAddress) {
                 Object.assign(logData, {
                   "Current Address": userData.currAddress,
                 })
               }
               if (userData.currCity) {
                 Object.assign(logData, {
                   "Current City": userData.currCity,
                 })
               }
               if (userData.currState) {
                 Object.assign(logData, {
                   "Current State": userData.currState,
                 })
               }
               if (userData.currCountry) {
                 Object.assign(logData, {
                   "Current Country": userData.currCountry,
                 })
               }
               if (userData.currZip) {
                 Object.assign(logData, {
                   "Current Zip": userData.currZip,
                 })
               }
               if (userData.permAddress) {
                 Object.assign(logData, {
                   "Permanent Address": userData.permAddress,
                 })
               }
               if (userData.permCity) {
                 Object.assign(logData, {
                   "Permanent City": userData.permCity,
                 })
               }
               if (userData.permState) {
                 Object.assign(logData, {
                   "Permanent State": userData.permState,
                 })
               }
               if (userData.permZip) {
                 Object.assign(logData, {
                   "Permanent Zip": userData.permZip,
                 })
               }
               if (userData.panCard) {
                 Object.assign(logData, {
                   "Pan Card": userData.panCard,
                 })
               }
               if (userData.aadharCard) {
                 Object.assign(logData, {
                   "Aadhar Card": userData.aadharCard,
                 })
               }
               if (userData.primaryLang) {
                 Object.assign(logData, {
                   "Primary Language": userData.primaryLang,
                 })
               }
               if (userData.secondaryLang) {
                 Object.assign(logData, {
                   "Secondary Language": userData.secondaryLang,
                 })
               }
               if (userData.thirdLang) {
                 Object.assign(logData, {
                   "Third Language": userData.thirdLang,
                 })
               }
               if (userData.note) {
                 Object.assign(logData, {
                   "Note": userData.note,
                 })
               }
               if (userData.isActive) {
                 Object.assign(logData, {
                   "Is Active": userData.isActive,
                 })
               }
   
               let logDataString = JSON.stringify(logData)
               let fullName = convertTokenToObj.name
               let Email = convertTokenToObj.userEmail
               let auditlog = {
                 userName: fullName
                     ? fullName:"",
                 email: Email
                     ? Email
                     : "",
                 contactNumber: auditLogData
                     ? auditLogData.contactNo
                     : "",
                 updatedFiled: logDataString,
                 operationName: "User Added successfully."
             }
             handlers.auditLog.addAuditLog(auditlog,
               helpers.auditLog.otherMastersUsers,response.data.data.id,{
               headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
             }).then(()=>{
               console.log("Audit log added")
             })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              // window.alert(error.data.message);
              setErrMsg(true);
            }
            console.error("There was an error!- createUser", error);
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
    switch (pageName) {
      case "candidate-master":
        const updateCandidatesMasterData = {
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
            if (response.status == 204) {
              addProfileImg(updateCandidatesMasterData.id);
              setOpenAlertMsg(true);
              setOpenCandidateModal(false);
              getCandidateMasterAPIcall();
              const logData = {}
              if (updateCandidatesMasterData.fullName !== updateCandidateMasterDataAudit.fullName) {
                Object.assign(logData, {
                  "Full Name": updateCandidatesMasterData.fullName,
                })
              }
              if (updateCandidatesMasterData.dob !== updateCandidateMasterDataAudit.dob) {
                Object.assign(logData, {
                  "BirthDate": updateCandidatesMasterData.dob,
                })
              }
              if (updateCandidatesMasterData.gender !== updateCandidateMasterDataAudit.gender) {
                Object.assign(logData, {
                  "Gender": updateCandidatesMasterData.gender,
                })
              }
              if (updateCandidatesMasterData.permAddress !== updateCandidateMasterDataAudit.permAddress) {
                Object.assign(logData, {
                  "Permanent Address": updateCandidatesMasterData.permAddress,
                })
              }
              if (updateCandidatesMasterData.permCity !== updateCandidateMasterDataAudit.permCity) {
                Object.assign(logData, {
                  "Permanent City": updateCandidatesMasterData.permCity,
                })
              }
              if (updateCandidatesMasterData.permState !== updateCandidateMasterDataAudit.permState) {
                Object.assign(logData, {
                  "Permanent State": updateCandidatesMasterData.permState,
                })
              }
              if (updateCandidatesMasterData.permCountry !== updateCandidateMasterDataAudit.permCountry) {
                Object.assign(logData, {
                  "Permanent Country": updateCandidatesMasterData.permCountry,
                })
              }
              if (updateCandidatesMasterData.permZip !== updateCandidateMasterDataAudit.permZip) {
                Object.assign(logData, {
                  "Permanent Zip": updateCandidatesMasterData.permZip,
                })
              }
              if (updateCandidatesMasterData.currAddress !== updateCandidateMasterDataAudit.currAddress) {
                Object.assign(logData, {
                  "Current Address": updateCandidatesMasterData.currAddress,
                })
              }
              if (updateCandidatesMasterData.currCity !== updateCandidateMasterDataAudit.currCity) {
                Object.assign(logData, {
                  "Current Address": updateCandidatesMasterData.currCity,
                })
              }
              if (updateCandidatesMasterData.currCountry !== updateCandidateMasterDataAudit.currCountry) {
                Object.assign(logData, {
                  "Current Country": updateCandidatesMasterData.currCountry,
                })
              }
              if (updateCandidatesMasterData.currState !== updateCandidateMasterDataAudit.currState) {
                Object.assign(logData, {
                  "Current State": updateCandidatesMasterData.currState,
                })
              }
              if (updateCandidatesMasterData.currZip !== updateCandidateMasterDataAudit.currZip) {
                Object.assign(logData, {
                  "Gender": updateCandidatesMasterData.currZip,
                })
              }
              if (updateCandidatesMasterData.email1 !== updateCandidateMasterDataAudit.email1) {
                Object.assign(logData, {
                  "Primary Email": updateCandidatesMasterData.email1,
                })
              }
              if (updateCandidatesMasterData.email2 !== updateCandidateMasterDataAudit.email2) {
                Object.assign(logData, {
                  "Secondary Email": updateCandidatesMasterData.email2,
                })
              }
              if (updateCandidatesMasterData.contactNo1 !== updateCandidateMasterDataAudit.contactNo1) {
                Object.assign(logData, {
                  "Primary Contact": updateCandidatesMasterData.contactNo1,
                })
              }
              if (updateCandidatesMasterData.contactNo2 !== updateCandidateMasterDataAudit.contactNo2) {
                Object.assign(logData, {
                  "Secondary Contact": updateCandidatesMasterData.contactNo2,
                })
              }
              if (updateCandidatesMasterData.aadharNo !== updateCandidateMasterDataAudit.aadharNo) {
                Object.assign(logData, {
                  "Aadhar Number": updateCandidatesMasterData.aadharNo,
                })
              }
              if (updateCandidatesMasterData.registrationStatus !== updateCandidateMasterDataAudit.registrationStatus) {
                Object.assign(logData, {
                  "Registration Status": updateCandidatesMasterData.registrationStatus,
                })
              }
              if (updateCandidatesMasterData.isActive !== updateCandidateMasterDataAudit.isActive) {
                Object.assign(logData, {
                  "Is Active": updateCandidatesMasterData.isActive,
                })
              }
            let logDataString = JSON.stringify(logData)
            let fullName = convertTokenToObj.name
            let Email = convertTokenToObj.userEmail
            let auditlog = {
              userName: fullName
                  ? fullName:"",
              email: Email
                  ? Email
                  : "",
              contactNumber: auditLogData
                  ? auditLogData.contactNo
                  : "",
              updatedFiled: logDataString,
              operationName: "Candidate Master Updated successfully."
          }
          let userActivities = {
            userName: fullName
                ? fullName:"",
            email: Email
                ? Email
                : "",
            dataId:editId,
            userLoginId:convertTokenToObj.id,
            userActivity: logDataString,
            operationName: "Candidate Master updated successfully."
        }
          handler.dataPost(`/v1/user-activity/${helpers.auditLog.candidateMaster}`,userActivities,{
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          }).then(()=>{
            console.log("user activity added")
          })
          handlers.auditLog.addAuditLog(auditlog,
            helpers.auditLog.candidateMaster,updateCandidatesMasterData.id,{
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          }).then(()=>{
            console.log("Audit log added")
          })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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
              const logData = {}
              if (updateCandidateVerificationData.callCentre
                .candidateConsent  !== updateCandidateVerificationDataAuditLog.callCentre
                .candidateConsent) {
                Object.assign(logData, {
                  "Candidate Consent": updateCandidateVerificationData.callCentre
                  .candidateConsent,
                })
              }
              if (updateCandidateVerificationData.callCentre.callStatus 
                !== updateCandidateVerificationDataAuditLog.callCentre.callStatus) {
                Object.assign(logData, {
                  "Call Status": updateCandidateVerificationData.callCentre.callStatus
                })
              }
              if (updateCandidateVerificationData.industry !== updateCandidateVerificationDataAuditLog.industry) {
                Object.assign(logData, {
                  "Old Industry": updateCandidateVerificationData.industry
                })
              }
              if (updateCandidateVerificationData.category !== updateCandidateVerificationDataAuditLog.category) {
                Object.assign(logData, {
                  "Old Category": updateCandidateVerificationData.category
                })
              }
              if (updateCandidateVerificationData.education !== updateCandidateVerificationDataAuditLog.education) {
                Object.assign(logData, {
                  "Old Education": updateCandidateVerificationData.education
                })
              }
              if (updateCandidateVerificationData.fullName !== updateCandidateVerificationDataAuditLog.fullName) {
                Object.assign(logData, {
                  "Full Name": updateCandidateVerificationData.fullName
                })
              }
              if (updateCandidateVerificationData.contactNo1 !== updateCandidateVerificationDataAuditLog.contactNo1) {
                Object.assign(logData, {
                  "Primary Mobile No": updateCandidateVerificationData.contactNo1
                })
              }
              if (updateCandidateVerificationData.contactNo2 !== updateCandidateVerificationDataAuditLog.contactNo2) {
                Object.assign(logData, {
                  "secondary Mobile No": updateCandidateVerificationData.contactNo2
                })
              }
              if (updateCandidateVerificationData.email1 !== updateCandidateVerificationDataAuditLog.email1) {
                Object.assign(logData, {
                  "Primary Email": updateCandidateVerificationData.email1
                })
              }
              if (updateCandidateVerificationData.expYears !== updateCandidateVerificationDataAuditLog.expYears) {
                Object.assign(logData, {
                  "Total Exp Years": updateCandidateVerificationData.expYears
                })
              }
              if (updateCandidateVerificationData.education !== updateCandidateVerificationDataAuditLog.education) {
                Object.assign(logData, {
                  "Education": updateCandidateVerificationData.education
                })
              }
              if (updateCandidateVerificationData.dob !== updateCandidateVerificationDataAuditLog.dob) {
                Object.assign(logData, {
                  "BirthDate": updateCandidateVerificationData.dob
                })
              }
              if (updateCandidateVerificationData.gender !== updateCandidateVerificationDataAuditLog.gender) {
                Object.assign(logData, {
                  "Gender": updateCandidateVerificationData.gender
                })
              }
              if (updateCandidateVerificationData.industries !== updateCandidateVerificationDataAuditLog.industries) {
                Object.assign(logData, {
                  "Industry": updateCandidateVerificationData.industries
                })
              }
              if (updateCandidateVerificationData.categories !== updateCandidateVerificationDataAuditLog.categories) {
                Object.assign(logData, {
                  "Category": updateCandidateVerificationData.categories
                })
              }
              if (updateCandidateVerificationData.skill1 !== updateCandidateVerificationDataAuditLog.skill1) {
                Object.assign(logData, {
                  "Primary Skill Name": updateCandidateVerificationData.skill1
                })
              }
              if (updateCandidateVerificationData.skill2 !== updateCandidateVerificationDataAuditLog.skill2) {
                Object.assign(logData, {
                  "Secondary Skill Name": updateCandidateVerificationData.skill2
                })
              }
              if (updateCandidateVerificationData.preferLocation1 !== updateCandidateVerificationDataAuditLog.preferLocation1) {
                Object.assign(logData, {
                  "Prefered Location 1": updateCandidateVerificationData.preferLocation1
                })
              }
              if (updateCandidateVerificationData.preferLocation2 !== updateCandidateVerificationDataAuditLog.preferLocation2) {
                Object.assign(logData, {
                  "Prefered Location 2": updateCandidateVerificationData.preferLocation2
                })
              }
              if (updateCandidateVerificationData.primaryLanguage !== updateCandidateVerificationDataAuditLog.primaryLanguage) {
                Object.assign(logData, {
                  "Primary Language": updateCandidateVerificationData.primaryLanguage
                })
              }
              if (updateCandidateVerificationData.secondaryLanguage !== updateCandidateVerificationDataAuditLog.secondaryLanguage) {
                Object.assign(logData, {
                  "Secondary Language": updateCandidateVerificationData.secondaryLanguage
                })
              }
              if (updateCandidateVerificationData.thirdLanguag !== updateCandidateVerificationDataAuditLog.thirdLanguage) {
                Object.assign(logData, {
                  "Third Language": updateCandidateVerificationData.thirdLanguage
                })
              }
              if (updateCandidateVerificationData.currZip !== updateCandidateVerificationDataAuditLog.currZip) {
                Object.assign(logData, {
                  "Current Pincode": updateCandidateVerificationData.currZip
                })
              }
              if (updateCandidateVerificationData.currCity !== updateCandidateVerificationDataAuditLog.currCity) {
                Object.assign(logData, {
                  "Current City": updateCandidateVerificationData.currCity
                })
              }
              if (updateCandidateVerificationData.currState !== updateCandidateVerificationDataAuditLog.currState) {
                Object.assign(logData, {
                  "Current State": updateCandidateVerificationData.currState
                })
              }
              if (updateCandidateVerificationData.currAddress !== updateCandidateVerificationDataAuditLog.currAddress) {
                Object.assign(logData, {
                  "Current Address": updateCandidateVerificationData.currAddress
                })
              }
              if (updateCandidateVerificationData.permZip !== updateCandidateVerificationDataAuditLog.permZip) {
                Object.assign(logData, {
                  "Permanent Pincode": updateCandidateVerificationData.permZip
                })
              }
              if (updateCandidateVerificationData.permCity !== updateCandidateVerificationDataAuditLog.permCity) {
                Object.assign(logData, {
                  "Permanent City": updateCandidateVerificationData.permCity
                })
              }
              if (updateCandidateVerificationData.permState !== updateCandidateVerificationDataAuditLog.permState) {
                Object.assign(logData, {
                  "Permanent State": updateCandidateVerificationData.permState
                })
              }
              if (updateCandidateVerificationData.permAddress !== updateCandidateVerificationDataAuditLog.permAddress) {
                Object.assign(logData, {
                  "Permanent Address": updateCandidateVerificationData.permAddress
                })
              }
              if (updateCandidateVerificationData.aadharNo !== updateCandidateVerificationDataAuditLog.aadharNo) {
                Object.assign(logData, {
                  "Aadhar Number": updateCandidateVerificationData.aadharNo
                })
              }
              if (updateCandidateVerificationData.panNo !== updateCandidateVerificationDataAuditLog.panNo) {
                Object.assign(logData, {
                  "Pan Card": updateCandidateVerificationData.panNo
                })
              }
              if (updateCandidateVerificationData.dlNo !== updateCandidateVerificationDataAuditLog.dlNo) {
                Object.assign(logData, {
                  "Driving Licence no": updateCandidateVerificationData.dlNo
                })
              }
              if (updateCandidateVerificationData.note !== updateCandidateVerificationDataAuditLog.note) {
                Object.assign(logData, {
                  "Note": updateCandidateVerificationData.note
                })
              }
              
            let logDataString = JSON.stringify(logData)
            let fullName = convertTokenToObj.name
            let Email = convertTokenToObj.userEmail
            let auditlog = {
              userName: fullName
                  ? fullName:"",
              email: Email
                  ? Email
                  : "",
              contactNumber: auditLogData
                  ? auditLogData.contactNo
                  : "",
              updatedFiled: logDataString,
              operationName: "Candidate Verification Updated successfully."
          }
          let userActivities = {
            userName: fullName
                ? fullName:"",
            email: Email
                ? Email
                : "",
            dataId:editId,
            userLoginId:convertTokenToObj.id,
            userActivity: logDataString,
            operationName: "Candidate Verification Updated successfully."
        }
          handler.dataPost(`/v1/user-activity/${helpers.auditLog.candidateVerification}`,userActivities,{
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          }).then(()=>{
            console.log("user activity added")
          })
          handlers.auditLog.addAuditLog(auditlog,
            helpers.auditLog.candidateVerification,updateCandidateVerifnData.id,{
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          }).then(()=>{
            console.log("Audit log added")
          })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
            }
            console.error("There was an error!- updateCandidateVerification", error);
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
              const logData = {}
              if (agentMasterData.professionalStatus !==agentMasterDataAudit.professionalStatus) {
                Object.assign(logData, {
                  "Professional Status": agentMasterData.professionalStatus,
                })
              }
              if (agentMasterData.note!==agentMasterDataAudit.note) {
                Object.assign(logData, {
                  "Note": agentMasterData.note,
                })
              }
              if (agentMasterData.agentNo !==agentMasterDataAudit.agentNo) {
                Object.assign(logData, {
                  "Agent Number": agentMasterData.agentNo,
                })
              }
              if (agentMasterData.fullName!==agentMasterDataAudit.fullName) {
                Object.assign(logData, {
                  "Full Name": agentMasterData.fullName,
                })
              }
              if (agentMasterData.dob !==agentMasterDataAudit.dob) {
                Object.assign(logData, {
                  "BirthDate": agentMasterData.dob,
                })
              }
              if (agentMasterData.gender !==agentMasterDataAudit.gender) {
                Object.assign(logData, {
                  "Gender": agentMasterData.gender,
                })
              }
              if (agentMasterData.email !==agentMasterDataAudit.email) {
                Object.assign(logData, {
                  "Email": agentMasterData.email,
                })
              }
              if (agentMasterData.contactNo !==agentMasterDataAudit.contactNo) {
                Object.assign(logData, {
                  "Contact Number": agentMasterData.contactNo,
                })
              }
              if (agentMasterData.currAddress !==agentMasterDataAudit.currAddress) {
                Object.assign(logData, {
                  "Current Address": agentMasterData.currAddress,
                })
              }
              if (agentMasterData.currZip !==agentMasterDataAudit.currZip) {
                Object.assign(logData, {
                  "Current Zip": agentMasterData.currZip,
                })
              }
              if (agentMasterData.currCity !==agentMasterDataAudit.currCity) {
                Object.assign(logData, {
                  "Current City": agentMasterData.currCity,
                })
              }
              if (agentMasterData.currState !==agentMasterDataAudit.currState) {
                Object.assign(logData, {
                  "Current State": agentMasterData.currState,
                })
              }
              if (agentMasterData.permAddress !==agentMasterDataAudit.permAddress) {
                Object.assign(logData, {
                  "Permanent Address": agentMasterData.permAddress,
                })
              }
              if (agentMasterData.permZip !==agentMasterDataAudit.permZip) {
                Object.assign(logData, {
                  "Permanent Zip": agentMasterData.permZip,
                })
              }
              if (agentMasterData.permCity!==agentMasterDataAudit.permCity) {
                Object.assign(logData, {
                  "Permanent City": agentMasterData.permCity,
                })
              }
              if (agentMasterData.permState !==agentMasterDataAudit.permState) {
                Object.assign(logData, {
                  "Permanent State": agentMasterData.permState,
                })
              }
              if (agentMasterData.panCard !==agentMasterDataAudit.panCard) {
                Object.assign(logData, {
                  "Pan Card": agentMasterData.panCard,
                })
              }
              if (agentMasterData.aadharCard !==agentMasterDataAudit.aadharCard) {
                Object.assign(logData, {
                  "Aadhar Card ": agentMasterData.aadharCard,
                })
              }
              if (agentMasterData.primaryLang !==agentMasterDataAudit.primaryLang) {
                Object.assign(logData, {
                  "Primary Language": agentMasterData.primaryLang,
                })
              }
              if (agentMasterData.secondaryLang !==agentMasterDataAudit.secondaryLang) {
                Object.assign(logData, {
                  "Secondary Language": agentMasterData.secondaryLang,
                })
              }
              if (agentMasterData.thirdLang !==agentMasterDataAudit.thirdLang) {
                Object.assign(logData, {
                  "Third Language": agentMasterData.thirdLang,
                })
              }
              if (agentMasterData.isActive !==agentMasterDataAudit.isActive) {
                Object.assign(logData, {
                  "Status": agentMasterData.isActive,
                })
              }
              if (agentMasterData.bankAc !==agentMasterDataAudit.bankAc) {
                Object.assign(logData, {
                  "Bank Account": agentMasterData.bankAc,
                })
              }
              if (agentMasterData.bankAcType !==agentMasterDataAudit.bankAcType) {
                Object.assign(logData, {
                  "Bank Account Type": agentMasterData.bankAcType,
                })
              }
              if (agentMasterData.bankIfsc !==agentMasterDataAudit.bankIfsc) {
                Object.assign(logData, {
                  "Bank IFSC": agentMasterData.bankIfsc,
                })
              }
              if (agentMasterData.bankName!==agentMasterDataAudit.bankName) {
                Object.assign(logData, {
                  "Bank Account": agentMasterData.bankName,
                })
              }
              if (agentMasterData.workLocation1 !==agentMasterDataAudit.workLocation1) {
                Object.assign(logData, {
                  "Work Location 1": agentMasterData.workLocation1,
                })
              }
              if (agentMasterData.workLocation2 !==agentMasterDataAudit.workLocation2) {
                Object.assign(logData, {
                  "Work Location 2": agentMasterData.workLocation2,
                })
              }

            let logDataString = JSON.stringify(logData)
            let fullName = convertTokenToObj.name
            let Email = convertTokenToObj.userEmail
            let auditlog = {
              userName: fullName
                  ? fullName:"",
              email: Email
                  ? Email
                  : "",
              contactNumber: auditLogData
                  ? auditLogData.contactNo
                  : "",
              updatedFiled: logDataString,
              operationName: "Agent Master updated successfully."
              }
              let userActivities = {
                userName: fullName
                    ? fullName:"",
                email: Email
                    ? Email
                    : "",
                dataId:editId,
                userLoginId:convertTokenToObj.id,
                userActivity: logDataString,
                operationName: "Agent Master updated successfully."
            }
              handler.dataPost(`/v1/user-activity/${helpers.auditLog.agentMaster}`,userActivities,{
                headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
              }).then(()=>{
                console.log("user activity added")
              })
              handlers.auditLog.addAuditLog(auditlog,
                helpers.auditLog.agentMaster,editId,{
                headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
              }).then(()=>{
                console.log("Audit log added")
              })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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
              // setOpenAlertMsg(true);
              setOpenCandidateModal(false);
              getAgentTemplatePricingAPIcall();
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
              console.log("else part");
              getAgentTemplatePricingAPIcall();
              // setOpenAlertMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
            }
            console.error("There was an error!- updateCategoryAPICall", error);
          });
        break;
      case "candidate-upload-batch-admin":
        const updateCandidateUploadBatchAdmin = {
          // ...candidateUploadBatchAdminData,
          templateId: candidateUploadBatchAdminData.id,
        };
        handler
          .dataPut(
            `/v1/admin/candidate-upload-batches/${editId}/change-pricing-template`,
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
              //add logData 
              const logData = {}
              if (updateCandidateUploadBatchAdmin.templateId 
                !== candidateUploadBatchAdminDataAudit.id) {
                Object.assign(logData, {
                  "Agent Pricing Template Id":updateCandidateUploadBatchAdmin.templateId,
                  })
              }
              
            let logDataString = JSON.stringify(logData)
            let fullName = convertTokenToObj.name
            let Email = convertTokenToObj.userEmail
            let auditlog = {
              userName: fullName
                  ? fullName:"",
              email: Email
                  ? Email
                  : "",
              contactNumber: auditLogData
                  ? auditLogData.contactNo
                  : "",
              updatedFiled: logDataString,
              operationName: "Pricing template changed successfully."
          }
          let userActivities = {
            userName: fullName
                ? fullName:"",
            email: Email
                ? Email
                : "",
            dataId:editId,
            userLoginId:convertTokenToObj.id,
            userActivity: logDataString,
            operationName: "Pricing template changed successfully."
        }
          handler.dataPost(`/v1/user-activity/${helpers.auditLog.adminCandidateUploadBatch}`,userActivities,{
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          }).then(()=>{
            console.log("user activity added")
          })
          handlers.auditLog.addAuditLog(auditlog,
            helpers.auditLog.adminCandidateUploadBatch,editId,{
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          }).then(()=>{
            console.log("Audit log added")
          })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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

              const logData = {}
              if (updateCategoryData.title !== categoryDataAudit.title) {
                Object.assign(logData, {
                  "Title":updateCategoryData.title,
                  })
              }
              if (updateCategoryData.description !== categoryDataAudit.description) {
                Object.assign(logData, {
                  "Description":updateCategoryData.description,
                  })
              }
              if (updateCategoryData.isActive !== categoryDataAudit.isActive) {
                Object.assign(logData, {
                  "Is Active":updateCategoryData.isActive,
                  })
              }
              
            let logDataString = JSON.stringify(logData)
            let fullName = convertTokenToObj.name
            let Email = convertTokenToObj.userEmail
            let auditlog = {
              userName: fullName
                  ? fullName:"",
              email: Email
                  ? Email
                  : "",
              contactNumber: auditLogData
                  ? auditLogData.contactNo
                  : "",
              updatedFiled: logDataString,
              operationName: "Category changed successfully."
          }
          handlers.auditLog.addAuditLog(auditlog,
            helpers.auditLog.otherMasterCategory,editId,{
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          }).then(()=>{
            console.log("Audit log added")
          })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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

              const logData = {}
              if (companyData.companyName !== companyDataAudit.companyName) {
                Object.assign(logData, {
                  "Title":companyData.companyName,
                  })
              }
              if (companyData.description !== companyDataAudit.description) {
                Object.assign(logData, {
                  "Description":companyData.description,
                  })
              }
              if (companyData.title !== companyDataAudit.description) {
                Object.assign(logData, {
                  "Industry Title":companyData.title,
                  })
              }
              if (companyData.industryId !== companyDataAudit.industryId) {
                Object.assign(logData, {
                  "Industry Id":companyData.industryId,
                  })
              }
              if (companyData.isActive !== companyDataAudit.isActive) {
                Object.assign(logData, {
                  "Is Active":companyData.isActive,
                  })
              }
              
            let logDataString = JSON.stringify(logData)
            let fullName = convertTokenToObj.name
            let Email = convertTokenToObj.userEmail
            let auditlog = {
              userName: fullName
                  ? fullName:"",
              email: Email
                  ? Email
                  : "",
              contactNumber: auditLogData
                  ? auditLogData.contactNo
                  : "",
              updatedFiled: logDataString,
              operationName: "Company changed successfully."
          }
          handlers.auditLog.addAuditLog(auditlog,
            helpers.auditLog.otherMasterCompany,editId,{
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          }).then(()=>{
            console.log("Audit log added")
          })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
            }
            console.error("There was an error!- updateCompanyAPICall", error);
          });
        break;
      case "customer":
          handler
            .dataPut(
              `/v1/customers/:${editId}`,
              customerData,
              {
                headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
              }
            )
            .then((response) => {
              console.log(response);
              if (response.status == 204) {
                setOpenCandidateModal(false);
                setOpenAlertMsg(true);
                getCustomerAPIcall();
              } else {
                setErrMsg(response.data.message);
                setOpenErrtMsg(true);
              }
            })
            .catch((error) => {
              if (error.status == 400) {
                setErrMsg(error.data.message);
                setOpenErrtMsg(true);
              }
              console.error("There was an error!- updateCustomerAPICall", error);
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

              const logData = {}
              if (industryData.title !== industryDataAudit.title) {
                Object.assign(logData, {
                  "Title":industryData.title,
                  })
              }
              if (industryData.description !== industryDataAudit.description) {
                Object.assign(logData, {
                  "Description":industryData.description,
                  })
              }
              if (industryData.id !== industryDataAudit.id) {
                Object.assign(logData, {
                  "Id":industryData.id,
                  })
              }
              if (industryData.isActive !== industryDataAudit.isActive) {
                Object.assign(logData, {
                  "Is Active":industryData.isActive,
                  })
              }
              
            let logDataString = JSON.stringify(logData)
            let fullName = convertTokenToObj.name
            let Email = convertTokenToObj.userEmail
            let auditlog = {
              userName: fullName
                  ? fullName:"",
              email: Email
                  ? Email
                  : "",
              contactNumber: auditLogData
                  ? auditLogData.contactNo
                  : "",
              updatedFiled: logDataString,
              operationName: "Industry changed successfully."
          }
          handlers.auditLog.addAuditLog(auditlog,
            helpers.auditLog.otherMasterIndustry,editId,{
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          }).then(()=>{
            console.log("Audit log added")
          })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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
          .dataPut(`/v1/roles/${udateRoleData.id}`, udateRoleData, {
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          })
          .then((response) => {
            console.log(response);
            if (response.status == 204) {
              console.log(response.data.message);
              setOpenCandidateModal(false);
              setOpenAlertMsg(true);
              getRoleAPIcall();

              //audit log
              const logData = {}
              if (roleData.name) {
                Object.assign(logData, {
                  "Title":roleData.name,
                  })
              }
              if (roleData.description) {
                Object.assign(logData, {
                  "Description":roleData.description,
                  })
              }
              if (roleData.isActive) {
                Object.assign(logData, {
                  "Is Active":roleData.isActive,
                  })
              }
              if (roleData.permissionId) {
                Object.assign(logData, {
                  "Permission Id":roleData.permissionId,
                  })
              }
              
            let logDataString = JSON.stringify(logData)
            let fullName = convertTokenToObj.name
            let Email = convertTokenToObj.userEmail
            let auditlog = {
              userName: fullName
                  ? fullName:"",
              email: Email
                  ? Email
                  : "",
              contactNumber: auditLogData
                  ? auditLogData.contactNo
                  : "",
              updatedFiled: logDataString,
              operationName: "Role Updated successfully."
          }
          handlers.auditLog.addAuditLog(auditlog,
            helpers.auditLog.otherMastersRole,editId,{
            headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
          }).then(()=>{
            console.log("Audit log added")
          })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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

              const logData = {}
              if (skillSetData.title !== skillSetDataForAuditLog.title) {
                Object.assign(logData, {
                  "Title": skillSetData.title,
                })
              }
              if (skillSetData.description!== skillSetDataForAuditLog.description) {
                Object.assign(logData, {
                  "Description": skillSetData.description,
                })
              }
              if (skillSetData.isActive !== skillSetDataForAuditLog.isActive) {
                Object.assign(logData, {
                  "Is Active": skillSetData.isActive,
                })
              }
  
              let logDataString = JSON.stringify(logData)
              let fullName = convertTokenToObj.name
              let Email = convertTokenToObj.userEmail
              let auditlog = {
                userName: fullName
                    ? fullName:"",
                email: Email
                    ? Email
                    : "",
                contactNumber: auditLogData
                    ? auditLogData.contactNo
                    : "",
                updatedFiled: logDataString,
                operationName: "SkillSet Updated successfully."
            }
            handlers.auditLog.addAuditLog(auditlog,
              helpers.auditLog.otherMastersSkillSet,editId,{
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }).then(()=>{
              console.log("Audit log added")
            })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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
              //For Audit Log
              const logData = {}
              if (subscriptionData.planName !== subscriptionDataForAudit.planName) {
                Object.assign(logData, {
                  "Plan Name": subscriptionData.title,
                })
              }
              if (subscriptionData.dataCount!== subscriptionDataForAudit.dataCount) {
                Object.assign(logData, {
                  "Data Count": subscriptionData.description,
                })
              }
              if (subscriptionData.durationMonths !== subscriptionDataForAudit.durationMonths) {
                Object.assign(logData, {
                  "Duration in Month": subscriptionData.durationMonths,
                })
              }
              if (subscriptionData.price !== subscriptionDataForAudit.price) {
                Object.assign(logData, {
                  "Price": subscriptionData.price,
                })
              }
              if (subscriptionData.note !== subscriptionDataForAudit.note) {
                Object.assign(logData, {
                  "Note": subscriptionData.note,
                })
              }
              if (subscriptionData.isActive !== subscriptionDataForAudit.isActive) {
                Object.assign(logData, {
                  "Is Active": subscriptionData.isActive,
                })
              }
  
              let logDataString = JSON.stringify(logData)
              let fullName = convertTokenToObj.name
              let Email = convertTokenToObj.userEmail
              let auditlog = {
                userName: fullName
                    ? fullName:"",
                email: Email
                    ? Email
                    : "",
                contactNumber: auditLogData
                    ? auditLogData.contactNo
                    : "",
                updatedFiled: logDataString,
                operationName: "Subscription Updated successfully."
            }
            handlers.auditLog.addAuditLog(auditlog,
              helpers.auditLog.otherMastersSubscription,editId,{
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }).then(()=>{
              console.log("Audit log added")
            })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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
              //For Audit Log
              const logData = {}
              if (updateUserData.fullName !== updateUserDataForAudit.fullName) {
                Object.assign(logData, {
                  "Full Name": updateUserData.fullName,
                })
              }
              if (updateUserData.dob!== updateUserDataForAudit.dob) {
                Object.assign(logData, {
                  "BirthDate": updateUserData.dob,
                })
              }
              if (updateUserData.gender!== updateUserDataForAudit.gender ) {
                Object.assign(logData, {
                  "Gender": updateUserData.gender,
                })
              }
              if (updateUserData.email!== updateUserDataForAudit.email) {
                Object.assign(logData, {
                  "Email": updateUserData.email,
                })
              }
              if (updateUserData.contactNo!== updateUserDataForAudit.contactNo) {
                Object.assign(logData, {
                  "Contact No": updateUserData.contactNo,
                })
              }
              if (updateUserData.roleId!== updateUserDataForAudit.roleId) {
                Object.assign(logData, {
                  "Role Id": updateUserData.roleId,
                })
              }
              if (updateUserData.currAddress!== updateUserDataForAudit.currAddress) {
                Object.assign(logData, {
                  "Current Address": updateUserData.currAddress,
                })
              }
              if (updateUserData.currCity!== updateUserDataForAudit.currCity) {
                Object.assign(logData, {
                  "Current City": updateUserData.currCity,
                })
              }
              if (updateUserData.currState!== updateUserDataForAudit.currState) {
                Object.assign(logData, {
                  "Current State": updateUserData.currState,
                })
              }
              
              if (updateUserData.currZip!== updateUserDataForAudit.currZip) {
                Object.assign(logData, {
                  "Current Zip": updateUserData.currZip,
                })
              }
              if (updateUserData.permAddress!== updateUserDataForAudit.permAddress) {
                Object.assign(logData, {
                  "Permanent Address": updateUserData.permAddress,
                })
              }
              if (updateUserData.permCity !== updateUserDataForAudit.permCity) {
                Object.assign(logData, {
                  "Permanent City": updateUserData.permCity,
                })
              }
              if (updateUserData.permState !== updateUserDataForAudit.permState) {
                Object.assign(logData, {
                  "Permanent State": updateUserData.permState,
                })
              }
              if (updateUserData.permZip !== updateUserDataForAudit.permZip) {
                Object.assign(logData, {
                  "Permanent Zip": updateUserData.permZip,
                })
              }
              if (updateUserData.panCard !== updateUserDataForAudit.panCard) {
                Object.assign(logData, {
                  "Pan Card": updateUserData.panCard,
                })
              }
              if (updateUserData.aadharCard !== updateUserDataForAudit.aadharCard) {
                Object.assign(logData, {
                  "Aadhar Card": updateUserData.aadharCard,
                })
              }
              if (updateUserData.primaryLang !== updateUserDataForAudit.primaryLang) {
                Object.assign(logData, {
                  "Primary Language": updateUserData.primaryLang,
                })
              }
              if (updateUserData.secondaryLang !== updateUserDataForAudit.secondaryLang) {
                Object.assign(logData, {
                  "Secondary Language": updateUserData.secondaryLang,
                })
              }
              if (updateUserData.thirdLang !== updateUserDataForAudit.thirdLang) {
                Object.assign(logData, {
                  "Third Language": updateUserData.thirdLang,
                })
              }
              if (updateUserData.note !== updateUserDataForAudit.note) {
                Object.assign(logData, {
                  "Note": updateUserData.note,
                })
              }
              if (updateUserData.isActive !== updateUserDataForAudit.isActive) {
                Object.assign(logData, {
                  "Is Active": updateUserData.isActive,
                })
              }
  
              let logDataString = JSON.stringify(logData)
              let fullName = convertTokenToObj.name
              let Email = convertTokenToObj.userEmail
              let auditlog = {
                userName: fullName
                    ? fullName:"",
                email: Email
                    ? Email
                    : "",
                contactNumber: auditLogData
                    ? auditLogData.contactNo
                    : "",
                updatedFiled: logDataString,
                operationName: "User Updated successfully."
            }
            handlers.auditLog.addAuditLog(auditlog,
              helpers.auditLog.otherMastersUsers,editId,{
              headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
            }).then(()=>{
              console.log("Audit log added")
            })
            } else {
              setErrMsg(response.data.message);
              setOpenErrtMsg(true);
            }
          })
          .catch((error) => {
            if (error.status == 400) {
              setErrMsg(error.data.message);
              setOpenErrtMsg(true);
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
          </>
        );
      case "candidate-upload-batch":
        return (
          <>
            {!editStatus ? (
              <Button
                onClick={handleOpenCandidateModal}
                style={{
                  marginTop: "60px",
                  marginBottom: "6px",
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
                  handleUpdateAuditDataAdminCndUpBatch(editId)
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
                marginTop: "0px",
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
      case "role":
        return (
          <>
            {editStatus ? (
              <Button
                onClick={() => {
                  handleOpenCandidateModal();
                  getRoleByIdAPIcall();
                  getPermissionsAPIcall();
                  handleUpdateAuditDataOtherMRole(editId)
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
      case "login-history":
        return null;

      default:
        return (
          <>
            
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
          </>
        );
    }
  };

  // shows the content page design
  const renderDesign = () => {
    switch (pageTitle) {
      case "Candidate Master":
        return (
          <div
            style={{
              background: "aliceblue",
              marginRight: "-80px",
              marginTop: "-20px",
              marginBottom: "65px",
            }}
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch", mb: 2 },
              }}
            >
              <TextField
                size="small"
                id="outlined-basic"
                value={filterData.fullName}
                label="Full Name"
                variant="outlined"
                onChange={(e) => {
                  setFilterData({
                    ...filterData,
                    fullName: e.target.value,
                  });
                }}
              />
              <TextField
                size="small"
                id="outlined-basic"
                value={filterData.contact}
                label="Contact No"
                variant="outlined"
                onChange={(e) => {
                  setFilterData({
                    ...filterData,
                    contact: e.target.value,
                  });
                }}
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Id"
                variant="outlined"
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="Status"
                variant="outlined"
              />
              <TextField
                select
                size="small"
                id="outlined-basic"
                label="Skill"
                variant="outlined"
              />
              <TextField
                select
                size="small"
                id="outlined-basic"
                label="Industry"
                variant="outlined"
              />
              <TextField
                select
                size="small"
                id="outlined-basic"
                label="Category"
                variant="outlined"
              />
              <Button
                style={{
                  marginLeft: "1100px",
                  backgroundColor: "brown",
                  color: "white",
                  width: "90px",
                  marginTop: "-70px",
                }}
                variant="outlined"
                href="#outlined-buttons"
                onClick={filterCandiateMasterAPICall}
              >
                <FilterAltIcon />
                Filter
              </Button>
            </Box>
            <Outlet></Outlet>
          </div>
        );
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
                    onClick={()=>{
                      handleExpandClick()
                      // setBatchPriorityId(updateBatchPriority[item].batchId);
                      // console.log(batchPriorityId);
                      getBatchPriorityStatsDataAPIcall();}
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
                  <CardContent style={{fontSize:'15px'}}>
                    <List>
                  {Object.keys(batchPriorityAssingend).map((stats, i) => (
                      <tr>
                        <td>Owner:</td>
                        <td>{batchPriorityAssingend[stats].name}</td>
                      </tr>
                        ))} 
                      <tr>
                        <td>Uploaded by:</td>
                        <td>Navnath</td>
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
                </Collapse>
              </Card>
            ))}
          </>
        );
      case "Other Industry Category":
        return (
          <>
            {Object.keys(otherIndCategory).map((item, i) => (
              <>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    flex: "0",
                    fontSize: "15px",
                    marginTop: "-30px",
                    mb: 2,
                  }}
                >
                  CATEGORY:
                  <b style={{ marginRight: "20px" }}>
                    {otherIndCategory[item].id}
                  </b>
                  INDUSTRY:<b style={{ marginRight: "20px" }}>22</b>
                  WH_CATEGORY:<b style={{ marginRight: "20px" }}>116</b>
                  WH_INDUSTRY:<b>1</b>
                </Box>
              </>
            ))}
            <Box style={{ display: "flex" }}>
              <Box
                component="form"
                style={{
                  backgroundColor: "#e6fbf0",
                  marginBottom: "20px",
                  border: "1px solid #b5ddc8",
                  boxShadow: "0 1px 4px 0.25px #b5ddc8",
                  width: "110ch",
                }}
                sx={{
                  "& > :not(style)": {
                    m: 1,
                    width: "25ch",
                    mb: 2,
                    bgcolor: "#e6fbf0",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                    <ListItem
                      sx={{ display: "flex", flex: "0", fontSize: "15px" }}
                    >
                      Title:
                      <b style={{ marginRight: "20px",fontSize:"13px"}}>
                        {otherIndCategoryResult.text}
                      </b>
                      Type:
                      <b style={{ marginRight: "20px",fontSize:"13px" }}>
                        {otherIndCategoryResult.type}
                      </b>
                      BatchNo:
                      <b style={{ marginRight: "20px" ,fontSize:"13px"}}>
                        {otherIndCategoryResult.batchNo}
                      </b>
                    </ListItem>
                   
                <TextField
                  select
                  // style={{width:'50px',marginRight:20}}
                  fullWidth
                  id="outlined-basic"
                  label="Choose"
                  variant="outlined"
                  onChange={(e)=>{
                    setOtherIndustryC({...otherIndustryC,mode:e.target.value})
                  }}
                >
                  {categoryList.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      onClick={() => {
                        setCategoryFields(option.label);
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {categoryFields === "New" ? (
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    onChange={(e)=>{
                      setOtherIndustryC({...otherIndustryC,text:e.target.value})
                    }}
                  />
                ) : null}
                {categoryFields === "Existing" ? (
                  <TextField
                    select
                    id="outlined-basic"
                    label="Select"
                    variant="outlined"
                    onChange={(e)=>{
                      setOtherIndustryC({...otherIndustryC,text:e.target.value})
                    }}
                  >
                    {
                      otherIndCategoryPassive.map((data,i)=>(
                        <MenuItem key={data.id} value={data.title}>
                        {data.title}
                        </MenuItem>
                      ))
                    }
                  </TextField>
                ) : null}
                {categoryFields === "New" ? (
                  <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    onChange={(e)=>{
                      setOtherIndustryC({...otherIndustryC,description:e.target.value})
                    }}
                  />
                ) : null}

                <Button
                  onClick={() => {
                    addAPICalls("other-industry-category");
                  }}
                  style={{
                    background: "brown",
                    color: "white",
                    width: "10px",
                    marginTop: "15px",
                    marginLeft: "40px",
                  }}
                >
                  Save
                </Button>
                <VisibilityIcon
                  onClick={handleOpenOtherIndCategory}
                  style={{
                    marginLeft: "-260px",
                    marginBottom: "-10px",
                    cursor: "pointer",
                  }}
                />
                {/* </ListItem> */}
              </Box>
            </Box>
            <Dialog
              maxWidth="lg"
              open={openOtherIndCategory}
              onClose={handleCloseOtherIndCategory}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              {/* {Object.keys(otherIndCategoryStats).map((item,i)=>( */}
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <table>
                    <tr>
                      <td>ID:</td>
                      {/* <th>{console.log("test 1",otherIndCategoryStats[item])}</th> */}
                    </tr>
                    <tr>
                      <td>Full Name:</td>
                      <th>Company</th>
                      <td>Gender:</td>
                      <th>Male</th>
                    </tr>
                    <tr>
                      <td>Current City:</td>
                      <th>Pune</th>
                      <td>Current State:</td>
                      <th>Maharashtra</th>
                    </tr>

                    <tr>
                      <td>Primary Contact no:</td>
                      <th>8668539767</th>
                      <td>Education:</td>
                      <th>Graduate</th>
                    </tr>
                    <tr>
                      Industry:
                      <ul>
                        <li>
                          <b>THEATER</b>
                        </li>
                      </ul>
                    </tr>
                    <tr>
                      Categories:
                      <ul>
                        <li>
                          <b>THEATER</b>
                        </li>
                      </ul>
                    </tr>
                    <tr>
                      Work history:
                      <ul>
                        Company:<b>PVR</b>
                      </ul>
                      <ul>
                        Industry:<b>THEATER</b>
                      </ul>
                      <ul>
                        Category:<b>CUSTOMER SERVICE</b>
                      </ul>
                    </tr>
                  </table>
                </DialogContentText>
              </DialogContent>
              {/* ))} */}
              <DialogActions>
                <Button onClick={handleCloseOtherIndCategory}>Disagree</Button>
                <Button onClick={handleCloseOtherIndCategory} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </>
        );
      // <OtherIndCategory />;
      case "Admin - Candidate Upload Batch":
        return (
          <>
            <Box
              sx={{
                maxWidth: { xs: 320, sm: 480 },
                bgcolor: "background.paper",
                mb: 2,
                mt: 6,
              }}
            >
              <TabContext value={tabOfCndBatchValue}>
                <TabList
                  aria-label="lab API tabs example"
                  onChange={handleTabOfCndtUpBatch}
                  variant="scrollable"
                  scrollButtons={false}
                  style={{ border: "1px solid gray", borderRadius: "10px" }}
                  // aria-label="scrollable prevent tabs example"
                >
                  <Tab
                    label="IN-PROGRESS"
                    value="1"
                    onClick={() => {
                      setFilterTableOnTabs("in-progress");
                      console.log("test set name");
                      getAllData("candidate-upload-batch-admin");
                    }}
                  ></Tab>
                  <Tab
                    label="PENDING APPROVAL"
                    value="2"
                    onClick={() => {
                      setFilterTableOnTabs("pending-approval");
                      console.log("test set name");
                      getAllData("candidate-upload-batch-admin");
                    }}
                  />
                  <Tab
                    label="PROCESSED"
                    value="3"
                    onClick={() => {
                      setFilterTableOnTabs("processed");
                      getAllData("candidate-upload-batch-admin");
                    }}
                  />
                </TabList>
              </TabContext>
            </Box>
          </>
        );
      // <AdminCanUploadBatch />;
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
              onChange={(e) => {
                // setSearchTerm(e.target.value)
                filterCndVerification(e);
              }}
            />
          </>
        );
      case "Agent Pricing Template":
        return (
          <TextField
            id="filled-basic"
            label="Search"
            variant="filled"
            style={{
              width: "700px",
              marginBottom: "20px",
            }}
            onChange={(e) => {
              // setSearchTerm(e.target.value)
              filterAgenPT(e);
            }}
          />
        );
      case "Category - Master":
        return (
          <>
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              style={{
                width: "700px",
                marginBottom: "20px",
              }}
              onChange={(e) => {
                filterCategory(e);
              }}
            />
          </>
        );
      case "Company - Master":
        return (
          <>
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              style={{
                width: "700px",
                marginBottom: "20px",
              }}
              onChange={(e) => {
                filterCompany(e);
              }}
            />
          </>
        );
      case "Industry - Master":
        return (
          <>
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              style={{
                width: "700px",
                marginBottom: "20px",
              }}
              onChange={(e) => {
                filterIndustry(e);
              }}
            />
          </>
        );
      case "Role - Master":
        return (
          <>
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              style={{
                width: "700px",
                marginBottom: "20px",
              }}
              onChange={(e) => {
                filterRole(e);
              }}
            />
          </>
        );
      case "Skill Set - Master":
        return (
          <>
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              style={{
                width: "700px",
                marginBottom: "20px",
              }}
              onChange={(e) => {
                filterSkillSet(e);
              }}
            />
          </>
        );
      case "Subscription":
        return (
          <>
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              style={{
                width: "700px",
                marginBottom: "20px",
              }}
              onChange={(e) => {
                filterSubscriptions(e);
              }}
            />
          </>
        );
      case "User - Master":
        return (
          <>
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              style={{
                width: "700px",
                marginBottom: "20px",
              }}
              onChange={(e) => {
                filterUser(e);
              }}
            />
          </>
        );
      case "Login-History":
        return (
                <>
                <LoginHistoryDesign setLoader={setLoader}/>
                </>
              )
      case "Customer - Master":
        return (
          <>
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              style={{
                width: "700px",
                marginBottom: "20px",
              }}
              onChange={(e)=>{
                filterCustomer(e)
              }}
            />
          </>
        )
      default:
        return (
          <>
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              style={{
                width: "700px",
                marginBottom: "20px",
              }}
              // onChange={(e)=>{
              //   filterCategory(e)
              // }}
            />
          </>
        );
    }
  };


  // its handle the module modal inputs based on routes
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
                          marginLeft: "100px",
                          marginBottom: "100px",
                          marginTop: "20px",
                        }}
                      >
                        <label htmlFor="upload-photo">
                          <FileUpload
                            maxUploadFiles={1}
                            maxFileSize={0.1}
                            multiFile={false}
                            rightLabel="to select files "
                            buttonRemoveLabel="Remove"
                            acceptedType="image/*"
                            title="Upload Profile Image (png,jpg)"
                            allowedExtensions={["jpg", "jpeg", "png"]}
                            onFilesChange={(e) => {
                              // Update chosen files
                              setImage([...e]);
                            }}
                          />
                        </label>
                        <Button onClick={addProfileImg}>Upload</Button>
                      </div>
                      <div>
                        <ListItem>
                          <TextField
                            required
                            {...register("fullname")}
                            error={errors.fullname ? true : false}
                            helperText={errors.fullname?.message}
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
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            Gender
                          </FormLabel>
                          <FormControl
                            label="Gender"
                            component="fieldset"
                            name="Gender"
                          >
                            <RadioGroup
                              row
                              onChange={(e) => {
                                setCandidateMasterData({
                                  ...candidateMasterData,
                                  gender: e.target.value,
                                });
                                console.log(
                                  "gender",
                                  candidateMasterData.gender
                                );
                              }}
                              value={candidateMasterData.gender}
                            >
                              <FormLabel label="Gender" />
                              <FormControlLabel
                                value="MALE"
                                control={
                                  <Radio
                                    checked={
                                      candidateMasterData.gender === "MALE"
                                    }
                                  />
                                }
                                label="Male"
                              />
                              <FormControlLabel
                                value="FEMALE"
                                control={
                                  <Radio
                                    checked={
                                      candidateMasterData.gender === "FEMALE"
                                    }
                                  />
                                }
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
                              console.log(candidateMasterData.perm_address);
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
                            InputProps={{
                              endAdornment: (
                                <InputAdornment>
                                  <IconButton>
                                    <Search onClick={searchAddByZip} />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            // onMouseOut={searchAddByZip}
                            variant="filled"
                            sx={{ ml: 3, width: "69ch" }}
                          />
                        </ListItem>
                        <ListItem sx={{ mb: 5 }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                // checked={sameAddress}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSameAddress(true);
                                  } else {
                                    setSameAddress(false);
                                  }
                                }}
                              />
                            }
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
                            disabled={sameAddress}
                            value={
                              sameAddress
                                ? candidateMasterData.perm_address
                                : permCurrAddress()
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
                            disabled={sameAddress}
                            value={
                              sameAddress
                                ? candidateMasterData.perm_city
                                : permCurrCity()
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
                            disabled={sameAddress}
                            value={
                              sameAddress
                                ? candidateMasterData.perm_state
                                : permCurrState()
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
                            disabled={sameAddress}
                            value={
                              sameAddress
                                ? candidateMasterData.perm_zip
                                : permCurrZip()
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
                            InputProps={{
                              endAdornment: (
                                <InputAdornment>
                                  <IconButton>
                                    <Search onClick={searchCurrAddByZip} />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            variant="filled"
                            sx={{ ml: 3, width: "69ch" }}
                          />
                        </ListItem>
                        <ListItem sx={{ mb: 5 }}>
                          <TextField
                            id="filled-basic"
                            label="Primary email address"
                            required
                            {...register("email")}
                            error={errors.email ? true : false}
                            helperText={errors.email?.message}
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
                            type="number"
                            label="Primary contact no"
                            required
                            {...register("mobileNo")}
                            error={errors.mobileNo ? true : false}
                            helperText={errors.mobileNo?.message}
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
                            type="number"
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
                            type="number"
                            label="Aadhar no"
                            {...register("aadharNo")}
                            error={errors.aadharNo ? true : false}
                            helperText={errors.aadharNo?.message}
                            required
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
                      <ListItem>
                        {editStatus?(<AuditLog />):""}
                      </ListItem>
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
                              onClick={handleSubmit(onSubmit)}
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
                                // onSubmitData()
                                updateAPICalls("candidate-master");
                                getExperienceData();
                                getTrainingCertData();
                              }}
                            >
                              UPDATE AND NEXT
                            </Button>
                          )}
                          <Button
                            onClick={() => {
                              handleNext();
                              getExperienceData();
                              getTrainingCertData();
                            }}
                            style={{
                              backgroundColor: "brown",
                              color: "white",
                            }}
                          >
                            NEXT
                          </Button>
                          <Button
                            onClick={() => {
                              setOpenCandidateModal(false);
                            }}
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
                          {/* <WorkExperiance /> */}
                          <Box sx={{ width: "100%" }}>
                            <Paper>
                              <TableContainer>
                                <Table
                                  sx={{ minWidth: 500 }}
                                  aria-labelledby="tableTitle"
                                  size={dense ? "small" : "medium"}
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell padding="checkbox">
                                        <Checkbox color="primary" />
                                      </TableCell>
                                      <TableCell align="left">
                                        Campany Name
                                      </TableCell>
                                      <TableCell align="left">
                                        Start Date
                                      </TableCell>
                                      <TableCell align="left">
                                        End Date
                                      </TableCell>
                                      <TableCell align="left">
                                        Year Of Experiance
                                      </TableCell>
                                      <TableCell align="left">
                                        Actions
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>

                                  <TableBody>
                                    {Object.keys(expData).map((item, i) => (
                                      <>
                                        <TableRow
                                          hover
                                          role="checkbox"
                                          tabIndex={-1}
                                        >
                                          <TableCell padding="checkbox">
                                            <Checkbox color="primary" />
                                          </TableCell>
                                          <TableCell align="left">
                                            {expData[item].company}
                                          </TableCell>
                                          <TableCell align="left">
                                            {" "}
                                            {expData[item].startDate}
                                          </TableCell>
                                          <TableCell align="left">
                                            {" "}
                                            {expData[item].endDate}
                                          </TableCell>
                                          <TableCell align="left"> 2</TableCell>
                                          <TableCell align="left">
                                            <Button>
                                              <EditIcon></EditIcon>
                                            </Button>
                                            <Button>
                                              <DeleteIcon></DeleteIcon>
                                            </Button>
                                          </TableCell>{" "}
                                        </TableRow>
                                      </>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                              />
                            </Paper>
                          </Box>
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
                          {/* <AddCertificates /> */}

                          <Box sx={{ width: "100%" }}>
                            <Paper>
                              <TableContainer>
                                <Table
                                  sx={{ minWidth: 500 }}
                                  aria-labelledby="tableTitle"
                                  size={dense ? "small" : "medium"}
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell padding="checkbox">
                                        <Checkbox color="primary" />
                                      </TableCell>
                                      <TableCell align="left">
                                        CertificateName
                                      </TableCell>
                                      <TableCell align="left">
                                        Certificate Type
                                      </TableCell>
                                      <TableCell align="left">
                                        Issued Date
                                      </TableCell>
                                      <TableCell align="left">
                                        Actions
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {Object.keys(trainCertData).map((items) => (
                                      <>
                                        <TableRow
                                          hover
                                          role="checkbox"
                                          tabIndex={-1}
                                        >
                                          <TableCell padding="checkbox">
                                            <Checkbox color="primary" />
                                          </TableCell>
                                          <TableCell align="left">
                                            {trainCertData[items].title}
                                          </TableCell>
                                          <TableCell align="left">
                                            {trainCertData[items].type}
                                          </TableCell>
                                          <TableCell align="left">
                                            {trainCertData[items].issueDate}
                                          </TableCell>
                                          <TableCell align="left">
                                            <Button>
                                              <EditIcon
                                                onClick={() => {
                                                  getTrainingCertByIdAPIcall(
                                                    trainCertData[items].id
                                                  );
                                                  setTrainCert(true);
                                                  console.log(
                                                    "training id",
                                                    trainCertData[items].id
                                                  );
                                                }}
                                              ></EditIcon>
                                            </Button>
                                            <Button>
                                              <DeleteIcon
                                                onClick={() => {
                                                  deleteTrainingCertAPICall(
                                                    trainCertData[items].id
                                                  );
                                                  console.log(
                                                    "training id",
                                                    trainCertData[items].id
                                                  );
                                                }}
                                              ></DeleteIcon>
                                            </Button>
                                          </TableCell>
                                          {/* <TableCell align="right">{row.protein}</TableCell> */}
                                        </TableRow>
                                      </>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                              />
                            </Paper>
                          </Box>
                        </ListItem>
                      </div>

                     {editStatus? (<AuditLog />):""}
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
                            onClick={() => {
                              setOpenCandidateModal(false);
                            }}
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
                      id="number"
                      label="Company Name"
                      value={workExperianceData.companyId}
                      {...register2("companyId")}
                      error={errors2.companyId ? true : false}
                      helperText={errors2.companyId?.message}
                      onChange={(e) => {
                        setWorkExperianceData({
                          ...workExperianceData,
                          companyId: e.target.value,
                        });
                      }}
                      sx={{ width: "30ch" }}
                      variant="filled"
                      type="name"
                    />
                    <TextField
                      id="name"
                      label="Skills"
                      value={workExperianceData.skillId}
                      {...register2("skillId")}
                      error={errors2.skillId ? true : false}
                      helperText={errors2.skillId?.message}
                      onChange={(e) => {
                        setWorkExperianceData({
                          ...workExperianceData,
                          skillId: e.target.value,
                        });
                      }}
                      sx={{ width: "30ch", ml: 4 }}
                      variant="filled"
                    />
                    <TextField
                      id="date"
                      label="Start Date"
                      InputLabelProps={{ shrink: true }}
                      type="date"
                      value={workExperianceData.startDate}
                      {...register2("startDate")}
                      error={errors2.startDate ? true : false}
                      helperText={errors2.startDate?.message}
                      onChange={(e) => {
                        setWorkExperianceData({
                          ...workExperianceData,
                          startDate: e.target.value,
                        });
                      }}
                      sx={{ width: "30ch", ml: 4 }}
                      variant="filled"
                    />
                    <TextField
                      id="date"
                      label="End Date"
                      {...register2("endDate")}
                      error={errors2.endDate ? true : false}
                      helperText={errors2.endDate?.message}
                      InputLabelProps={{ shrink: true }}
                      type="date"
                      sx={{ width: "30ch", ml: 4 }}
                      variant="filled"
                      value={workExperianceData.endDate}
                      onChange={(e) => {
                        setWorkExperianceData({
                          ...workExperianceData,
                          endDate: e.target.value,
                        });
                      }}
                    />
                    {/* <TextField
                      id="file"
                      label="Upload Document"
                      InputLabelProps={{ shrink: true }}
                      type="file"
                      sx={{ width: "25ch", ml: 4 }}
                      variant="filled"
                      // value={workExperianceData.endDate}
                      // onChange={(e) => {
                      //   setWorkExperianceData({
                      //     ...workExperianceData,
                      //     endDate: e.target.value,
                      //   });
                      // }}
                    /> */}
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
                      value={workExperianceData.description}
                      onChange={(e) => {
                        setWorkExperianceData({
                          ...workExperianceData,
                          description: e.target.value,
                        });
                      }}
                    />
                  </ListItem>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseChildModal}>Close</Button>
                  <Button
                    style={{ backgroundColor: "brown", color: "white" }}
                    onClick={handleSubmitReset(onSubmitExp)}
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
                <DialogTitle>
                  {!trainingCert
                    ? "Add Training/Certificate"
                    : "Update Training/Certificate"}
                </DialogTitle>
                <DialogContent>
                  <ListItem>
                    <TextField
                      id="name"
                      label="Certificate Name"
                      value={trainingCertData.title}
                      {...register3("certificateName")}
                      error={errors3.certificateName ? true : false}
                      helperText={errors3.certificateName?.message}
                      onChange={(e) => {
                        setTrainingCertData({
                          ...trainingCertData,
                          title: e.target.value,
                        });
                      }}
                      sx={{ width: "45ch" }}
                      variant="filled"
                    />
                    <TextField
                      id="name"
                      label="Certificate Type"
                      value={trainingCertData.type}
                      onChange={(e) => {
                        setTrainingCertData({
                          ...trainingCertData,
                          type: e.target.value,
                        });
                      }}
                      sx={{ width: "45ch", ml: 4 }}
                      variant="filled"
                    />
                    <TextField
                      id="name"
                      label="Issued By"
                      value={trainingCertData.issuedBy}
                      {...register3("issuedBy")}
                      error={errors3.issuedBy ? true : false}
                      helperText={errors3.issuedBy?.message}
                      onChange={(e) => {
                        setTrainingCertData({
                          ...trainingCertData,
                          issuedBy: e.target.value,
                        });
                      }}
                      sx={{ width: "45ch", ml: 4 }}
                      variant="filled"
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      id="name"
                      select
                      children
                      value={trainingCertData.skillId}
                      onChange={(e) => {
                        setTrainingCertData({
                          ...trainingCertData,
                          skillId: e.target.value,
                        });
                      }}
                      label="Skills"
                      sx={{ width: "45ch" }}
                      variant="filled"
                    />
                    <TextField
                      id="date"
                      label="Issued Date"
                      value={trainingCertData.issueDate}
                      onChange={(e) => {
                        setTrainingCertData({
                          ...trainingCertData,
                          issueDate: e.target.value,
                        });
                      }}
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
                      value={trainingCertData.description}
                      onChange={(e) => {
                        setTrainingCertData({
                          ...trainingCertData,
                          description: e.target.value,
                        });
                      }}
                      variant="filled"
                    />
                  </ListItem>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseChildModalCerti}>Close</Button>
                  {!trainingCert ? (
                    <Button
                      style={{ backgroundColor: "brown", color: "white" }}
                      onClick={handleSubmitCert(onSubmitCert)}
                    >
                      Add
                    </Button>
                  ) : (
                    <Button
                      style={{ backgroundColor: "brown", color: "white" }}
                      onClick={handleSubmitCert(onUpdateCert)}
                    >
                      Update
                    </Button>
                  )}
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
                    accept=".xlsx"
                    onChange={(e) => {
                      setUploadBulkCnd(e.target.files[0]);
                      console.log("testing ");
                      handleFileUploadCndUpload(e);
                    }}
                    style={{ display: "none" }}
                  />
                  Upload
                </Button>
                <Button onClick={addCndUplBatch}>upload</Button>
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
                  onClick={handleSubmitCndVfn(onSubmitCndVfn)}
                >
                  Save
                </Button>
                {candidateConsentVal === "RECEIVED" &&
                candidateCallStatusVal === "COMPLETED" ? (
                  <Button
                    style={{
                      backgroundColor: "brown",
                      color: "white",
                      marginLeft: "10px",
                    }}
                    onClick={handleSubmitCndVfn(onSubmitCndVfn)}
                  >
                    Submit
                  </Button>
                ) : null}
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
                  flexDirection: "column",
                  flexWrap: "nowrap",
                  alignItems: "flex-start",
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
                  <CardContent style={{ display: "flex" }}>
                    <TextField
                      select
                      required
                      id="candidateConsent"
                      name="candidateConsent"
                      sx={{ width: "30ch" }}
                      {...register4("candidateConsent")}
                      error={errors4.candidateConsent ? true : false}
                      helperText={errors4.candidateConsent?.message}
                      label="Candidate consent"
                      onChange={(e) => {
                        setUpdateCandidateVerificationData((prevState) => ({
                          ...prevState,
                          callCentre: {
                            ...prevState.callCentre,
                            candidateConsent: e.target.value,
                          },
                        }));
                        setCandidateConsentVal(e.target.value);
                      }}
                      value={
                        updateCandidateVerificationData.callCentre
                          .candidateConsent
                      }
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
                      id="callStat"
                      name="callStat"
                      sx={{ width: "30ch", ml: 2 }}
                      label="Call Status"
                      {...register4("callStat")}
                      error={errors4.callStat ? true : false}
                      helperText={errors4.callStat?.message}
                      onChange={(e) => {
                        setUpdateCandidateVerificationData((prevState) => ({
                          ...prevState,
                          callCentre: {
                            ...prevState.callCentre,
                            callStatus: e.target.value,
                          },
                        }));
                        setCandidateCallStatusVal(e.target.value);
                        console.log("testing", e.target.value);
                      }}
                      value={
                        updateCandidateVerificationData.callCentre.callStatus
                      }
                    >
                      {/* {handleCallStatus()} */}
                      {callStatus.map((option) => (
                        <MenuItem
                          key={option.value}
                          // onClick={()=>{
                          //   setCandidateConsentVal(option.label)
                          //   console.log("test 1",candidateConsentVal);
                          // }}
                          value={option.value}
                        >
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

                <ListItem
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    // marginTop:'-150px',
                  }}
                >
                  <h3>Call Centre History (0)</h3>
                  <Card
                    style={{
                      backgroundColor: "#ffeaeb",
                      marginBottom: 2,
                      borderRadius: "3px",
                      border: "1px solid #eecacb",
                      boxShadow: "0 1px 4px 0.25px #eecacb",
                    }}
                  >
                    <CardContent>
                      <p style={{ marginBottom: "-12x", marginTop: "-12px" }}>
                        13-12-2022 11:48:01 AM
                      </p>
                      <p style={{ marginTop: "-12px" }}>Call back</p>
                      <p style={{ marginBottom: "-12px", marginTop: "-12px" }}>
                        Consent Pending
                      </p>
                    </CardContent>
                  </Card>
                  <Card
                    style={{
                      backgroundColor: "#ffeaeb",
                      marginBottom: 2,
                      borderRadius: "3px",
                      border: "1px solid #eecacb",
                      boxShadow: "0 1px 4px 0.25px #eecacb",
                    }}
                  >
                    <CardContent>
                      <p style={{ marginBottom: "-12px", marginTop: "-12px" }}>
                        13-12-2022 11:48:01 AM
                      </p>
                      <p>Call back</p>
                      <p style={{ marginBottom: "-12px", marginTop: "-12px" }}>
                        Consent Pending
                      </p>
                    </CardContent>
                  </Card>
                </ListItem>
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
                  style={{ marginLeft: "40px" }}
                  control={<Checkbox />}
                  label="Old Category:"
                ></FormControlLabel>
                <b>INSTRUMENTATION ENGINEER</b>
                <FormControlLabel
                  style={{ marginLeft: "40px" }}
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
                      disabled={
                        candidateConsentVal === "RECEIVED" ? false : editStatus
                      }
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
                      disabled={
                        candidateConsentVal === "RECEIVED" ? false : editStatus
                      }
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
                      disabled={
                        candidateConsentVal === "RECEIVED" ? false : editStatus
                      }
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
                      disabled={
                        candidateConsentVal === "RECEIVED" ? false : editStatus
                      }
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
                      disabled={
                        candidateConsentVal === "RECEIVED" ? false : editStatus
                      }
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
                      disabled={
                        candidateConsentVal === "RECEIVED" ? false : editStatus
                      }
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
                      disabled={
                        candidateConsentVal === "RECEIVED" ? false : editStatus
                      }
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
                      disabled={
                        candidateConsentVal === "RECEIVED" ? false : editStatus
                      }
                      select
                      value={updateCandidateVerificationData.gender}
                      onSelect={(e) => {
                        setUpdateCandidateVerificationData({
                          ...updateCandidateVerificationData.gender,
                          gender: e.target.value,
                        });
                      }}
                      sx={{ ml: 3, width: "30ch" }}
                      size="small"
                      label="Gender"
                    >
                      {gender.map((option) => (
                        <MenuItem
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
                          key={option.value}
                          value={option.value}
                        >
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
                      <b style={{ color: "red", marginBottom: "10px" }}>
                        Industry
                      </b>

                      {inputFields.map((data, index) => {
                        const { fullName, emailAddress, salary } = data;
                        return (
                          <div className="row my-3" key={index}>
                            <div className="col">
                              <div className="form-group">
                                {/* {updateCandidateVerificationData.CandidateIndustry.flatMap((i,z)=>( */}
                                {updateCandidateVerificationData.CandidateIndustry !==
                                "" ? (
                                  updateCandidateVerificationData.CandidateIndustry.map(
                                    (item, i) => {
                                      return (
                                        <>
                                          <TextField
                                            disabled={
                                              candidateConsentVal === "RECEIVED"
                                                ? false
                                                : editStatus
                                            }
                                            size="small"
                                            sx={{
                                              width: "30ch",
                                              marginBottom: 3,
                                            }}
                                            select
                                            label="Industry"
                                            value={item.industryId}
                                            onChange={(e) => {
                                              handleChangeField(index, e);
                                              setUpdateCandidateVerificationData(
                                                (prevState) => ({
                                                  ...prevState,
                                                  industries: {
                                                    ...prevState.industries,
                                                    id: industryData.id,
                                                  },
                                                })
                                              );
                                              console.log(
                                                "industry obj",
                                                updateCandidateVerificationData.CandidateIndustry
                                              );
                                            }}
                                            InputProps={
                                              inputFields.length !== 1
                                                ? {
                                                    endAdornment: (
                                                      <InputAdornment>
                                                        <IconButton>
                                                          <Close
                                                            onClick={
                                                              removeInputFields
                                                            }
                                                          />
                                                        </IconButton>
                                                      </InputAdornment>
                                                    ),
                                                  }
                                                : ""
                                            }
                                          >
                                            {Object.keys(industryData).map(
                                              (option) => (
                                                <MenuItem
                                                  value={
                                                    industryData[option].id
                                                  }
                                                >
                                                  {industryData[option].title}
                                                </MenuItem>
                                              )
                                            )}
                                          </TextField>
                                        </>
                                      );
                                    }
                                  )
                                ) : (
                                  <TextField
                                    disabled={
                                      candidateConsentVal === "RECEIVED"
                                        ? false
                                        : editStatus
                                    }
                                    size="small"
                                    sx={{ width: "30ch", marginBottom: 3 }}
                                    select
                                    label="Industry"
                                    value={""}
                                    onChange={(e) => {
                                      handleChangeField(index, e);
                                      setUpdateCandidateVerificationData(
                                        (prevState) => ({
                                          ...prevState,
                                          industries: {
                                            ...prevState.industries,
                                            title: e.target.value,
                                          },
                                        })
                                      );
                                      console.log(
                                        "industry obj",
                                        updateCandidateVerificationData.industries
                                      );
                                    }}
                                    InputProps={
                                      inputFields.length !== 1
                                        ? {
                                            endAdornment: (
                                              <InputAdornment>
                                                <IconButton>
                                                  <Close
                                                    onClick={removeInputFields}
                                                  />
                                                </IconButton>
                                              </InputAdornment>
                                            ),
                                          }
                                        : ""
                                    }
                                  >
                                    {Object.keys(industryData).map((option) => (
                                      <MenuItem value={industryData[option].id}>
                                        {industryData[option].title}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <Button
                        disabled={
                          candidateConsentVal === "RECEIVED"
                            ? false
                            : editStatus
                        }
                        size="small"
                        style={{
                          backgroundColor: "gray",
                          color: "white",
                          marginTop: "20px",
                        }}
                        onClick={addInputField}
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
                      <b style={{ color: "red", marginBottom: "10px" }}>
                        Category
                      </b>
                      {inputCategories.map((data, index) => {
                        return (
                          <div className="row my-3" key={index}>
                            <div className="col">
                              <div className="form-group">
                                {updateCandidateVerificationData.CandidateCategory !==
                                "" ? (
                                  updateCandidateVerificationData.CandidateCategory.map(
                                    (item, i) => {
                                      return (
                                        <>
                                          <TextField
                                            disabled={
                                              candidateConsentVal === "RECEIVED"
                                                ? false
                                                : editStatus
                                            }
                                            size="small"
                                            sx={{
                                              width: "30ch",
                                              marginBottom: 3,
                                            }}
                                            select
                                            label="Category"
                                            value={item.categoryId}
                                            onChange={(e) => {
                                              handleChangeFieldForCategory();
                                              setUpdateCandidateVerificationData(
                                                {
                                                  ...updateCandidateVerificationData,
                                                  category: e.target.value,
                                                }
                                              );
                                            }}
                                            InputProps={
                                              categoryData.length !== 1
                                                ? {
                                                    endAdornment: (
                                                      <InputAdornment>
                                                        <IconButton>
                                                          <Close
                                                            onClick={
                                                              removeInputFieldsForCategory
                                                            }
                                                          />
                                                        </IconButton>
                                                      </InputAdornment>
                                                    ),
                                                  }
                                                : ""
                                            }
                                          >
                                            {Object.keys(categoryData).map(
                                              (option) => (
                                                <MenuItem
                                                  value={
                                                    categoryData[option].id
                                                  }
                                                >
                                                  {categoryData[option].title}
                                                </MenuItem>
                                              )
                                            )}
                                          </TextField>
                                        </>
                                      );
                                    }
                                  )
                                ) : (
                                  <TextField
                                    disabled={
                                      candidateConsentVal === "RECEIVED"
                                        ? false
                                        : editStatus
                                    }
                                    size="small"
                                    sx={{ width: "30ch", marginBottom: 3 }}
                                    select
                                    label="Category"
                                    value={""}
                                    onChange={(e) => {
                                      handleChangeFieldForCategory();
                                      setUpdateCandidateVerificationData({
                                        ...updateCandidateVerificationData,
                                        category: e.target.value,
                                      });
                                    }}
                                    InputProps={
                                      categoryData.length !== 1
                                        ? {
                                            endAdornment: (
                                              <InputAdornment>
                                                <IconButton>
                                                  <Close
                                                    onClick={
                                                      removeInputFieldsForCategory
                                                    }
                                                  />
                                                </IconButton>
                                              </InputAdornment>
                                            ),
                                          }
                                        : ""
                                    }
                                  >
                                    {Object.keys(categoryData).map((option) => (
                                      <MenuItem value={categoryData[option].id}>
                                        {categoryData[option].title}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <Button
                        disabled={
                          candidateConsentVal === "RECEIVED"
                            ? false
                            : editStatus
                        }
                        size="small"
                        style={{
                          backgroundColor: "gray",
                          color: "white",
                          marginTop: "20px",
                        }}
                        onClick={addInputFieldForCategory}
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
                      control={
                        <Checkbox
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
                        />
                      }
                      label="Old Company:"
                    ></FormControlLabel>

                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
                        />
                      }
                      label="Old Designation:"
                    ></FormControlLabel>
                  </ListItem>

                  {inputEmployement.map((item, i) => {
                    return (
                      <div className="row my-3" key={i}>
                        <div className="col">
                          <div className="form-group"></div>
                          {updateCandidateVerificationData.CandidateWorkHistory !==
                          "" ? (
                            updateCandidateVerificationData.CandidateWorkHistory.map(
                              (item, i) => {
                                return (
                                  <>
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
                                        {inputEmployement.length !== 1 ? (
                                          <Close
                                            onClick={
                                              removeInputFieldsForEmployer
                                            }
                                          />
                                        ) : (
                                          ""
                                        )}
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              disabled={
                                                candidateConsentVal ===
                                                "RECEIVED"
                                                  ? false
                                                  : editStatus
                                              }
                                            />
                                          }
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
                                            disabled={
                                              candidateConsentVal === "RECEIVED"
                                                ? false
                                                : editStatus
                                            }
                                            size="small"
                                            key={i}
                                            sx={{ width: "30ch" }}
                                            label="Company Name"
                                            value={item.company}
                                            onChange={(e) => {
                                              setUpdateCandidateVerificationData(
                                                {
                                                  ...updateCandidateVerificationData,
                                                  verification: {
                                                    lastCompany: e.target.value,
                                                  },
                                                }
                                              );
                                            }}
                                          />
                                          <TextField
                                            disabled={
                                              candidateConsentVal === "RECEIVED"
                                                ? false
                                                : editStatus
                                            }
                                            size="small"
                                            sx={{ width: "30ch", ml: 2 }}
                                            select
                                            label="Industry"
                                            value={item.industryId}
                                            onChange={(e) => {
                                              setUpdateCandidateVerificationData(
                                                {
                                                  ...updateCandidateVerificationData.verification,
                                                  industry: e.target.value,
                                                }
                                              );
                                            }}
                                          >
                                            {Object.keys(industryData).map(
                                              (option) => (
                                                <MenuItem
                                                  value={
                                                    industryData[option].id
                                                  }
                                                >
                                                  {industryData[option].title}
                                                </MenuItem>
                                              )
                                            )}
                                          </TextField>
                                          <TextField
                                            disabled={
                                              candidateConsentVal === "RECEIVED"
                                                ? false
                                                : editStatus
                                            }
                                            size="small"
                                            sx={{ width: "30ch", ml: 2 }}
                                            select
                                            label="Category(Designation)"
                                            value={item.categoryId}
                                            onChange={(e) => {
                                              setUpdateCandidateVerificationData(
                                                {
                                                  ...updateCandidateVerificationData.verification,
                                                  designation: e.target.value,
                                                }
                                              );
                                            }}
                                          >
                                            {Object.keys(categoryData).map(
                                              (option) => (
                                                <MenuItem
                                                  value={
                                                    categoryData[option].id
                                                  }
                                                >
                                                  {categoryData[option].title}
                                                </MenuItem>
                                              )
                                            )}
                                          </TextField>
                                          <TextField
                                            disabled={
                                              candidateConsentVal === "RECEIVED"
                                                ? false
                                                : editStatus
                                            }
                                            size="small"
                                            sx={{ width: "10ch", ml: 2 }}
                                            // helperText="Start date"
                                            // select
                                            value={moment(
                                              item.startDate
                                            ).format("MM")}
                                            label="Start date(MM)"
                                          />
                                          <TextField
                                            size="small"
                                            sx={{ width: "20ch", ml: 2 }}
                                            // select
                                            value={moment(
                                              item.startDate
                                            ).format("YYYY")}
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
                                            disabled={
                                              candidateConsentVal === "RECEIVED"
                                                ? false
                                                : editStatus
                                            }
                                            size="small"
                                            sx={{ width: "10ch" }}
                                            // helperText="End date"
                                            // select
                                            value={moment(item.endDate).format(
                                              "MM"
                                            )}
                                            label="End date(MM)"
                                          />
                                          <TextField
                                            disabled={
                                              candidateConsentVal === "RECEIVED"
                                                ? false
                                                : editStatus
                                            }
                                            size="small"
                                            sx={{ width: "20ch", ml: 2 }}
                                            // select
                                            value={moment(item.endDate).format(
                                              "YYYY"
                                            )}
                                            label="YYYY"
                                          />
                                          <TextField
                                            disabled={
                                              candidateConsentVal === "RECEIVED"
                                                ? false
                                                : editStatus
                                            }
                                            size="small"
                                            sx={{ width: "40ch", ml: 2 }}
                                            multiline
                                            rows={2}
                                            label="Job Description"
                                          />
                                        </ListItem>
                                      </ListItem>
                                    </Card>
                                  </>
                                );
                              }
                            )
                          ) : (
                            <>
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
                                  {inputEmployement.length !== 1 ? (
                                    <Close
                                      onClick={removeInputFieldsForEmployer}
                                    />
                                  ) : (
                                    ""
                                  )}
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        disabled={
                                          candidateConsentVal === "RECEIVED"
                                            ? false
                                            : editStatus
                                        }
                                      />
                                    }
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
                                      disabled={
                                        candidateConsentVal === "RECEIVED"
                                          ? false
                                          : editStatus
                                      }
                                      size="small"
                                      key={i}
                                      sx={{ width: "30ch" }}
                                      label="Company Name"
                                      value={item.company}
                                      onChange={(e) => {
                                        setUpdateCandidateVerificationData({
                                          ...updateCandidateVerificationData,
                                          verification: {
                                            lastCompany: e.target.value,
                                          },
                                        });
                                      }}
                                    />
                                    <TextField
                                      disabled={
                                        candidateConsentVal === "RECEIVED"
                                          ? false
                                          : editStatus
                                      }
                                      size="small"
                                      sx={{ width: "30ch", ml: 2 }}
                                      select
                                      label="Industry"
                                      value={item.industryId}
                                      onChange={(e) => {
                                        setUpdateCandidateVerificationData({
                                          ...updateCandidateVerificationData.verification,
                                          industry: e.target.value,
                                        });
                                      }}
                                    >
                                      {Object.keys(industryData).map(
                                        (option) => (
                                          <MenuItem
                                            value={industryData[option].id}
                                          >
                                            {industryData[option].title}
                                          </MenuItem>
                                        )
                                      )}
                                    </TextField>
                                    <TextField
                                      disabled={
                                        candidateConsentVal === "RECEIVED"
                                          ? false
                                          : editStatus
                                      }
                                      size="small"
                                      sx={{ width: "30ch", ml: 2 }}
                                      select
                                      label="Category(Designation)"
                                      value={item.categoryId}
                                      onChange={(e) => {
                                        setUpdateCandidateVerificationData({
                                          ...updateCandidateVerificationData.verification,
                                          designation: e.target.value,
                                        });
                                      }}
                                    >
                                      {Object.keys(categoryData).map(
                                        (option) => (
                                          <MenuItem
                                            value={categoryData[option].id}
                                          >
                                            {categoryData[option].title}
                                          </MenuItem>
                                        )
                                      )}
                                    </TextField>
                                    <TextField
                                      disabled={
                                        candidateConsentVal === "RECEIVED"
                                          ? false
                                          : editStatus
                                      }
                                      size="small"
                                      sx={{ width: "12ch", ml: 2 }}
                                      // helperText="Start date"
                                      // select
                                      value={moment(item.startDate).format(
                                        "MM"
                                      )}
                                      label="Start date(MM)"
                                    />
                                    <TextField
                                      size="small"
                                      sx={{ width: "20ch", ml: 2 }}
                                      // select
                                      value={moment(item.startDate).format(
                                        "YYYY"
                                      )}
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
                                      disabled={
                                        candidateConsentVal === "RECEIVED"
                                          ? false
                                          : editStatus
                                      }
                                      size="small"
                                      sx={{ width: "12ch" }}
                                      // helperText="End date"
                                      // select
                                      value={moment(item.endDate).format("MM")}
                                      label="End date(MM)"
                                    />
                                    <TextField
                                      disabled={
                                        candidateConsentVal === "RECEIVED"
                                          ? false
                                          : editStatus
                                      }
                                      size="small"
                                      sx={{ width: "20ch", ml: 2 }}
                                      // select
                                      value={moment(item.endDate).format(
                                        "YYYY"
                                      )}
                                      label="YYYY"
                                    />
                                    <TextField
                                      disabled={
                                        candidateConsentVal === "RECEIVED"
                                          ? false
                                          : editStatus
                                      }
                                      size="small"
                                      sx={{ width: "40ch", ml: 2 }}
                                      multiline
                                      rows={2}
                                      label="Job Description"
                                    />
                                  </ListItem>
                                </ListItem>
                              </Card>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <ListItem>
                    <Button
                      onClick={addInputFieldForEmployer}
                      disabled={
                        candidateConsentVal === "RECEIVED" ? false : editStatus
                      }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                      control={
                        <Checkbox
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
                        />
                      }
                      label="Old Primary Language:"
                    ></FormControlLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
                        />
                      }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                        control={
                          <Checkbox
                            disabled={
                              candidateConsentVal === "RECEIVED"
                                ? false
                                : editStatus
                            }
                          />
                        }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                          disabled={
                            candidateConsentVal === "RECEIVED"
                              ? false
                              : editStatus
                          }
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
                        disabled={
                          candidateConsentVal === "RECEIVED"
                            ? false
                            : editStatus
                        }
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
                        disabled={
                          candidateConsentVal === "RECEIVED"
                            ? false
                            : editStatus
                        }
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
                        disabled={
                          candidateConsentVal === "RECEIVED"
                            ? false
                            : editStatus
                        }
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
                        disabled={
                          candidateConsentVal === "RECEIVED"
                            ? false
                            : editStatus
                        }
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
            {editStatus?(<AuditLog/>):""}
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
                          {...register5("agentNo")}
                          error={errors5.agentNo ? true : false}
                          helperText={errors5.agentNo?.message}
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
                          {...register5("fullName")}
                          error={errors5.fullName ? true : false}
                          helperText={errors5.fullName?.message}
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
                        <FormLabel
                          sx={{ mr: 3 }}
                          id="demo-row-radio-buttons-group-label"
                        >
                          Select
                        </FormLabel>
                        {/* <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        > */}
                        <FormControlLabel
                          control={<Radio />}
                          label="Female"
                          // value={agentMasterData.gender}
                          // onChange={(e) => {
                          //   setAgentMasterData({
                          //     ...agentMasterData,
                          //     gender: e.target.value,
                          //   });
                          // }}
                        />
                        <FormControlLabel
                          control={
                            <Radio
                              value={agentMasterData.gender}
                              onChange={(e) => {
                                setAgentMasterData({
                                  ...agentMasterData,
                                  gender: e.target.value,
                                });
                              }}
                            />
                          }
                          label="Male"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          label="Other"
                          // value={agentMasterData.gender}
                          // onChange={(e) => {
                          //   setAgentMasterData({
                          //     ...agentMasterData,
                          //     gender: e.target.value,
                          //   });
                          // }}
                        />
                        {/* </RadioGroup> */}
                      </List>
                      <List>
                        <TextField
                          id="filled-basic"
                          label="Email"
                          required
                          disabled={editStatus}
                          {...register5("email")}
                          error={errors5.email ? true : false}
                          helperText={errors5.email?.message}
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
                          {...register5("mobileNo")}
                          error={errors5.mobileNo ? true : false}
                          helperText={errors5.mobileNo?.message}
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
                          {...register5("currAddress")}
                          error={errors5.currAddress ? true : false}
                          helperText={errors5.currAddress?.message}
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
                          {...register5("currPin")}
                          error={errors5.currPin ? true : false}
                          helperText={errors5.currPin?.message}
                          value={agentMasterData.currZip}
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              currZip: e.target.value,
                            });
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                <IconButton>
                                  <Search onClick={searchAddByZipForAgent} />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          variant="filled"
                          sx={{ width: "30ch" }}
                        />
                        <TextField
                          id="filled-basic"
                          label="Current city"
                          required
                          value={agentMasterData.currCity}
                          {...register5("currCity")}
                          error={errors5.currCity ? true : false}
                          helperText={errors5.currCity?.message}
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
                          {...register5("currState")}
                          error={errors5.currState ? true : false}
                          helperText={errors5.currState?.message}
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
                          control={
                            <Checkbox
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSameAddressAgent(true);
                                } else {
                                  setSameAddressAgent(false);
                                }
                              }}
                            />
                          }
                          label="Same as current address"
                        />
                      </List>
                      <List>
                        <TextField
                          id="filled-basic"
                          disabled={sameAddressAgent}
                          label="Permanent Address"
                          value={
                            !sameAddressAgent
                              ? agentMasterData.permAddress
                              : agentMasterData.currAddress
                          }
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
                          type="name"
                          disabled={sameAddressAgent}
                          value={
                            !sameAddressAgent
                              ? agentMasterData.permZip
                              : agentMasterData.currZip
                          }
                          onChange={(e) => {
                            setAgentMasterData({
                              ...agentMasterData,
                              permZip: e.target.value,
                            });
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                <IconButton>
                                  <Search
                                    onClick={searchPermAddByZipForAgent}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          variant="filled"
                          sx={{ width: "30ch" }}
                        />
                        <TextField
                          id="filled-basic"
                          label="Permanent city"
                          disabled={sameAddressAgent}
                          value={
                            !sameAddressAgent
                              ? agentMasterData.permCity
                              : agentMasterData.currCity
                          }
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
                          disabled={sameAddressAgent}
                          value={
                            !sameAddressAgent
                              ? agentMasterData.permState
                              : agentMasterData.currState
                          }
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
                            onClick={handleSubmitAgentMstr(onSubmitAgentMstr)}
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
                    <List>{ProfessionalTab()}</List>
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
              {editStatus?(<AuditLog/>):""}
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
                  // mr: 20,
                  alignItems: "flex-start",
                }}
              >
                {!editStatus ? (
                  <>
                    <Button sx={{ color: "white", bgcolor: "brown", mr: 1 }}>
                      Save
                    </Button>
                    <Button sx={{ color: "black", bgcolor: "#f5f0e4" }}>
                      Exit
                    </Button>
                  </>
                ) : null}

                {/* {Object.keys(agentPricingTemplateData).map((item,i)=>( */}
                {/* <> */}
                <ul style={{ fontSize: "12px", marginTop: "-10px" }}>
                  <h2>Total:{agentPricingTemplateData.totalAmount}</h2>
                  <li>
                    Last modified by:{agentPricingTemplateData.ModifiedBy}
                  </li>
                  <li>
                    Last modified on:{agentPricingTemplateData.modifiedOn}
                  </li>
                  <li>Created by:{agentPricingTemplateData.CreatedBy}</li>
                  <li>Created on:{agentPricingTemplateData.createdOn}</li>
                </ul>
                {/* </> ))} */}
              </List>
              <Box
                sx={{ width: "100%", typography: "body1", ml: 3, mt: "-90px" }}
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
                    {...register6("agentTitle")}
                    error={errors6.agentTitle ? true : false}
                    helperText={errors6.agentTitle?.message}
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
                      control={
                        <Checkbox disabled={editStatus} defaultChecked />
                      }
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
                {!editStatus ? (
                  <List sx={{ mt: 4, mb: 4 }}>
                    <Button
                      onClick={handleSubmitAgentTmpt(onSubmitAgentTmpt)}
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
                  </List>
                ) : null}
              </Box>
              {editStatus?(<AuditLog/>):""}
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
                  {...register8("title")}
                  error={errors8.title ? true : false}
                  helperText={errors8.title?.message}
                  type="name"
                  variant="filled"
                  style={{ width: "130ch" }}
                  onChange={(e) => {
                    setCategoryData({ ...categoryData, title: e.target.value });
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
                    onClick={handleSubmitCategory(onSubmitCategory)}
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
                  <li>Last modified by:{categoryData.ModifiedBy}</li>
                  <li>Last modified on:{categoryData.modifiedOn}</li>
                  <li>Created by:{categoryData.CreatedBy}</li>
                  <li>Created On:{categoryData.createdOn}</li>
                </ul>
              </List>
            </div>
            {editStatus?(<AuditLog/>):""}
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
                  value={companyData.companyName}
                  {...register9("title")}
                  error={errors9.title ? true : false}
                  helperText={errors9.title?.message}
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
                  select
                  id="filled-basic"
                  label="Industry Name"
                  type="name"
                  value={companyData.industryId}
                  onChange={(e) => {
                    setCompanyData({
                      ...companyData,
                      industryId: e.target.value,
                    });
                  }}
                  variant="filled"
                  sx={{ width: "130ch" }}
                >
                  {Object.keys(industryForCompany).map((option) => (
                    <MenuItem
                      key={industryForCompany[option].title}
                      value={industryForCompany[option].id}
                    >
                      {industryForCompany[option].title}
                    </MenuItem>
                  ))}
                </TextField>
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
                    onClick={handleSubmitCompany(onSubmitCompany)}
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
            {editStatus?(<AuditLog/>):""}
          </>
        );
      case "customer":
          return (
            <>
              <Box sx={{ width: "100%", typography: "body1", ml: 17 }}>
                {/* <List> */}
                <p sx={{mb:4}}>Select Profile Image</p>
                <TextField type="file" sx={{mb:4}} onChange={(e)=>{
                  setImage(e.target.files[0])
                }}/>
                <Button onClick={()=>addCustomerProfileImg()}>upload</Button>
                <TextField
                    required
                    id="filled-basic"
                    label="Full Name"
                    value={customerData.fullName}
                    variant="filled"
                    onChange={(e) => {
                      setCustomerData({
                        ...customerData,
                        fullName: e.target.value,
                      });
                    }}
                    sx={{ width: "130ch",mb:4 }}
                  />
                  <TextField
                    required
                    id="filled-basic"
                    label="Company Name"
                    value={customerData.companyName}
                    variant="filled"
                    onChange={(e) => {
                      setCustomerData({
                        ...customerData,
                        companyName: e.target.value,
                      });
                    }}
                    sx={{ width: "130ch",mb:4}}
                  />
                  <TextField
                    required
                    id="filled-basic"
                    type="date"
                    label="BirthDate"
                    value={customerData.dob}
                    variant="filled"
                    onChange={(e) => {
                      setCustomerData({
                        ...customerData,
                        dob: e.target.value,
                      });
                    }}
                    sx={{ width: "130ch",mb:4 }}
                  />
                {/* </List> */}
                <TextField
                  select
                  id="filled-basic"
                  label="Gender"
                  value={customerData.gender}
                  onChange={(e) => {
                     setCustomerData({
                          ...customerData,
                          gender: e.target.value,
                        });
                  }}
                  variant="filled"
                  sx={{ width: "130ch", mb: 4 }}
                >
                  {gender.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                    required
                    id="filled-basic"
                    label="State"
                    value={customerData.state}
                    variant="filled"
                    onChange={(e) => {
                      setCustomerData({
                        ...customerData,
                        state: e.target.value,
                      });
                    }}
                    sx={{ width: "130ch",mb:4 }}
                  />
                  <TextField
                  disabled
                    required
                    id="filled-basic"
                    label="Country"
                    value={customerData.country}
                    variant="filled"
                    onChange={(e) => {
                      setCustomerData({
                        ...customerData,
                        country: e.target.value,
                      });
                    }}
                    sx={{ width: "130ch",mb:4 }}
                  />
                <List>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Is Active"
                      value={customerData.isActive}
                      onChange={(e) => {
                        setCustomerData({
                          ...customerData,
                          isActive: e.target.checked,
                        });
                      }}
                    />
                  </FormGroup>
                </List>
                <List>
                  {editStatus === false ? (
                    <Button
                      onClick={()=>addAPICalls("customer")}
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
                        updateAPICalls("customer");
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
              {editStatus?(<AuditLog/>):""}
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
                  {...register10("title")}
                  error={errors10.title ? true : false}
                  helperText={errors10.title?.message}
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
                    onClick={handleSubmitIndustry(onSubmitIndustry)}
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
            {editStatus?(<AuditLog/>):""}
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
                  {...register11("rName")}
                  error={errors11.rName ? true : false}
                  helperText={errors11.rName?.message}
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
                {list.map((item, index) => (
                  <>
                    <List style={{ display: "flex", flexDirection: "column" }}>
                      <p style={{ color: "brown" }}>
                        {/* {console.log(item)} */}
                        {item.group}
                      </p>
                      <FormGroup
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        {item.items.map((i, s) => (
                          <>
                            <FormControlLabel
                              style={{ display: "flex" }}
                              control={
                                <Checkbox
                                  // checked={uroleData.permissions?true:false}
                                  value={roleData.permissionId}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      console.log("permissions[item].id", i.id);
                                      checkedp.push(i.id);
                                      console.log(checkedp);
                                      setRoleData({
                                        ...roleData,
                                        permissionId: checkedp,
                                      });
                                    } else {
                                      roleData.permissionId.splice(
                                        checkedp.indexOf(e.target.value),
                                        1
                                      );
                                    }
                                  }}
                                />
                              }
                              label={i.displayName}
                            ></FormControlLabel>
                          </>
                        ))}
                      </FormGroup>
                    </List>
                  </>
                ))}
              </List>
              <List>
                {!editStatus ? (
                  <Button
                    onClick={handleSubmitRole(onSubmitRole)}
                    style={{ backgroundColor: "brown", color: "white" }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => updateAPICalls("role")}
                    style={{ backgroundColor: "brown", color: "white" }}
                  >
                    Update
                  </Button>
                )}
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
            {editStatus?(<AuditLog/>):""}
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
                  {...register12("title")}
                  error={errors12.title ? true : false}
                  helperText={errors12.title?.message}
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
                    onClick={handleSubmitSkill(onSubmitSkillset)}
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
            {editStatus?(<AuditLog/>):""}
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
                    {...register13("title")}
                    error={errors13.title ? true : false}
                    helperText={errors13.title?.message}
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
                      onClick={handleSubmitSubscritpion(onSubmitSubscription)}
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
            {editStatus?(<AuditLog/>):""}
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
                  {...registerUser("fullName")}
                  error={errorsUsers.fullName ? true : false}
                  helperText={errorsUsers.fullName?.message}
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
                  {...registerUser("email")}
                  error={errorsUsers.email ? true : false}
                  helperText={errorsUsers.email?.message}
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
                  {...registerUser("mobileNo")}
                  error={errorsUsers.mobileNo ? true : false}
                  helperText={errorsUsers.mobileNo?.message}
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
                  {...registerUser("role")}
                  error={errorsUsers.role ? true : false}
                  helperText={errorsUsers.role?.message}
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
                  {Object.keys(roleForUser).map((option) => (
                    <MenuItem
                      key={roleForUser[option].name}
                      value={roleForUser[option].id}
                    >
                      {roleForUser[option].name}
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
                  {...registerUser("currAddress")}
                  error={errorsUsers.currAddress ? true : false}
                  helperText={errorsUsers.currAddress?.message}
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
                  {...registerUser("currPin")}
                  error={errorsUsers.currPin ? true : false}
                  helperText={errorsUsers.currPin?.message}
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <Search onClick={searchCurrAddByZipForUser} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: "40ch" }}
                />
                <TextField
                  id="filled-basic"
                  label="Current city"
                  variant="filled"
                  {...registerUser("currCity")}
                  error={errorsUsers.currCity ? true : false}
                  helperText={errorsUsers.currCity?.message}
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
                  {...registerUser("currState")}
                  error={errorsUsers.currState ? true : false}
                  helperText={errorsUsers.currState?.message}
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
                    control={
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSameAddress(true);
                          } else {
                            setSameAddress(false);
                          }
                        }}
                      />
                    }
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
                  disabled={sameAddress}
                  value={
                    sameAddress ? userData.currAddress : permCurrUserAddss()
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
                  disabled={sameAddress}
                  value={sameAddress ? userData.currZip : permCurrUserZip()}
                  onChange={(e) => {
                    !editStatus
                      ? setUserData({ ...userData, permZip: e.target.value })
                      : setUpdateUserData({
                          ...updateUserData,
                          permZip: e.target.value,
                        });
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <Search onClick={searchAddByZipForUser} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="filled"
                  sx={{ width: "40ch" }}
                />
                <TextField
                  id="filled-basic"
                  label="Permanent city"
                  variant="filled"
                  disabled={sameAddress}
                  value={sameAddress ? userData.currCity : permCurrUserCity()}
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
                  disabled={sameAddress}
                  value={sameAddress ? userData.currState : permCurrUserState()}
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
                    onClick={handleSubmitUsers(onSubmitUser)}
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
            {editStatus?(<AuditLog/>):""}
          </>
        );
      default:
        break;
    }
  };

  //Common Modal For evey Module
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
            {/* <Button sx={{ ml: 155, color: "white" }}>Save</Button> */}
          </Box>
          <DialogContent>{handleModalInput()}</DialogContent>
        </Dialog>
      </div>
    );
    return commonModal;
  };

  //Approve And Deny Modal For Admin Cadidate upload Batch module
  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };
  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  //read data from excel file and add into the state
  const handleFileUploadAdminCnd = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      setBulkData(sheetData);
      // console.log("sheet data : ",sheetData);
    };

    reader.readAsBinaryString(file);
    // console.log("ex data --- ",bulkData);
  };

  //Complete Table Design for every module
  const handleTableDesign = () => {
    const handleModalsInputs = (
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-end",
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
        <Typography
          sx={{ flex: "1 1 100%", display: "flex", flexDirection: "column" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <h2>{pageTitle}</h2>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              open={openErrMsg}
              autoHideDuration={6000}
              onClose={() => setOpenErrtMsg(false)}
            >
              <Alert
                onClose={() => setOpenErrtMsg(false)}
                severity="warning"
                sx={{
                  width: "100%",
                  backgroundColor: "brown",
                  color: "yellow",
                }}
              >
                {errMsg}
              </Alert>
            </Snackbar>
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
        <Typography sx={{ mb: "20px" }}>{handleButtons()}</Typography>

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
                      required
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      onChange={(e) => {
                        setUploadBulkData(e.target.files[0]);
                        handleFileUploadAdminCnd(e);
                      }}
                      accept=".xlsx"
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
                  <TextField
                    select
                    value={candidateUploadBatchAdminData.templateName}
                    onChange={(e) => {
                      setCandidateUploadBatchAdminData({
                        ...candidateUploadBatchAdminData,
                        id: e.target.value,
                      });
                    }}
                    label="New pricing template"
                    // value={candidateUploadBatchAdminData.id}
                    required
                    style={{ width: "50ch" }}
                  >
                    {Object.keys(cndUpdBatchAdmin).map((item, x) => (
                      <MenuItem key={x} value={cndUpdBatchAdmin[item].id}>
                        {cndUpdBatchAdmin[item].templateName}
                      </MenuItem>
                    ))}
                  </TextField>
                </List>
                <tr>
                  <p>*indicates required field</p>
                </tr>
              </DialogContent>
              {editStatus?(<AuditLog/>):""}
            </>
          )}
          <DialogActions>
            <Button onClick={handleCloseAdminCanUplBtch}>Close</Button>
            <Button
              onClick={() => {
                {
                  editStatus
                    ? updateAPICalls("candidate-upload-batch-admin")
                    : addAdminCndUpl();
                }
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
                  <TextField
                    select
                    fullWidth
                    value={batchNo.batchId}
                    {...register7("batchNum")}
                    error={errors7.batchNum ? true : false}
                    helperText={errors7.batchNum?.message}
                    variant="outlined"
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
                  </TextField>
                </List>
                <List>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Assigned To
                  </InputLabel>
                  <TextField
                    select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    // multiple
                    fullWidth
                    value={createBatchPriorityData.id}
                    variant="outlined"
                    {...register7("assignedTo")}
                    error={errors7.assignedTo ? true : false}
                    helperText={errors7.assignedTo?.message}
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
                  </TextField>
                </List>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAddBtchprty}>Close</Button>
                <Button onClick={handleSubmitBatchPrty(onSubmitBatchPrty)}>
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
        {/* dialog for the confirmation page for the admin candidate upload batch module */}
        <div>
          <Dialog
            open={openApproval ? openConfirmation : false}
            onClose={handleCloseConfirmation}
            maxWidth="lg"
          >
            <DialogTitle sx={{ mr: 30 }}>
              Confirmation - Batch no - {confirmationData.id}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to approve?
              </DialogContentText>
              {/* <ListItem> */}
              {/* {console.log("confirm data",confirmationData)} */}
              <b>Batch Details</b>
              {/* </ListItem> */}
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "40px",
                  fontSize: "14px",
                  maxWidth: 845,
                  bgcolor: "#e6fbf0",
                  border: "1px solid #b5ddc8",
                  boxShadow: "0 1px 4px 0.25px #b5ddc8",
                }}
              >
                <p>Owner:</p>
                <b>{confirmationData.createdBy}</b>
              </Card>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "40px",
                  fontSize: "14px",
                  maxWidth: 845,
                  bgcolor: "#ffeee9",
                  border: "1px solid #e3c5c5",
                  boxShadow: "0 1px 4px 0.25px #e3c5c5",
                }}
              >
                <p>Role:</p>
                <b>{confirmationData.role}</b>
              </Card>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "40px",
                  fontSize: "14px",
                  maxWidth: 845,
                  bgcolor: "#e6fbf0",
                  border: "1px solid #b5ddc8",
                  boxShadow: "0 1px 4px 0.25px #b5ddc8",
                }}
              >
                <p>Pricing Template:</p>
                {openApproval
                  ? Object.keys(confirmationData).map(
                      (item, i) => (
                        console.log(
                          "test temp",
                          confirmationData[item].templateName
                        ),
                        (
                          <>
                            <b>{confirmationData[item].templateName}</b>
                          </>
                        )
                      )
                    )
                  : null}
              </Card>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "40px",
                  fontSize: "14px",
                  maxWidth: 845,
                  bgcolor: "#ffeee9",
                  border: "1px solid #e3c5c5",
                  boxShadow: "0 1px 4px 0.25px #e3c5c5",
                }}
              >
                <p>Count:</p>
                <b>{confirmationData.count}</b>
              </Card>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "40px",
                  fontSize: "14px",
                  maxWidth: 845,
                  bgcolor: "#e6fbf0",
                  border: "1px solid #b5ddc8",
                  boxShadow: "0 1px 4px 0.25px #b5ddc8",
                }}
              >
                <p>Approved:</p>
                <b>{confirmationData.approvedCount}</b>
              </Card>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "40px",
                  fontSize: "14px",
                  maxWidth: 845,
                  bgcolor: "#ffeee9",
                  border: "1px solid #e3c5c5",
                  boxShadow: "0 1px 4px 0.25px #e3c5c5",
                }}
              >
                <p>Rejected:</p>
                <b>{confirmationData.rejectedCount}</b>
              </Card>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmation}>No</Button>
              <Button
                onClick={() => addAPICalls("candidate-upload-batch-admin")}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
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

  //State and Method Container to export
  const StateContainer = {
    order,
    orderBy,
    selected,
    page,
    tblData,
    setTblData,
    rowsPerPage,
    handleCloseConfirmation,
    handleOpenConfirmation,
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
    getCandidateMsaterAPIcallById,
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
    loginHistory,
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
    getCandidateVerificationPassiveUpdate,
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
    setUpdateCandidateMasterData,
    getAgentMasteById,
    getCategoryById,
    getCompanyAPIcallById,
    getIndustryById,
    getRoleByIdAPIcall,
    getSkillSetById,
    getSubscriptionByIdAPIcall,
    getUserAPIcallById,
    filterTableOnTabs,
    setConfirmationData,
    confirmationData,
    setOpenApproval,
    handleUpdateAuditData,
    handleUpdateAuditDataAgentM,
    handleUpdateAuditDataAgentPricing,
    handleUpdateAuditDataCandidateVerification,
    handleUpdateAuditDataOtherMCategory,
    handleUpdateAuditDataOtherMCompany,
    handleUpdateAuditDataOtherMIndustry,
    handleUpdateAuditDataOtherMRole,
    handleUpdateAuditDataOtherMSkillSet,
    handleUpdateAuditDataOtherMSubscription,
    handleUpdateAuditDataOtherMUser,
    getCustomerById
  };

  return StateContainer;
};

export default ContentLogic;
