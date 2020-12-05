import React, { useState,createContext,useContext,useEffect } from "react";
import {AuthContext} from "../context/AuthContext"

export const AlbumContext = createContext();



const AlbumProvider = (children) => {
  const [albums, setAlbums] = useState([])

  const { currentUser } = useContext(AuthContext);

  useEffect(async () => {
    let albumsRef = await
    db.collection("users")
    .doc(currentUser.uid)
    .collection("albums");

    albumsRef.onSnapshot(snapShot => {
    let tempAlbums = [];
    snapShot.forEach(doc => {
    tempAlbums.push(doc.data())
    })
    setAlbums(tempAlbums)
    });
  },[])


  return (
    <AlbumContext.Provider>{children}</AlbumContext.Provider>
  )
}

export default AlbumProvider;