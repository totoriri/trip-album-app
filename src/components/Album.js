import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { NewPhoto } from "./NewPhoto";
import { app } from "../base";

const db = app.firestore();

export const Album = () => {
  const [images, setImages] = useState([]);
  const [albumName, setAlbumName] = useState("");

  // パスと合致したルートの情報が収められたmatchオブジェクトを参照するuseRouteMatch()
  const match = useRouteMatch("/:album");
  console.log(match)
  const { album } = match.params;
  console.log(match)

  useEffect(() => {
      db.collection("albums")
      .doc(album)
      .onSnapshot((doc) => {
        setImages(doc.data().images || []);
        setAlbumName(doc.data().name);
        console.log(doc.data().images)
      });
  }, []);

  return (
    <>
      <section>
        <header>
          <h1>{albumName}</h1>
          <p>Go to the <Link to="/">Home page</Link></p>
        </header>
        {images.map((image) => (
          <div key={image.name}>
            <img style={{width:"50%",height:"50%"}} src={image.url} alt="album" />
          </div>
        ))}
      </section>
      <footer>
        <NewPhoto currentAlbum={album} />
      </footer>
    </>
  );
};