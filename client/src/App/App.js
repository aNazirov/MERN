import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Auth from './containers/Auth/Auth';
import Layout from './containers/Layout/Layout';
import PrivateRoute from "./hoc/PrivateRoute";


class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/auth" component={Auth}/>
          <PrivateRoute component={Layout}/>
        </Switch>
      </div>
    )
  }
}
export default App

