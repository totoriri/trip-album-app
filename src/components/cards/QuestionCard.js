import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import ModalForm from '../forms/ModalForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  travelTitle: {
    marginTop: theme.spacing(5),
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'center',
    margin: '0 auto',
  },
  tab: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center', // or black
    },
  },
  footer: {
    textAlign: 'center',
  },
  cardHeader: {
    variant: 'h5',
    fontweight: 'bold',
    color: 'red',
  },
}));

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const QuestionCard = ({ item, travel }) => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [travelName, setTravelName] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isRated, setIsRated] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onRatingChange = () => {
    setIsRated(!isRated);
    console.log(isRated);
  };

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
        title={
          <Typography gutterBottom variant="h5" component="h2">
            {item.title}
          </Typography>
        }
      />
      <CardMedia className={classes.media} image="/static/images/cards/paella.jpg" title="Paella dish" />
      <CardActions disableSpacing>
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
          <ModalForm travel={travel} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default QuestionCard;
