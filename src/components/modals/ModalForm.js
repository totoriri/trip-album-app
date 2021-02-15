import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import NewPhotoForm from "../../pages/forms/NewPhotoForm"
import React, {useState,useRouteMatch} from 'react'
import firebase from 'firebase'
import { app } from '../../base'
import {withRouter} from "react-router-dom"

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const db = app.firestore()
const storage = app.storage();

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalBtn: {
    backgroundColor: "orange",
    border: "1px green",
    borderRadius: "10px",
    padding: "15px",
    margin: "5px",
    transitionProperty: "background-color",
    transitionDuration: "2s",
    transitionTimingFunction: "easeOut",
    '&:focus':{
      outline: "none"
    },
    '&:hover': {
      cursor: "pointer",
      backgroundColor: "#ffd700"
    }
  },
  textarea: {
    width: "100%",
    fontSize: "1.3rem"
  }
}));


export default function TransitionsModal({travel}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentTravel,setCurrentTravel] = useState([])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [file, setFile] = useState(null)
  const [answerText,setAnswerText] = useState("")

  // const match = useRouteMatch("/travels/:travel");
  // console.log(match)
  // const { travel } = match.params;
  // console.log(travel)



  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0])
  }

  const onAnswerTextChange = (e) => {
    setAnswerText(e.target.value)
  }


  const onUpload = async () => {
    // const storageRef = storage.ref()
    // if (file) {
    //   const fileRef = storageRef.child(file.name)
    //   await fileRef.put(file)
    //   db.collection("travels").doc(travel).update({
    //     images: firebase.firestore.FieldValue.arrayUnion({
    //       name: file.name,
    //       url: await fileRef.getDownloadURL()
    //     })
    //   })
    // }else{
    //   return;
    // }
    console.log(file)
    console.log(answerText)
    // history.push(`/travels/${currentTravel}`)
  }


  return (
    <div>
      <button type="button" className={classes.modalBtn} onClick={handleOpen}>
        react-transition-group
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Container component="main" maxWidth="xs" className={classes.form}>
            <CssBaseline />
    {/* <input type="file" onChange={onFileChange}/> */}
              {/* <button onClick={onUpload}>Upload image</button> */}
              {/* <TextareaAutosize aria-label="minimum height" rowsMin={5} placeholder="Minimum 3 rows" /> */}
            <TextareaAutosize
            value={answerText}
            onChange={onAnswerTextChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            className={classes.textarea}
            name="answerText"
            label="Answer Text"
            type="text"
            id="answerText"
            rowsMin={5}
            />
      <TextField
        variant="outlined"
        onChange={onFileChange}
            margin="normal"
            required
            fullWidth
            name="file"
            // label="File"
            type="file"
            id="file"
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          className={classes.submit}
          onClick={onUpload}
            >
            Upload Image
            </Button>
    </Container>
            {/* <NewPhotoButton/> */}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}