import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import generalHandlers from "../../../handlers/generalHandlers";

function CandidateVerification() {

  const [cndVrfnDashboard,setCndVrfnDashboard] = React.useState()

  const getcandidateVerificationDash = (id) => {
    let authTok = localStorage.getItem("user"); // string
    let convertTokenToObj = JSON.parse(authTok);
    // setLoader(true);
    generalHandlers
      .dataGet(`/v1/candidate-verifications/dashboard`, {
        headers: { Authorization: `Bearer ${convertTokenToObj.token}` },
      })
      .then((response) => {
        if (response.status == 200) {
          setCndVrfnDashboard(response.data.data.count)
          console.log("cndVrfnDashboard",cndVrfnDashboard.batch);
          console.log("candidate verification dash", response.data.dat.count);
        } else if (response.status == 400) {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!- getcandidateVerificationDash", error);
      });
  };
  React.useEffect(() => {
    getcandidateVerificationDash()
  }, []);


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
            backgroundColor: "#79cbca",
            // backgroundColor: "#f4f3ef",
            width: "280px",
            marginBottom: "20px",
            borderRadius:'25px'
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
            {cndVrfnDashboard?cndVrfnDashboard.batch:""}
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
            backgroundColor: "#79cbca",
            width: "280px",
            marginBottom: "20px",borderRadius:'25px'
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
              marginLeft: "90px",
              marginTop: "40px",
            }}
          >
            {cndVrfnDashboard?cndVrfnDashboard.candidate:''}
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
            backgroundColor: "#79cbca",
            width: "280px",
            marginBottom: "20px",borderRadius:'25px'
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
              marginLeft: "110px",
              marginTop: "40px",
            }}
          >
            {cndVrfnDashboard?cndVrfnDashboard.assignedCandidate:''}
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
