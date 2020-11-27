import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { NewPhoto } from "./NewPhoto";
import { app } from "../base";

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline';

const db = app.firestore();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    marginTop: "30px"
  }
}))

export const Album = () => {

  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [albumName, setAlbumName] = useState("");

  // パスと合致したルートの情報が収められたmatchオブジェクトを参照するuseRouteMatch()
  const match = useRouteMatch("/:album");
  console.log(match)
  const { album } = match.params;
  console.log(match)

  useEffect(() => {
      db.collection("albums")
      .doc(album)
      .onSnapshot((doc) => {
        setImages(doc.data().images || []);
        setAlbumName(doc.data().name);
        console.log(doc.data().images)
      });
  }, []);

  return (
    <Container component="main">
      <section className={classes.paper}>
        <header>
          <Typography component="h1" variant="h3">{albumName}</Typography>
          <Typography component="body" variant="body">Go to the <Link to="/">Home page</Link></Typography>
        </header>
        <Grid container spacing={10} justify="center" className={classes.root}>
        {images.map((image) => (
          <Grid item　xs={4}  key={image.name}>
            <Card>
              {/* <img src={image.url} alt="album" /> */}
              <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                height="300"
                width="auto"
                  image={image.url}
                  title="Contemplative Reptile"
                />
            </Card>
          </Grid>
        ))}
        </Grid>
      </section>
      <footer>
        <NewPhoto currentAlbum={album} />
      </footer>
    </Container>
  );
};