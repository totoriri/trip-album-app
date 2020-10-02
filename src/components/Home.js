import React from "react";
import { app } from "../base";
import { Link } from "react-router-dom"
import NewAlbumForm from "./NewAlbumForm"

import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems:"center"
  },
  albums: {
    marginTop:"15px"
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
}))

const Home = (props) => {

  const classes = useStyles();

  const { albums } = props;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography component="h1" variant="h5">Home Page</Typography>
      <button onClick={() => app.auth().signOut()}>Sign out</button>


      {/* previously in App.js */}
        <Grid container className={classes.albums}spacing={3}>
        {/* this map is for displaying albums */}
          {
            albums.map(album => (
                <Grid item  key={album.name}>
              <Link to={`/${album.id}`}>
                  <Card className={classes.root}>
                    <div className={classes.details}>
                    <CardContent className={classes.content}>
                  <Typography>{album.name}</Typography>
                      {/* <img src={album.image} alt="" /> */}
                      {/* <img src="http://placekitten.com/g/200/300" alt="" />
                    </div> */}
                        </CardContent>
                      </div>
                    <CardMedia
        className={classes.cover}
        image="http://placekitten.com/g/200/300" alt=""
                      title="Live from space album cover"
      />
                </Card>
              </Link>
                  </Grid>
            ))
          }
          <NewAlbumForm/>
      </Grid>
      </div>
    </Container>
  );
}

export default Home;