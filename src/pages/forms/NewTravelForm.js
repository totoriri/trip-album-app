import React,{useState,useContext,useEffect} from "react"
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
import { data } from "../Data"
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
  const [tags, setTags] = useState([])

  const onTravelNameChange = (event) => {
    setTravelName(event.target.value)
  }

  const handleTagChange = (e, value) => {
    console.log(value)
    setTags(value)
  }


  const onTravelCreate = () => {
    if (travelName) {
      db.collection("travels").add({
        uid: currentUser.uid,
        isComplete: false,
        createdAt: new Date(),
        name: travelName,
        tags:tags
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
        options={data}
        onChange={handleTagChange}
        getOptionLabel={(option) => option.title}
        defaultValue={[data[1], data[3], data[4]]}
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