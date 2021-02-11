import React,{useEffect,useState,useContext} from "react";
import { app } from "../base";
import { Link, withRouter } from "react-router-dom"
import {AuthContext} from "../context/AuthContext"

import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import SearchBar from "../components/SearchBar"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Img from "../assets/img/homeTop.png"
import Button from '@material-ui/core/Button';
import TravelReportCard from "../components/cards/TravelReportCard"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    // flexDirection: "column",
    // alignItems:"center"
  },
  homeTop: {
    display: "flex",
    hight: "100vh"
  },
  travels: {
    marginTop: theme.spacing(20),
  },
  pageTitle: {
    fontSize:"40px",
    marginTop: theme.spacing(10),
    textAlign:"center"
  },
  root: {
    display: 'flex',
    height: 200,
    // width: 400,
    flex: "1 auto"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  cover: {
    width: "100%",
  },
  addCircleIcon: {
    width:"300px"
  },
  button: {
    margin: theme.spacing(1),
    width: "300px",
    height: "80px",
    // position: "relative"
  },
}))

const db = app.firestore()


const Home = (props) => {

  const classes = useStyles();
  const [travels, setTravels] = useState([])
  const { currentUser } = useContext(AuthContext);
  const col = db.collection("travels");


  const { history } = props;

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/create-travel")
  }

  useEffect(() => {
    if (currentUser !== null) {
      col.where("uid", "==", currentUser.uid).onSnapshot((snapshot) => {
        const tempTravels = [];
        snapshot.forEach((doc) => {
          tempTravels.push({ ...doc.data(), id: doc.id });
        })
        setTravels(tempTravels);
      })
    }

  },[])

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.homeTop}>
          <div>
            <h1 className={classes.pageTitle}>旅行の思い出を言葉で残そう！</h1>
            <Button
        　　　　variant="contained"
        　　　　color="default"
        　　　　className={classes.button}
    　　　　　　　startIcon={<AddCircleIcon fontSize="large" />}
    　　　　　　　onClick={(e)=>handleClick(e)}
      　　　　　>
        　　　New Travel Report
      　　　　</Button>
          </div>
          <img src={Img}/>
        </div>
      </div>
      <TravelReportCard travels={travels}/>
    </Container>
  );
}

export default withRouter(Home);