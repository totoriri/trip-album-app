import React,{useState, useEffect,useMemo,useContext} from "react";
import { BrowserRouter as Router, Route,Switch,Link } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { app } from "./base"
import NewAlbumForm from "./components/NewAlbumForm"
import {Album} from "./components/Album"
import { AuthContext } from "./auth/AuthProvider"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ClippedDrawer from "./components/Drawer.js"

const db = app.firestore();

const App = () => {
  const [albums, setAlbums] = useState([])
  const col = db.collection("albums");
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser)
  // console.log(currentUser.uid)

  // 前の
  // useEffect(() => {
  //   db.collection("albums").onSnapshot((snapshot) => {
  //     const tempAlbums = [];
  //     snapshot.forEach((doc) => {
  //       // set the id for passing data as path
  //       tempAlbums.push({ ...doc.data(), id: doc.id });
  //       console.log({...doc.data()})
  //     })
  //     setAlbums(tempAlbums);
  //     // {name:"shoes",id:"shoes"}
  //     console.log(tempAlbums)
  //   })
  // },[])

  // これが新しいやつ
  useEffect(() => {
    // col.where("uid", "==", currentUser.uid).onSnapshot((snapshot) => {
    col.where("uid", "==", "CK7mvAqVMtYesYsoESXUQkaW7UU2").onSnapshot((snapshot) => {
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
    // <AuthProvider>
    <Router>
      <ClippedDrawer/>
        <Switch>
          <PrivateRoute exact path="/" albums={albums} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          {/* <Route path={`/${album.id}`} component={Album}/> */}
          <Route path="/:album" component={Album}/>
        </Switch>
      </Router>
    // </AuthProvider>
  );
};

export default App;