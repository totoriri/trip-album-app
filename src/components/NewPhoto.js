import React, {useState} from 'react'
import firebase from 'firebase'
import { app } from '../base'

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

const db = app.firestore()
const storage = app.storage();

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}))

export const NewPhoto = ({currentAlbum}) => {
  const classes = useStyles();
  const [file, setFile] = useState(null)

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0])
  }

  const onUpload = async () => {
    const storageRef = storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    db.collection("albums").doc(currentAlbum).update({
        images: firebase.firestore.FieldValue.arrayUnion({
        name: file.name,
        url: await fileRef.getDownloadURL()
      })
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
    {/* <input type="file" onChange={onFileChange}/> */}
    {/* <button onClick={onUpload}>Upload image</button> */}
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
  )
}