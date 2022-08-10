import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function BatchPriority() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        bgcolor: "#e6fbf0",
        mb: 2,
        border: "1px solid #b5ddc8",
        boxShadow: "0 1px 4px 0.25px #b5ddc8",
      }}
    >
      <CardHeader
        style={{ alignItem: "center", marginLeft: "110px" }}
        action={
          <IconButton aria-label="">
            <EditIcon style={{ color: "#d32f2f" }} />
          </IconButton>
        }
        title="Batch no"
      />
      <h3
        style={{
          color: "#d32f2f",
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
          position: "absolute",
          marginLeft: "155px",
          marginTop: "17px",
        }}
      >
        100
      </h3>

      <CircularProgress
        style={{ marginLeft: "140px",marginBottom:'-20px' }}
        color="error"
        variant="determinate"
        value={100}
        size={70}
        thickness={3.4}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b>Assigned To</b>
          <p style={{ marginLeft: "40px", marginBottom: "-30px" }}>Test Name</p>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <p
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="SHOW STATS"
          style={{
            fontSize: "13px",
            color: "#d32f2f",
            marginLeft: "230px",
            font: "bold",
            cursor: "pointer",
          }}
        >
          SHOW STATS
        </p>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default BatchPriority;
