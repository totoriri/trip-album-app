import React, { createContext, useState, useEffect } from 'react';
import { app } from '../base';

const db = app.firestore();
const auth = app.auth();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser);

  const login = async (email, password) => {
    try {
      console.log(email, password);
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  const signup = async (email, password) => {
    try {
      console.log(email, password);
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    (async () => {
      await auth.onAuthStateChanged((user) => setCurrentUser(user));
    })();
  }, []);

  return <AuthContext.Provider value={{ login, signup, logout, currentUser }}>{children}</AuthContext.Provider>;
};
