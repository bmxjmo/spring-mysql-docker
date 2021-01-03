import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Alert, Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import ComponenteNavbar from './ComponenteNavbar';

class CadastroCliente extends Component {
  
  cadastro = {nome: '', email: '', telefone: ''};
  state = {cadastro: this.cadastro, validation: '', show: false};
  obterDados = this.obterDados.bind(this);
  enviarDados = this.enviarDados.bind(this);
  
  async componentDidMount() {
    if (this.props.match.params.id !== 'novo') {
      const url = `/clientes/${this.props.match.params.id}`;
      const cliente = await (await fetch(url)).json();
      this.setState({cadastro: cliente});
    }
  }

  obterDados(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let cadastro = {...this.state.cadastro};
    cadastro[name] = value;
    this.setState({cadastro});
  }

  async enviarDados(event) {
    event.preventDefault();
    const {cadastro} = this.state;
    const url = (!cadastro.id) ? `/clientes` : `/clientes/${cadastro.id}`;
    const method = (!cadastro.id) ? 'POST' : 'PUT';
    const headers = {'Accept': 'application/json','Content-Type': 'application/json'};
    const data = JSON.stringify(cadastro);
    const options = { method: method, headers: headers, body: data}
    const response = await fetch(url, options).then((response) => response.json());
    if (response.status === 400) {
      if (response.campos){
        var campos = [];
        var formatoTexto = [];
        response.campos.map(campo => formatoTexto.push(campo.nome + ' ' + campo.mensagem + '. '));
        formatoTexto.forEach((value) => campos.push(value.charAt(0).toUpperCase() + value.slice(1)));
        return this.setState({validation: campos, show: true });
      } 
      return this.setState({validation: response.titulo, show: true });
    }
    this.props.history.push('/clientes');
  }

  render() {
    const {cadastro} = this.state;
    const title = <h2>{!cadastro.id ? 'Novo Cliente' : 'Editar Cliente'}</h2>;

    return <div>
      <ComponenteNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.enviarDados}>
          <FormGroup>
            <Label for="nome">Nome</Label>
            <Input type="text" name="nome" id="nome" value={cadastro.nome || ''}
                   onChange={this.obterDados} autoComplete="nome"/>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" name="email" id="email" value={cadastro.email || ''}
                   onChange={this.obterDados} autoComplete="email"/>
          </FormGroup>
          <FormGroup>
            <Label for="telefone">Telefone</Label>
            <Input type="text" name="telefone" id="telefone" value={cadastro.telefone || ''}
                   onChange={this.obterDados} autoComplete="telefone"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Salvar</Button>{' '}
            <Button color="secondary" tag={Link} to="/clientes">Cancelar</Button>
          </FormGroup>
        </Form>
        <Alert color="primary" isOpen={this.state.show}>
          {this.state.validation}
        </Alert>
      </Container>
    </div>
  }
}

export default withRouter(CadastroCliente);
