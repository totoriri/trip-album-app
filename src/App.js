import React,{useState, useEffect} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import Home from "./components/Home";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { app } from "./base"
import NewAlbumForm from "./components/NewAlbumForm"

const db = app.firestore();

const App = () => {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    db.collection("albums").onSnapshot((snapshot) => {
      const tempAlbums = [];
      snapshot.forEach((doc) => {
        tempAlbums.push(doc.data());
      })
      setAlbums(tempAlbums);
    })
  })

  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          {/* <PrivateRoute exact path="/" render={() => <Home/>} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />

          {/* this map is for displaying albums */}
          {
            albums.map(album => (
              <div key={album.name}>
                <h1>{album.name}</h1>
                <img src={album.image} alt=""/>
            </div>
            ))
          }
          <NewAlbumForm/>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;