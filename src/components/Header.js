import React,{useContext} from "react";
import { AuthContext } from "../auth/AuthProvider"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import {makeStyles,createStyles} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  flex1:{
    display: "flex",
    justifyContent:"space-between"
  },
  flex2:{
    display: "flex",
  },

}))



const Header = () => {

  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  return (
    <AppBar>
        <Toolbar className={classes.flex1}>
          <Link href="/">
        <Typography color="secondary">
              Album App
            </Typography>
            </Link>
              {
                currentUser ?
                <div className={classes.flex2}>
                  <Typography>{currentUser.uid}</Typography>
                  <NotificationsIcon/>
                </div>
                :
                <div className={classes.flex2}>
                    <Link href="/login">Log In</Link>
                    <Link href="/signup">Sign Up</Link>
                </div>
              }
      </Toolbar>
    </AppBar>
  )
}

export default Header;