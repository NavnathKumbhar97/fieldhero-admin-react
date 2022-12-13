import {React,useEffect,useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, ListItem, MenuItem } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import handler from "../../../handlers/generalHandlers";

function OtherIndCategory() {

  const [categoryFields,setCategoryFields] = useState("")

  
  const categoryList =[
    {
      value: "New",
      label: "New",
    },
    {
      value: "Existing",
      label: "Existing",
    },
    
  ];
  return (
    <>
    
      <Box
        component="div"
        sx={{
          display: "flex",
          flex: "0",
          fontSize: "15px",
          marginTop: "-30px",
          mb: 2,
        }}
      >
        CATEGORY:<b style={{ marginRight: "20px" }}>100</b>
        INDUSTRY:<b style={{ marginRight: "20px" }}>22</b>
        WH_CATEGORY:<b style={{ marginRight: "20px" }}>116</b>
        WH_INDUSTRY:<b>1</b>
      </Box>
      <Box style={{display:'flex'}}>
        <Box
          component="form"
          style={{
            backgroundColor: "#e6fbf0",
            marginBottom: "20px",
            border: "1px solid #b5ddc8",
            boxShadow: "0 1px 4px 0.25px #b5ddc8",
            width:'110ch'
          }}
          sx={{
            "& > :not(style)": {
              m: 1,
              width: "25ch",
              mb: 2,
              bgcolor: "#e6fbf0",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            component="div"
            sx={{ display: "flex", flex: "0", fontSize: "15px" }}
          >
            Title:<b style={{ marginRight: "20px" }}>Packing</b>
            Type:<b style={{ marginRight: "20px" }}>Category</b>
            BatchNo:<b style={{ marginRight: "20px" }}>116</b>
            Count:<b>1</b>
          </Box>
          {/* <ListItem style={{display:'flex'}}> */}
          <TextField
            select
            // style={{width:'50px',marginRight:20}}
            fullWidth
            id="outlined-basic"
            label="Choose"
            variant="outlined"
          >
          {categoryList.map((option) => (
              <MenuItem key={option.value} value={option.value} onClick={()=>{
                setCategoryFields(option.label)
                console.log("test",option.label);
              }}>
                  {option.label}
              </MenuItem>
                ))}
          </TextField>
          {categoryFields==="New"?<TextField 
          fullWidth 
          id="outlined-basic" 
          label="Title" 
          variant="outlined" 
          />:null}
          {categoryFields==="Existing"?<TextField 
          select 
          id="outlined-basic" 
          label="Select" 
          variant="outlined" 
          />:null}
          {categoryFields==="New"?<TextField 
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />:null}
          
          <Button
            style={{
              background: "brown",
              color: "white",
              width: "10px",
              marginTop: "15px",
            }}
          >
            Save
          </Button>
          {/* <VisibilityIcon /> */}
          {/* </ListItem> */}
        </Box>
      </Box>
    </>
  );
}

export default OtherIndCategory;
