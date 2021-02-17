import React,{useState,useEffect,useContext} from 'react'
import { AuthContext } from "../context/AuthContext"
import DefaultImg from "../assets/img/candy.jpg"
import { makeStyles } from "@material-ui/core/styles"
import NewPhotoForm from "../components/forms/NewPhotoForm"
import UserImgForm from "../components/forms/UserImgForm"


const useStyles = makeStyles((theme) => ({
  userImg: {
    width: "200px",
    height: "auto",
    marginTop: "100px ",
  }
}))


const Profile = () => {
  const { currentUser }  = useContext(AuthContext)
   console.log(currentUser)
  //  console.log(currentUser.email)
  const classes = useStyles();



  return (
    <>
      <div>
        <img src={DefaultImg} className={classes.userImg} />
        {/* <h3>Name:{currentUser.name}</h3>
        <h3>Name:{currentUser.email}</h3> */}
      </div>
      {/* <h1>{currentUser.email}</h1> */}
      <UserImgForm currentUser={currentUser}/>
    </>
  )
}

export default Profile
