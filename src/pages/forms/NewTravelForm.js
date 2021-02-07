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
import { data }  from "../Data"

const db = app.firestore();


// const defaultQuestions = [
//   {
//     id:0,
//     text:"何日間、旅行した"
//   },
//   {
//     id:1,
//     text: "一番美味しかったご飯は？"
//   },
//   {
//     id:2,
//     text: "起こったハプニングは？"
//   }
// ]

// const data = [
//   {
//     name: "test1",
//     result: "pass"
//   },
//   {
//     name: "test2",
//     result: "pass"
//   },
//   {
//     name: "test3",
//     result: "pass"
//   },
//   {
//     name: "test4",
//     result: "pass"
//   },
//   {
//     name: "test5",
//     result: "pass"
//   },
//   {
//     name: "test6",
//     result: "pass"
//   }
// ];

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
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const { currentUser } = useContext(AuthContext);
  const onTravelNameChange = (event) => {
    setTravelName(event.target.value)
  }


  const [isChecked, setIsChecked] = useState(['js']);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(data);


  const handleChange = (e) => {
    if (isChecked.includes(e.target.value)) {
      // すでに含まれていれば OFF したと判断し、
      // イベント発行元を除いた配列を set し直す
      setIsChecked(isChecked.filter(item => item !== e.target.value));
    } else {
      // そうでなければ ON と判断し、
      // イベント発行元を末尾に加えた配列を set し直す
      setIsChecked([...isChecked, e.target.value]);
      // state は直接は編集できない
      // つまり val.push(e.target.value) はNG ❌
    }
  };
  // const handleSingleCheck = (e) => {
  //   console.log(e.target);
  //   setIsChecked({ ...isChecked, [e.target.name]: e.target.checked });
  // };

  // useEffect(() => {
  //   const initialIsChecked = data.reduce((acc, d) => {
  //     acc[d.name] = false;
  //     return acc;
  //   }, {});
  //   setIsChecked(initialIsChecked);
  //   setLoading(false);
  // }, [loading]);






  const onTravelCreate = () => {
    console.log(isChecked)
    if (travelName) {
      db.collection("travels").add({
        uid: currentUser.uid,
        isComplete: false,
        createdAt: new Date(),
        name: travelName,
        isChecked
      })
      setTravelName("")
      history.push("/")
    }
  }


    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
           <label>
        <input
          type="checkbox"
          value="js"
          onChange={handleChange}
          checked={isChecked.includes('js')}
        />
        JavaScript
      </label>
      <label>
        <input
          type="checkbox"
          value="python"
          onChange={handleChange}
          checked={isChecked.includes('python')}
        />
        Python
      </label>
      <label>
        <input
          type="checkbox"
          value="java"
          onChange={handleChange}
          checked={isChecked.includes('java')}
        />
        Java
      </label>
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