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
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import CandidateMasterLogic from "../../Container/Drawer/Candidate Master/CandidateMasterLogic";
import CandidateUploadBatch from "../../Container/Drawer/Candidate Upload Batch/CandidateUploadBatch";
import CandidateVerification from "../../Container/Drawer/Candidate Verification/CandidateVerification";
import AdminCanUploadBatch from "../../Container/Drawer/Admin-Candidate Upload Batch/AdminCanUploadBatch";
import BatchPriority from "../../Container/Drawer/Batch Priority/BatchPriority";
import OtherIndCategory from "../../Container/Drawer/Other Industry Category/OtherIndCategory";

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

  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const [candidateMaster, setCandidateMaster] = useState();
    const [values, setValues] = useState({
      amount: "",
      password: "",
      weight: "",
      weightRange: "",
      showPassword: false,
    });

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
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
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <div>
                  <ListItem>
                    <TextField
                      id="filled-basic"
                      label="Full Name"
                      variant="filled"
                      sx={{ width: "50ch" }}
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

                  <ListItem>
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
                  <TextField
                    label="With normal TextField"
                    id="filled-start-adornment"
                    sx={{ m: 1, width: "25ch" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">kg</InputAdornment>
                      ),
                    }}
                    variant="filled"
                  />
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
                    <FilledInput
                      id="filled-adornment-weight"
                      value={values.weight}
                      onChange={handleChange("weight")}
                      endAdornment={
                        <InputAdornment position="end">kg</InputAdornment>
                      }
                      aria-describedby="filled-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                    <FormHelperText id="filled-weight-helper-text">
                      Weight
                    </FormHelperText>
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">
                      Password
                    </InputLabel>
                    <FilledInput
                      id="filled-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">
                      Amount
                    </InputLabel>
                    <FilledInput
                      id="filled-adornment-amount"
                      value={values.amount}
                      onChange={handleChange("amount")}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div>
                  <TextField
                    label="With normal TextField"
                    id="standard-start-adornment"
                    sx={{ m: 1, width: "25ch" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">kg</InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, mt: 3, width: "25ch" }}
                  >
                    <Input
                      id="standard-adornment-weight"
                      value={values.weight}
                      onChange={handleChange("weight")}
                      endAdornment={
                        <InputAdornment position="end">kg</InputAdornment>
                      }
                      aria-describedby="standard-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                    <FormHelperText id="standard-weight-helper-text">
                      Weight
                    </FormHelperText>
                  </FormControl>
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      id="standard-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">
                      Amount
                    </InputLabel>
                    <Input
                      id="standard-adornment-amount"
                      value={values.amount}
                      onChange={handleChange("amount")}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              </Box>
            </>
          );

          break;

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
          <List style={{ marginLeft: "100px" }}>
            {handlerModuleInputs()}
            <ListItem>
              <Button
                style={{
                  backgroundColor: "brown",
                  color: "white",
                  margin: "10px",
                }}
              >
                Save
              </Button>
              <Button style={{ backgroundColor: "black", color: "white" }}>
                Cancel
              </Button>
            </ListItem>
          </List>
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
