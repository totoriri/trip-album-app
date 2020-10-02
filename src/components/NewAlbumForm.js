import React,{useState} from "react"
import { app } from "../base"
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const db = app.firestore();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const NewAlbumForm = () => {

  const classes = useStyles();

  const [albumName, setAlbumName] = useState("");

  const onAlbumNameChange = (event) => {
    setAlbumName(event.target.value)
  }

  const onAlbumCreate = () => {
    albumName&&
    db.collection("albums").doc(albumName).set({
      name: albumName
    })
    // to clear the input
    setAlbumName("")
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
    <div className={classes.paper}>
      {/* <input value={albumName} onChange={onAlbumNameChange} type="text" />
      <button onClick={onAlbumCreate}>create Album</button> */}
      <TextField
            value={albumName}
            onChange={onAlbumNameChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="albumName"
            label="Album Name"
            type="text"
            id="albumName"
            autoComplete="current-password"
            />
          {/* <button type="submit">Log in</button> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
        className={classes.submit}
        onClick={onAlbumCreate}
            >
            Create Album
            </Button>
      </div>
      </Container>
  )
}

export default NewAlbumForm;