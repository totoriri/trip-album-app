import React, { useState, useEffect } from "react";
import { useRouteMatch, Link,useHistory } from "react-router-dom";
import { NewPhotoForm } from "./forms/NewPhotoForm";
import { app } from "../base";
import NewPhotoButton from "../components/buttons/NewPhotoButton"

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Box from '@material-ui/core/Box';
import { data } from "./Data"
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import ModalForm from "../components/modals/ModalForm"


const db = app.firestore();


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  travelTitle: {
    marginTop:theme.spacing(5)
  },
  root: {
    // flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    justifyContent: "center",
    margin: "0 auto"
  },
  tab: {
    "& .MuiTabs-flexContainer": {
      justifyContent: "center" // or black
    }
  },
  footer: {
    textAlign:"center"
  },
  cardHeader: {
    variant:"h5",
    fontweight: "bold",
    color: "red"
  }
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}




// こっからexport default
 const Travels = () => {

  const classes = useStyles();
  const [images, setImages] = useState([]);
   const [travelName, setTravelName] = useState("");
   const [tags, setTag] = useState([])
   const [expanded, setExpanded] = React.useState(false);
   const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // パスと合致したルートの情報が収められたmatchオブジェクトを参照するuseRouteMatch()
  const match = useRouteMatch("/travels/:travel");
  const { travel } = match.params;
  console.log(match)
   console.log(travel)
   const history = useHistory();

  useEffect(() => {
    (async () => {
      await db
        .collection("travels")
        .doc(travel)
        .onSnapshot((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data())
            setTag(doc.data().tags)
            setImages(doc.data().images || [])
            setTravelName(doc.data().name || []);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    })
    })();
  }, []);


  // タブに関する部分
  const  ScrollableTabsButtonPrevent = ()=> {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    return (
      <div className={classes.root}>
        <paper square >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="off"
            aria-label="scrollable prevent tabs example"
            className={classes.tab}
          >
            <Tab icon={<HelpIcon/>} aria-label="phone" {...a11yProps(0)} />
            <Tab icon={<FavoriteIcon />} aria-label="favorite" {...a11yProps(1)} />
          </Tabs>
        </paper>
        <TabPanel value={value} index={0}>
          {
            tags.map((item,index) => {
              let Index = index + 1;
              return (
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        Q
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                      // title={item.title}
                      title={
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                      </Typography>
                                }
                  />
                  <CardMedia
                    className={classes.media}
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                  />
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <ModalForm travel={travel}/>
                    </CardContent>
                  </Collapse>
                </Card>
              )
            })
          }

        </TabPanel>
        <TabPanel value={value} index={1}>
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
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    );
  }



  return (
    <Container component="main">
      <section className={classes.paper}>
        <header>
          <Typography className={classes.travelTitle} component="h1" variant="h3">{travelName}</Typography>
        </header>
        <ScrollableTabsButtonPrevent/>
      </section>
      <footer className={classes.footer}>
        {/* <NewPhotoButton history={history} currentTravel={travel}/> */}
      </footer>
      </Container>
  );
 };

export default Travels;