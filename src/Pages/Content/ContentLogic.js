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
import {
  Button,
  Dialog,
  Divider,
  Input,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const ContentLogic = (props) => {
  // const {data} = props
  // console.log(data);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageTitle,setPageTitle] = useState();
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

    const handleClickOpen = () => {
      setOpenModal(true);
    };

    const handleClose = () => {
      setOpenModal(false);
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

            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              style={{
                marginLeft: "70px",
                width: "700px",
                marginBottom: "20px",
              }}
            ></TextField>
          </Typography>
        )}

        {numSelected > 0 ? (
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
              marginRight: "50px",
              backgroundColor: "brown",
              color: "white",
            }}
            variant="outlined"
            href="#outlined-buttons"
          >
            <AddIcon />
            New
          </Button>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
        <Dialog
          className={classes.root}
          fullScreen="true"
          open={openModal}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <Box>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon style={{ marginLeft: "10px", fontSize: "35px" }} />
            </IconButton>
            Add New
          </Box>
          <List style={{ marginLeft: "100px" }}>
            <ListItem>
              <TextField
                style={{ width: "700px" }}
                id="filled-basic"
                label="Title"
                variant="filled"
              />
            </ListItem>
            {/* <Divider /> */}
            <ListItem>
              <TextField
                style={{ width: "700px" }}
                id="filled-basic"
                label="Description"
                variant="filled"
              />
            </ListItem>
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
    canMasterTblHerader,
    candUploadBatch,
    canVerification,
    agentMaster,
    agentPricingTemplate,
    adminCanUploadBatch,

  };

  return StateContainer;
};

export default ContentLogic;
