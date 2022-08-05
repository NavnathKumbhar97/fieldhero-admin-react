import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";

const TheContent = () => {
  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Grid
        sx={{ width: "100%" }}
        style={{ backgroundColor: "white", borderRadius: "5px" }}
        item
        md={6}
        xs={12}
      >
        <Box m={1} display="flex" alignItems="center" flexDirection="column">
          <Box alignSelf="start">
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              <h2>Dashboard</h2>
            </Typography>
          </Box>
          <Box mb={2} alignSelf="end" marginRight="70px"></Box>
        </Box>
      </Grid>

    </>
  );
};

export default TheContent;
