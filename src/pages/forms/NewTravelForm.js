import React,{useState,useContext} from "react"
import { app } from "../../base"
import { AuthContext } from "../../context/AuthContext"
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom"
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const db = app.firestore();


const defaultQuestions = [
  {
    id: 1,
    question:"何日間、旅行した"
  },
  {
    id: 2,
    question: "一番美味しかったご飯は？"
  },
  {
    id: 3,
    question: "起こったハプニングは？"
  }
]

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

const NewTravelForm = ({history}) => {

  const classes = useStyles();

  const [travelName, setTravelName] = useState("");
  const [selectedQuestions,setSelectedQuestions] = useState({})
  const { currentUser } = useContext(AuthContext);
  const onTravelNameChange = (event) => {
    setTravelName(event.target.value)
  }

  const handleGroupCheckboxClick = ({ target: { id }})=> {
    setSelectedQuestions((s) => ({ ...s, [id]: !s[id] }));
  };

  const keys = Object.keys(selectedQuestions);
    const arrayOfIds = [];
    for(let i = 0; i<keys.length; i++) {
    const id = keys[i];
    if(selectedQuestions[id]) arrayOfIds.push(id);
}


  const onTravelCreate = () => {
    if (travelName) {
      db.collection("travels").add({
        uid: currentUser.uid,
        isComplete: false,
        createdAt: new Date(),
        name: travelName,
        selectedQuestions: selectedQuestions
      })
    } else {
      return;
    }
    setTravelName("")
    history.push("/")
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
    <div className={classes.paper}>
      {/* <input value={albumName} onChange={onAlbumNameChange} type="text" />
      <button onClick={onAlbumCreate}>create Album</button> */}
      <TextField
            value={travelName}
            onChange={onTravelNameChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="travelName"
            label="Travel Name"
            type="text"
            id="albumName"
            autoComplete="current-password"
        />
        {
          defaultQuestions.map(Q => {
            return (
              <div className={classes.specific_group} key={Q.id}>
                <input
                  type="checkbox"
                  id={Q.id}
                  name={Q.name}
                  onChange={handleGroupCheckboxClick}
                />
                <label htmlFor={Q.name}>{Q.name}</label>
              </div>
            );
          })
            }

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onTravelCreate}
            >
          Create Album
            </Button>
      </div>
      </Container>
  )
}

export default withRouter(NewTravelForm);