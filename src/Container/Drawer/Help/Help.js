import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";

export default function Help() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>What if batch is assigned to user?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            When batch is assigned to user, only that user will assign candidate
            from that batch for verification. Even if other staff is available
            they won't assign candidate from this batch for verification.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>
            What if batch is assigned to user but there are no more new
            candidate available for verification?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            User will be assign candidate from non prioritized batch for
            verification.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
