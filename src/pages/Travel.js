import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
// import { NewPhotoForm } from "../components/forms/NewPhotoForm";
import { app } from '../base';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid'
// import Card from '@material-ui/core/Card'
// import CardMedia from '@material-ui/core/CardMedia'
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
// import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
// import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
// import ThumbDown from '@material-ui/icons/ThumbDown';
// import ThumbUp from '@material-ui/icons/ThumbUp';
import Box from '@material-ui/core/Box';
// import { defaultQuestions } from "../DefaultQuestions"
// import CardHeader from '@material-ui/core/CardHeader';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import clsx from 'clsx';
// import Collapse from '@material-ui/core/Collapse';
// import ModalForm from "../components/forms/ModalForm"
import QuestionCard from '../components/cards/QuestionCard';

const db = app.firestore();

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
    // flexGrow: 1,
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
  const [travelName, setTravelName] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const match = useRouteMatch('/travels/:travel');
  const { travel } = match.params;
  console.log(match);
  console.log(travel);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await db
        .collection('travels')
        .doc(travel)
        .onSnapshot((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            setSelectedQuestions(doc.data().selectedQuestions);
            setImages(doc.data().images || []);
            setTravelName(doc.data().name || []);
          } else {
            console.log('No such document!');
          }
        });
    })();
  }, []);

  // タブに関する部分
  const ScrollableTabsButtonPrevent = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <div className={classes.root}>
        <paper square>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="off"
            aria-label="scrollable prevent tabs example"
            className={classes.tab}
          >
            <Tab icon={<HelpIcon />} aria-label="phone" {...a11yProps(0)} />
            <Tab icon={<FavoriteIcon />} aria-label="favorite" {...a11yProps(1)} />
          </Tabs>
        </paper>
        <TabPanel value={value} index={0}>
          {selectedQuestions.map((item, index) => {
            let Index = index + 1;
            return <QuestionCard item={item} travel={travel} />;
          })}
        </TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
      </div>
    );
  };

  return (
    <Container component="main">
      <section className={classes.paper}>
        <header>
          <Typography className={classes.travelTitle} component="h1" variant="h3">
            {travelName}
          </Typography>
        </header>
        <ScrollableTabsButtonPrevent />
      </section>
      <footer className={classes.footer}></footer>
    </Container>
  );
};

export default Travels;
