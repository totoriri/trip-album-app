// import React, { useEffect, useState } from "react";
// import { app } from "../base.js";

// const db = app.firestore();

// export const AuthContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   const login = async (email, password, history) => {
//     try {
//       await app.auth().signInWithEmailAndPassword(email, password);
//       history.push("/");
//     } catch (error) {
//       alert(error);
//     }
//   };

//   const signup = async (email, password, history) => {
//     try {
//       await app.auth().createUserWithEmailAndPassword(email, password);
//       db.collection("users").doc(currentUser.uid).set({
//         // uid:currentUser.uid,
//         createAt: new Date()
//       })
//       history.push("/");
//     } catch (error) {
//       alert(error);
//     }
//   };

//   useEffect(async() => {
//     await app.auth().onAuthStateChanged(setCurrentUser);
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         login: login,
//         signup: signup,
//         currentUser
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import { app } from "../base"

const db = app.firestore();
const auth = app.auth();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  console.log(currentUser);

  const login = async(email,password,history) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      history.push("/")
    } catch(error){
      alert(error)
    }
  }

  const signup = async(username,email,password,history) => {
    try {
      // 備忘録（const と asyncの関係性において）
      // const newUser = await auth.createUserWithEmailAndPassword(email, password)
      // const { uid } = newUser.id;
      // db.collection("users").doc(uid).set({
      //   uid:currentUser.uid,
      //   username: username,
      //   createAt: new Date()
      // })
      await auth.createUserWithEmailAndPassword(email, password)
      db.collection("users").doc(currentUser.uid).set({
        username:username,
        uid:currentUser.uid,
        createAt: new Date()
      })
      console.log(history)
      history.push("/")
    } catch (error) {
      alert(error)
    }
  }

  useEffect( () => {
    (async() => {
      await auth.onAuthStateChanged(user => setCurrentUser(user));
    })()
  },[])

  return (
    <AuthContext.Provider value={{login,signup,currentUser}}>
      {children}
    </AuthContext.Provider>
  )
}


