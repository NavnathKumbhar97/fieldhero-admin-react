import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

function OtherIndCategory() {
  return (
    <>
    <Box component='div' sx={{ display: 'flex',flex:'0',fontSize:'15px',marginTop:'-30px',mb:2 }}>
        CATEGORY:<b style={{marginRight:'20px'}}>100</b>
        INDUSTRY:<b style={{marginRight:'20px'}}>22</b>
        WH_CATEGORY:<b style={{marginRight:'20px'}}>116</b>
        WH_INDUSTRY:<b>1</b>
        </Box>
    <Box style={{}}>
    <Box
      component="form"
      style={{backgroundColor:'#e6fbf0',marginBottom:'20px',border:'1px solid #b5ddc8',boxShadow: "0 1px 4px 0.25px #b5ddc8"}}
      sx={{
        '& > :not(style)': { m: 1, width: '25ch',mb:2,bgcolor:'#e6fbf0' },
      }}
      noValidate
      autoComplete="off"
    >
        <Box component='div' sx={{ display: 'flex',flex:'0',fontSize:'15px' }}>
        Title:<b style={{marginRight:'20px'}}>Packing</b>
        Type:<b style={{marginRight:'20px'}}>Category</b>
        BatchNo:<b style={{marginRight:'20px'}}>116</b>
        Count:<b>1</b>
        </Box>
      <TextField select id="outlined-basic" label="Choose" variant="outlined" />
      <TextField id="outlined-basic" label="Title" variant="outlined" />
      <TextField id="outlined-basic" label="Description" variant="outlined" />
      {/* <VisibilityIcon/> */}
      <Button style={{background:'brown',color:'white',width:'10px',marginTop:"15px"}}>Save</Button>
    </Box>
    </Box>
    </>
  );
}

export default OtherIndCategory;
