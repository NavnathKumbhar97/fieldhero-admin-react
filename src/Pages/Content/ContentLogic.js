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
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FilledInput from "@mui/material/FilledInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormLabel,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stepper,
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
import styles from "./content.css";
import WorkExperiance from "../../Container/Drawer/Candidate Master/Work Experiance Modal/WorkExperiance";
const ContentLogic = (props) => {
  // const {data} = props
  // console.log(data);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageTitle, setPageTitle] = useState();
  const [buttonText, setButtonText] = useState();
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
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "Id",
    },
    {
      id: "agentNo",
      numeric: false,
      disablePadding: true,
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
      id: "categoryName",
      numeric: false,
      disablePadding: true,
      label: "Category Name",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
  ];
  const companyMaster = [
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
      id: "roleName",
      numeric: false,
      disablePadding: false,
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
      id: "subscriptionName",
      numeric: false,
      disablePadding: false,
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
      id: "fullName",
      numeric: false,
      disablePadding: false,
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
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
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
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
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

  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [openChildModal, setOpenChilModal] = useState(false);

    const handleClickOpenChildModal = () => {
      setOpenChilModal(true);
    };

    const handleCloseChildModal = () => {
      setOpenChilModal(false);
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

    const handleClickOpen = () => {
      setOpenModal(true);
    };

    const handleClose = () => {
      setOpenModal(false);
    };

    const handleButtons = () => {
      switch (pageTitle) {
        case "Candidate Master":
          return (
            <>
              {numSelected === 1 ? (
                <Button
                  style={{ marginTop: "80px", marginRight: "50px" }}
                  variant="outlined"
                  href="#outlined-buttons"
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
                  href="#outlined-buttons"
                >
                  <AddIcon />
                  {buttonText}
                </Button>
              )}
            </>
          );
        case "Candidate Upload Batch":
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
                href="#outlined-buttons"
              >
                <FileUploadIcon />
                {buttonText}
              </Button>
            </>
          );

        case "Candidate Verification":
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
                href="#outlined-buttons"
              >
                <AddIcon />
                {buttonText}
              </Button>
            </>
          );

        case "Agent Master":
          return (
            <>
              {numSelected === 1 ? (
                <Button
                  style={{ marginTop: "80px", marginRight: "50px" }}
                  variant="outlined"
                  href="#outlined-buttons"
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
                  href="#outlined-buttons"
                >
                  <AddIcon />
                  {buttonText}
                </Button>
              )}
            </>
          );
        case "Agent Pricing Template":
          return (
            <>
              {numSelected === 1 ? (
                <Button
                  style={{ marginTop: "80px", marginRight: "50px" }}
                  variant="outlined"
                  href="#outlined-buttons"
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
                  href="#outlined-buttons"
                >
                  <AddIcon />
                  {buttonText}
                </Button>
              )}
            </>
          );

        case "Admin - Candidate Upload Batch":
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
                href="#outlined-buttons"
              >
                <FileUploadIcon />
                {buttonText}
              </Button>
            </>
          );

        case "Batch Priority":
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
                href="#outlined-buttons"
              >
                <AddIcon />
                {buttonText}
              </Button>
            </>
          );
        case "Other Industry Category":
          return null;

        case "Customer - Master":
          return null;

        default:
          return (
            <>
              {numSelected === 1 ? (
                <Button
                  style={{ marginTop: "80px", marginRight: "50px" }}
                  variant="outlined"
                  href="#outlined-buttons"
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
                  href="#outlined-buttons"
                >
                  <AddIcon />
                  {buttonText}
                </Button>
              )}
            </>
          );
      }
    };

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
                              sx={{ width: "69ch" }}
                            />
                          </ListItem>
                          <ListItem>
                            <TextField
                              id="filled-basic"
                              label="Birthdate"
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
                  ) : (
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
                          <WorkExperiance/>
                          </ListItem>
                        </div>
                      </Box>
                    </List>
                  )}
                </Typography>
              </Box>
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
                      sx={{ width: "30ch", ml: 4 }}
                      variant="filled"
                    />
                    <TextField
                      id="date"
                      label="End Date"
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
            sx={{ flex: "1 1 100%" }}
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
        <Dialog
          style={{ marginTop: "-70px" }}
          className={classes.root}
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
            Add New
            <Button sx={{ ml: 155, color: "white" }}>Save</Button>
          </Box>

          {handlerModuleInputs()}
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const StateContainer = {
    order,
    orderBy,
    selected,
    page,
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
  };

  return StateContainer;
};

export default ContentLogic;
