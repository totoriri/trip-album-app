import React,{useState, useEffect,useMemo,useContext} from "react";
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Header from "./components/header/Header.js"
import Profile from "./pages/Profile"
import { app } from "./base"
import NewTravelForm from "./components/forms/NewTravelForm"
import NewPhotoForm from "./components/forms/NewPhotoForm"
import Travel from "./pages/Travel"
import { AuthContext } from "./context/AuthContext"



const db = app.firestore();

const App = () => {
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


  return (
    // <AuthProvider>
    <Router>
        <Header/>
        <Switch>
          <PrivateRoute exact path="/"  component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          {/* <Route path={`/${album.id}`} component={Album}/> */}
          <PrivateRoute path="/travels/:travel" component={Travel} />
          <PrivateRoute path="/create-travel" component={NewTravelForm}/>
          <PrivateRoute path="/addNewPhoto" component={NewPhotoForm}/>
          <PrivateRoute path="/users/:userID" component={Profile} />
          </Switch>
      </Router>
    // </AuthProvider>
  );
};

export default App;