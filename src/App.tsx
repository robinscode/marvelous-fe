import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Marvelous from './routes/Marvelous';

const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Marvelous/>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
