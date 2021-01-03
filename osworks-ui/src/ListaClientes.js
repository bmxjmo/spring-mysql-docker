import React, { Component } from 'react';
import { Button, ButtonToggle, Container, Table } from 'reactstrap';
import ComponenteNavbar from './ComponenteNavbar';
import ComponenteModal from './ComponenteModal';
import { Link } from 'react-router-dom';

class ListaClientes extends Component {
  
  state = {clientes: [], isLoading: true};
  removerCliente = this.removerCliente.bind(this);
  
  componentDidMount() {
    this.setState({isLoading: true});
    const url = '/clientes'; 
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({clientes: data, isLoading: false}));
  }
  
  async removerCliente(id) {
    const url = `/clientes/${id}`;
    const method = 'DELETE';
    const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
    const options = {method: method, headers: headers};
    const listaAtualizada = () => {
      this.setState({clientes: [...this.state.clientes].filter(cliente => cliente.id !== id)});
    }
    await fetch(url, options)
    .then(listaAtualizada);
  }
  
  render() {
    const {clientes, isLoading} = this.state;

    if (isLoading) return <p>Carregando</p>;

    const listaClientes = clientes.map(cliente => {
      return <tr key={cliente.id}>
        <td style={{whiteSpace: 'nowrap'}}>{cliente.nome}</td>
        <td>{cliente.email}</td>
        <td>{cliente.telefone}</td>
        <td style={{textAlign: 'right'}}>
          <div>
            <ButtonToggle size="sm" color="primary" tag={Link} 
              to={"/clientes/" + cliente.id}>+</ButtonToggle>{' '}
            <ComponenteModal title="Confirme" text={`Deseja excluir ${cliente.nome}`} 
              execute={() => this.removerCliente(cliente.id)} buttonColor="danger" buttonText="x" />
          </div>
        </td>
      </tr>
    });

    const listaVazia = () => {
      return <tr>
        <td colSpan="4" style={{textAlign: 'center'}}>
          <p>Nenhum cliente foi encontrado. <Link to="/clientes/novo">Cadastre Um Novo</Link></p>
        </td>
      </tr>
    }

    return (
      <div>
        <ComponenteNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/clientes/novo">Novo Cliente</Button>
          </div>
          <h3>Clientes</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="30%">Nome</th>
              <th width="30%">Email</th>
              <th width="30%">Telefone</th>
              <th width="10%"></th>
            </tr>
            </thead>
            <tbody>
              {listaClientes.length ? listaClientes : listaVazia()}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ListaClientes;
