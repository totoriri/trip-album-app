import React from 'react';
import Button from '@material-ui/core/Button';
import { useRouteMatch, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { withRouter } from "react-router";



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    width: "300px",
    height: "80px",
    fontSize: "20px",
    position: "relative"
  },
}));

const IconLabelButtons = ({history,currentAlbum}) => {
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    console.log("yaksfjhak")
    history.push("/login")
  }

  const match = useRouteMatch("/:album");
  console.log(match)
  const { album } = match.params;
  console.log(match)

  return (
      <Button
        variant="contained"
        color="default"
        className={classes.button}
      startIcon={<AddCircleIcon fontSize="large" />}
      onClick={(e) => handleClick(e)}
      currentAlbum={album}
      >
        New Photo
      </Button>
  );
}

export default withRouter(IconLabelButtons)