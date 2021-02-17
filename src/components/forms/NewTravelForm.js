import React,{useState,useContext} from "react"
import { app } from "../../base"
import { AuthContext } from "../../context/AuthContext"
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom"
import { defaultQuestions } from "../../DefaultQuestions"
import Autocomplete from '@material-ui/lab/Autocomplete';

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


const NewTravelForm = ({ history }) => {

  const classes = useStyles();

  const [travelName, setTravelName] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [selectedQuestions, setSelectedQuestions] = useState([defaultQuestions[1], defaultQuestions[3], defaultQuestions[4]])

  const onTravelNameChange = (event) => {
    setTravelName(event.target.value)
  }

  const handleSelectedQuestionsChange = (e, value) => {
    console.log(value)
    setSelectedQuestions(value)
  }


  const onTravelCreate = async() => {
    if (travelName) {
      const travelRef = await db.collection("travels").add({
        uid: currentUser.uid,
        isComplete: false,
        createdAt: new Date(),
        name: travelName,
        selectedQuestions:selectedQuestions
      })
      setTravelName("")
      history.push("/")
    }
  }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
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
          <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={defaultQuestions}
        onChange={handleSelectedQuestionsChange}
        getOptionLabel={(option) => option.title}
        defaultValue={[defaultQuestions[1], defaultQuestions[3], defaultQuestions[4]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="limitTags"
            placeholder="Favorites"
          />
        )}
      />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onTravelCreate}
          >
            Go!
            </Button>
        </div>
      </Container>
    )
  }

  export default withRouter(NewTravelForm);