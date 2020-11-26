import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import Login from "./Login";

const PrivateRoute = ({ component: RouteComponent, ...options }) => {
  console.log({ ...options })
  const { currentUser } = useContext(AuthContext);
  const Component = currentUser ? RouteComponent : Login;

  // return <Route {...options} component={Component} />;
  return <Route {...options} render={() => <Component {...options} />}/>
};

export default PrivateRoute;