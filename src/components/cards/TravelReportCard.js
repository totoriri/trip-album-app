import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from "react-router-dom"
import DefaultImg from "../../assets/img/candy.jpg"

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({travels}) {
  const classes = useStyles();

  return (
    <div class="container" className={classes.container}>
      {
        travels.map(travel => (
          <Card className={classes.root} key={travel.name}>
            <Link to={`/travels/${travel.id}`}>
          <CardHeader avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
          }
          action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
          }
          title={travel.name}
          subheader="September 14, 2016"
          />
          <CardMedia
            className={classes.media}
            image={travel.images ? travel.images[0].url : DefaultImg}
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary"   component="p">
            This impressive paella is a perfect party dish and a fun  meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels,  if you like.
            </Typography>
          </CardContent>
        </Link>
        </Card>
        ))
      }
    </div>
  );
}