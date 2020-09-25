import React from , { useEffect, useState } from "react";
import { app } from "../base.js"

export const AuthContext = React.createContext();

export default AuthProvider = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password, history) => {
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      alert(error)
    }
  }

  const signup = async (email, password, history) => {
    try {
      await app.auth().createUserWithEmailAndPassword(email, password);
      history.push("/")
    } catch(error){
      alert(error)
    }
  }

  useEffect(() => {
    app.auth().onAuthStateChange(setCurrentUser)
  })

  return (
    <AuthContext.Provider value={{login:login,signup:signup,currentUser}}>
      {children}
    </AuthContext.Provider>
  )
}