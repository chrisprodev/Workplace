import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./views/sign-up/SignUp";
//import Login from "./views/login/Login";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/channels">
            <p>Chat Component</p>
          </Route>
          <Route path="/login">{/* <Login /> */}</Route>
          <Route path="/">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
