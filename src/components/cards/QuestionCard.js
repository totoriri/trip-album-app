import React, { useState, useEffect } from "react";
import { useRouteMatch, Link,useHistory } from "react-router-dom";
import { NewPhotoForm } from "../../pages/forms/NewPhotoForm";
// import { app } from "../base";
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

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
import { defaultQuestions } from "../../pages/DefaultQuestions"
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import ModalForm from "../modals/ModalForm"

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

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);




const QuestionCard = ({item,travel}) => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
   const [travelName, setTravelName] = useState("");
    const [selectedQuestions, setSelectedQuestions] = useState([])
    const [isRated,setIsRated] = useState(false)
   const [expanded, setExpanded] = React.useState(false);
   const handleExpandClick = () => {
    setExpanded(!expanded);
   };

    const onRatingChange = () => {
    setIsRated(!isRated)
    console.log(isRated)
    }


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
                  {/* <StyledRating
                    name="customized-color"
                    defaultValue={0}
                        onChange={onRatingChange}
                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    precision={1}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    max={1}
                  /> */}
                  <StyledRating
                    name={item.title}
                    defaultValue={0}
                    onChange={onRatingChange}
                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    precision={1}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    max={1}
                      />

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
}

export default QuestionCard;