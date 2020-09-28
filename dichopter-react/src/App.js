import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header.js";
import Footer from "./Footer.js";
// import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
import RDSPairs from "./pages/RDSPairs";
import RDSPairRenderer from "./pages/RDSPairs";

import Error404 from "./pages/Error404";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
      <Route path="/dichopter-react/build/" exact component={RDSPairs} />
      <Route path="/dichopter-react/build/RDSPairRenderer/:background/:foreground" exact component={RDSPairRenderer} />
        <Route path="/" component={Error404} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
