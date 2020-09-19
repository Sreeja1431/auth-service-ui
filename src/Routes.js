import React from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";

import SignIn from "./components/SignIn/SignIn";
import LandPage from "./components/SignIn/landPage";
import CreateAccount from "./components/CreateAccount/CreateAccount";


const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/signIn" />
      <Route component={SignIn} exact path="/signIn" />
      <Route component={LandPage} exact path="/landPage" />
      <Route component={CreateAccount} exact path="/createAccount" />
    </Switch>
  );
};


export default Routes;
