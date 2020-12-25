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
import AddNewAlbumButton from "../components/AddNewAlbumButton"
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems:"center"
  },
  albums: {
    marginTop: theme.spacing(20),
  },
  pageTitle: {
    marginTop: theme.spacing(10),
    textAlign:"center"
  },
  homeTop: {
    // backgroundColor: "lightGray"
  },
  root: {
    display: 'flex',
    height: 200,
    width: 400,
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
  }
}))

const db = app.firestore()


const Home = (props) => {

  const classes = useStyles();
  const [albums, setAlbums] = useState([])
  const { currentUser } = useContext(AuthContext);
  const col = db.collection("albums");


  const { history } = props;

  useEffect(() => {
    // col.where("uid", "==", currentUser.uid).onSnapshot((snapshot) => {
    col.where("uid", "==", currentUser.uid).onSnapshot((snapshot) => {
      const tempAlbums = [];
      snapshot.forEach((doc) => {
        tempAlbums.push({ ...doc.data(), id: doc.id });
      })
      setAlbums(tempAlbums);
      // {name:"shoes",id:"shoes"}
      console.log(tempAlbums)
    })

  },[])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.homeTop}>
          <Typography className={classes.pageTitle} component="h1" variant="h3">Albums</Typography>
          <SearchBar />
        </div>
      {/* previously in App.js */}
        <Grid container maxWidth="xs" justify="center" className={classes.albums} spacing={3}>
        {/* this map is for displaying albums */}
          {
            albums.map(album => (
                <Grid item  key={album.name}>
              <Link to={`/albums/${album.id}`}>
                  <Card className={classes.root}>
                    <div className={classes.details}>
                    <CardContent className={classes.content}>
                  <Typography component="h1" variant="h5">{album.name}</Typography>
                      {/* <img src={album.image} alt="" /> */}
                      {/* <img src="http://placekitten.com/g/200/300" alt="" />
                    </div> */}
                        </CardContent>
                      </div>
                    <CardMedia
                      className={classes.cover}
                      image={album.images ? album.images[0].url : ""}
                      alt="album"
                      title="Live from space album cover"
                    />
                </Card>
              </Link>
            </Grid>
            ))
          }
          <AddNewAlbumButton history={history}/>
          {/* <AddCircleIcon fontSize='large' className={classes.addCircleIcon}/> */}
      </Grid>
      </div>
    </Container>
  );
}

export default withRouter(Home);