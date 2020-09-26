import React,{useState, useEffect} from "react";
import { BrowserRouter as Router, Route,Switch,Link } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import Home from "./components/Home";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { app } from "./base"
import NewAlbumForm from "./components/NewAlbumForm"
import {Album} from "./components/Album"

const db = app.firestore();

const App = () => {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    db.collection("albums").onSnapshot((snapshot) => {
      const tempAlbums = [];
      snapshot.forEach((doc) => {
        // set the id for passing data as path
        tempAlbums.push({...doc.data(),id:doc.id });
      })
      setAlbums(tempAlbums);
      // {name:"shoes",id:"shoes"}
      console.log(tempAlbums)
    })
  },[])

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" albums={albums} component={Home} />
          {/* <PrivateRoute exact path="/" albums={albums} component={() => <Home/>} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />

          {
            albums.map((album) => <Route path={`/${album.id}`} component={Album}/>)
          }
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;