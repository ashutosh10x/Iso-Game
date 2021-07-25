import React, { Component } from 'react';
import App from '../App';
import Login from '../containers/Login';
import Signup from '../containers/SignUp';
import Dashboard from '../containers/Dashboard';

// import Blockly from '../containers/Blockly'
// import BlocklyExp from '../containers/BlocklyExp'
// import BlocklyGameExp from '../containers/BlocklyGameExp'
import BlocklyGameMove from '../containers/BlocklyGameMove';
import SimpleGridBlockly from '../components/SimpleGridBlockly';
import IsometricGame from '../containers/IsometricGameView/index';

import LearningPlayGround from '../containers/LearningPlayGround/index';
import { Router } from 'react-router';
import history from './history';
import { Switch, Route } from 'react-router-dom';

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashsboard">
            <Dashboard />
          </Route>
          <Route exact path="/blocklyexp">
            <BlocklyGameMove />
          </Route>
          <Route exact path="/newb">
            <SimpleGridBlockly />
          </Route>
          <Route exact path="/igame">
            <IsometricGame />
          </Route>
          <Route exact path="/playground">
            <LearningPlayGround />
          </Route>
          <Route exact path="/">
            <App />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
