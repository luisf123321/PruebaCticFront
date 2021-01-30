import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link } from 'react-router-dom';


class AddUser extends Component{

    emptyItem = {
        nombre: '',
        apellido: '',
        codigo: '',
        correo:''
      };
    
      state ={
        item: this.emptyItem
      }
    
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
          const product = await (await fetch(`/usuario/${this.props.match.params.id}`)).json();
          this.setState({item: product});
        }
      }
    
      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
      }
    
      async handleSubmit(event) {
        event.preventDefault();
        await fetch('/usuario/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.item),
        });
        this.props.history.push('/');
      }


    render(){
        return(
            <div>
                <AppNavbar/>
                <Container>
                    <div className="row justify-content-center" >
                <div className="col-sm-9" >
                    <Form  onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="nombre">Nombre</Label>
                        <Input type="text" name="nombre" id="nombre" value={this.state.item.nombre || ''}
                            onChange={this.handleChange} autoComplete="user"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="apellido">Apellido</Label>
                        <Input type="text" name="apellido" id="apellido" value={this.state.item.apellido|| ''}
                            onChange={this.handleChange} autoComplete="user"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="codigo">codigo</Label>
                        <Input type="number" name="codigo" id="codigo" value={this.state.item.codigo || ''}
                            onChange={this.handleChange} autoComplete="user"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="correo">correo</Label>
                        <Input type="email" name="correo" id="correo" value={this.state.item.correo || ''}
                            onChange={this.handleChange} autoComplete="user"/>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/products">Cancel</Button>
                    </FormGroup>
                    </Form>
                    </div>
                    </div>
                </Container>
                </div>
        )
    }
}

export default AddUser