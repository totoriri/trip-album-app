import React,{useState} from "react"
import { app } from "../base"

const db = app.firestore();

const NewAlbumForm = () => {
  const [albumName, setAlbumName] = useState("");

  const onAlbumNameChange = (event) => {
    setAlbumName(event.target.value)
  }

  const onAlbumCreate = () => {
    albumName&&
    db.collection("albums").doc(albumName).set({
      name: albumName
    })
    // to clear the input
    setAlbumName("")
  }

  return (
    <div>
      <input value={albumName} onChange={onAlbumNameChange} type="text" />
      <button onClick={onAlbumCreate}>create Album</button>
    </div>
  )
}

export default NewAlbumForm;