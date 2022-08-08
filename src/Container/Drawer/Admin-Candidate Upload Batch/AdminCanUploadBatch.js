import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function AdminCanUploadBatch() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper',mb:2,mt:6 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        style={{border:'1px solid gray',borderRadius:'10px'}}
        aria-label="scrollable prevent tabs example"
      >
        <Tab label="IN-PROGRESS" />
        <Tab label="PENDING APPROVAL" />
        <Tab label="PROCESSED" />
      </Tabs>
    </Box>
  );
}

export default AdminCanUploadBatch;
