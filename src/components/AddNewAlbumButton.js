import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
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



const IconLabelButtons = ({history}) => {
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault();
    console.log("yaksfjhak")
    // history.push("/newAlbumForm")
    history.push("/newAlbumForm")
  }

  return (
      <Button
        variant="contained"
        color="default"
        className={classes.button}
      startIcon={<AddCircleIcon fontSize="large" />}
      onClick={(e)=>handleClick(e)}
      >
        New Album
      </Button>
  );
}

export default withRouter(IconLabelButtons)