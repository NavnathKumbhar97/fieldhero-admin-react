import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function CandidateMasterLogic() {

  return (
    <div style={{background:'aliceblue',marginRight:'-80px',marginTop:'-20px',marginBottom:'35px'}} >
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch',mb:2},
      }}
    >
      <TextField size='small' id="outlined-basic" label="Full Name" variant="outlined" />
      <TextField size='small' id="outlined-basic" label="Contact No" variant="outlined" />
      <TextField size='small' id="outlined-basic" label="Id" variant="outlined" />
      <TextField size='small' id="outlined-basic" label="Status" variant="outlined" />
      <TextField select size='small' id="outlined-basic" label="Skill" variant="outlined" />
      <TextField select size='small' id="outlined-basic" label="Industry" variant="outlined" />
      <TextField select size='small' id="outlined-basic" label="Category" variant="outlined" />
      <Button
            style={{
             marginLeft:'1100px',
              backgroundColor: "brown",
              color: "white",
              width:'90px',
              marginTop:'-70px',
            }}
            variant="outlined"
            href="#outlined-buttons"
          >
            <FilterAltIcon />
            Filter
          </Button>
    </Box>
    <Outlet></Outlet>
    </div>
  );
}

export default CandidateMasterLogic;
