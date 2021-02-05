import React,{useState,useContext} from "react"
import { app } from "../../base"
import { AuthContext } from "../../context/AuthContext"
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from "react-router-dom"

const db = app.firestore();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const NewAlbumForm = ({history}) => {

  const classes = useStyles();

  const [albumName, setAlbumName] = useState("");
  const { currentUser } = useContext(AuthContext);
  const onAlbumNameChange = (event) => {
    setAlbumName(event.target.value)
  }

  const onAlbumCreate = () => {
    if (albumName) {
      db.collection("albums").add({
        uid: currentUser.uid,
        isComplete: false,
        createdAt: new Date(),
        name: albumName
      })
    } else {
      return;
    }
    setAlbumName("")
    history.push("/")
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

export default withRouter(NewAlbumForm);