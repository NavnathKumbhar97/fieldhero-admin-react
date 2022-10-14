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
            backgroundColor: "#f4f3ef",
            width: "280px",
            marginBottom: "20px",
          }}
        >
          <p style={{ marginLeft: "30px" }}>Total Pending Batches</p>
          <h1
            style={{
              color: "#1976d2",
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
              position: "absolute",
              marginLeft: "100px",
              marginTop: "40px",
            }}
          >
            102
          </h1>

          <CircularProgress
            style={{ marginLeft: "60px" }}
            variant="determinate"
            size={150}
            thickness={3}
            value={100}
          />
        </Box>
        <Box
          style={{
            backgroundColor: "#f4f3ef",
            width: "280px",
            marginBottom: "20px",
          }}
        >
          <p style={{ marginLeft: "30px" }}>Total Pending Candidates</p>
          <h1
            style={{
              color: "#1976d2",
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
              position: "absolute",
              marginLeft: "100px",
              marginTop: "40px",
            }}
          >
            1.2k
          </h1>

          <CircularProgress
            style={{ marginLeft: "60px" }}
            variant="determinate"
            size={150}
            thickness={3}
            value={100}
          />
        </Box>
        <Box
          style={{
            backgroundColor: "#f4f3ef",
            width: "280px",
            marginBottom: "20px",
          }}
        >
          <p style={{ marginLeft: "30px" }}>Your Assigned Candidates</p>
          <h1
            style={{
              color: "#ed6c02",
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
              position: "absolute",
              marginLeft: "100px",
              marginTop: "40px",
            }}
          >
            102
          </h1>

          <CircularProgress
            style={{ marginLeft: "60px" }}
            variant="determinate"
            size={150}
            thickness={3}
            value={100}
            color="warning"
          />
        </Box>
      </Stack>
    </>
  );
}

export default CandidateVerification;
