import React,{useState} from "react"
import { app } from "../base"

const db = app.firestore();

const NewAlbumForm = () => {
  const [albumName, setAlbumName] = useState("");
  return (
    <div>
      <input value={albumName} onChange={(event)=> setAlbumName(event.target.value)} type="text" />
      <button onClick={() => {
        albumName&&
        db.collection("albums").doc(albumName).set({
          name: albumName
        })
        // to clear the input
        setAlbumName("")
      }}>create Album</button>
    </div>
  )
}

export default NewAlbumForm;