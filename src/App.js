import React from "react";
import { Router } from "react-router-dom";
import Routes from "./Routes";
import Container from "@material-ui/core/Container";
import { createBrowserHistory } from "history";


function App() {
  const browserHistory = createBrowserHistory();
  return (
    <Router history={browserHistory}>
     
      <Container maxWidth='false' height='10000' style={{backgroundColor:"white",marginTop:30}}>
        <Routes />
      </Container>
    </Router>
  );
}

export default App;
