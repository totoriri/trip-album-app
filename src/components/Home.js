import React from "react";
import { app } from "../base";
import { Link } from "react-router-dom"
import NewAlbumForm from "./NewAlbumForm"

const Home = (props) => {
  const { albums } = props;
  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={() => app.auth().signOut()}>Sign out</button>


      {/* previously in App.js */}
      <div>
        {/* this map is for displaying albums */}
          {
            albums.map(album => (
              <Link to={`/${album.id}`}>
                <div key={album.name}>
                  <h1>{album.name}</h1>
                  <img src={album.image} alt=""/>
                </div>
              </Link>
            ))
          }
          <NewAlbumForm/>
      </div>

    </div>
  );
}

export default Home;