import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddUser from './components/AddUser'
import MostUser from './components/MostUsu'
import MostParq from './components/MostParqe'
import AddParq from './components/AddParq'
import AddUsuParq from './components/AddUsuParq'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/usuario/:id' exact={true} component={AddUser}/>
          <Route path='/usuario' exact={true} component={MostUser}/>
          <Route path='/parqueadero' exact={true} component={MostParq}/>  
          <Route path='/parqueadero/:id' exact={true} component={AddParq}/> 
          <Route path='/usuparq/:id' exact={true} component={AddUsuParq}/> 
                 
        </Switch>
      </Router>
    )
  }
}

export default App;

