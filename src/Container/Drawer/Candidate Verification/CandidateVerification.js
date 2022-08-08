import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

function CandidateVerification() {
  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        display="flex"
        alignItems="start"
        justifyContent="start"
      >
        <Box
          style={{
            backgroundColor: "#faf2e8",
            width: "280px",
            marginBottom: "20px",
          }}
        >
          <p style={{ marginLeft: "30px" }}>Total Pending Batches</p>
          <CircularProgress
            style={{ marginLeft: "60px" }}
            variant="determinate"
            size={150}
            thickness={4.2}
            value={100}
          />
        </Box>
        <Box
          style={{
            backgroundColor: "#faf2e8",
            width: "280px",
            marginBottom: "20px",
          }}
        >
          <p style={{ marginLeft: "30px" }}>Total Pending Candidates</p>
          <CircularProgress
            style={{ marginLeft: "60px" }}
            variant="determinate"
            size={150}
            thickness={4.2}
            value={100}
          />
        </Box>
        <Box
          style={{
            backgroundColor: "#faf2e8",
            width: "280px",
            marginBottom: "20px",
          }}
        >
          <p style={{ marginLeft: "30px" }}>Your Assigned Candidates</p>
          <CircularProgress
            style={{ marginLeft: "60px" }}
            variant="determinate"
            size={150}
            thickness={4.2}
            value={100}
            color="warning"
          />
        </Box>
      </Stack>
    </>
  );
}

export default CandidateVerification;
