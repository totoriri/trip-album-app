import React, { useState,createContext,useContext,useEffect } from "react";
import { AuthContext } from "../context/AuthContext"
import { db } from "../utils/base"

export const AlbumContext = createContext();



const AlbumProvider = (children) => {
  const [albums, setAlbums] = useState([])

  const { currentUser } = useContext(AuthContext);

  const addAlbum = ({text}) => {
    const newAlbum = [...albums, { albumTitle, date }]
    setAlbums(newAlbum)

    db
      .collection("users")
      .doc(currentUser.uid)
      .collection("albums")
      .add({ albumTitle})
  }

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