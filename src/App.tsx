import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/about">
            <Navbar />
            <Container>About</Container>
          </Route>
          <Route path="/home">
            <Navbar /> <Container>Home</Container>
          </Route>
          <Route path="/browse">
            <Navbar /> <Container>Browse</Container>
          </Route>
          <Route path="/profile">
            <Navbar /> <Container>Profile</Container>
          </Route>
          <Route path="/login">
            <Navbar /> <Container>Login</Container>
          </Route>
          <Route path="/signup">
            <Navbar /> <Container>Sign Up</Container>
          </Route>
          <Route path="/">
            <Navbar />
            <Container>Home</Container>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
