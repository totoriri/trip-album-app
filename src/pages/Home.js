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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems:"center"
  },
  travels: {
    marginTop: theme.spacing(20),
  },
  pageTitle: {
    fontSize:"40px",
    marginTop: theme.spacing(10),
    textAlign:"center"
  },
  homeTop: {
    display: "flex"
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
    position: "relative"
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
    console.log("yaksfjhak")
    // history.push("/newAlbumForm")
    history.push("/create-album")
  }

  useEffect(() => {
    // col.where("uid", "==", currentUser.uid).onSnapshot((snapshot) => {
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.homeTop}>
          <div>
            <h1 className={classes.pageTitle}>Let's create Travel　Reports!</h1>
            <Button
        　　　　variant="contained"
        　　　　color="default"
        　　　　className={classes.button}
    　　　　　　　startIcon={<AddCircleIcon fontSize="large" />}
    　　　　　　　onClick={(e)=>handleClick(e)}
      　　　　　>
        　　　New Travel　Report
      　　　　</Button>
          </div>
          <img src={Img}/>
          {/* <SearchBar /> */}
        </div>
      {/* previously in App.js */}
        <Grid container maxWidth="xs" justify="center" className={classes.travels} spacing={3}>
        {/* this map is for displaying albums */}
          {
            travels.map(travel => (
              <Grid item key={travel.name}>
              <Link to={`/travels/${travel.id}`}>
                  <Card className={classes.root}>
                    <div className={classes.details}>
                    <CardContent className={classes.content}>
                  <Typography component="h1" variant="h5">{travel.name}</Typography>
                      {/* <img src={album.image} alt="" /> */}
                      {/* <img src="http://placekitten.com/g/200/300" alt="" />
                    </div> */}
                        </CardContent>
                      </div>
                    <CardMedia
                      className={classes.cover}
                      image={travel.images ? travel.images[0].url : ""}
                      alt="album"
                      title="Live from space album cover"
                    />
                </Card>
              </Link>
            </Grid>
            ))
          }
          {/* <AddCircleIcon fontSize='large' className={classes.addCircleIcon}/> */}
      </Grid>
      </div>
    </Container>
  );
}

export default withRouter(Home);