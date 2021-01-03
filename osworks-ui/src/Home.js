import React, { Component } from 'react';
import ComponenteNavbar from './ComponenteNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <ComponenteNavbar/>
        <Container fluid>
          <Button color="link"><Link to="/clientes">Clientes</Link></Button>
        </Container>
      </div>
    );
  }
}

export default Home;
