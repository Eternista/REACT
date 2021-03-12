import React, { useState} from 'react';

import Signup from "./comps/Signup"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./comps/Dashboard"
import Login from "./comps/Login"
import PrivateRoute from "./comps/PrivateRoute"

function App() {

  return (
    
    <div className="App">
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
            </Switch>
          </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
