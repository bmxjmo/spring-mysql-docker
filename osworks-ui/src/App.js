import React, { Component } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListaClientes from './ListaClientes';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/clientes' exact={true} component={ListaClientes}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
