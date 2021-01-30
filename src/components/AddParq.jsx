import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link } from 'react-router-dom';


class AddParq extends Component{

    emptyItem = {
        puesto: '',
        estado: ''
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
          const product = await (await fetch(`/parqueadero/${this.props.match.params.id}`)).json();
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
        await fetch('/parqueadero/', {
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
              <AppNavbar></AppNavbar>
                <Container>
                    <div className="row justify-content-center" >
                    <div className="col-sm-9" >
                    <Form  onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="puesto">Numero del Puesto</Label>
                        <Input type="number" name="puesto" id="puesto" value={this.state.item.puesto || ''}
                            onChange={this.handleChange} autoComplete="parq"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="estado">Estado</Label>
                        <Input type="text" name="estado" id="estado" value={this.state.item.estado|| ''}
                            onChange={this.handleChange} autoComplete="parq"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                    </Form>
                    </div>
                    </div>
                </Container>
                </div>
        )
    }
}

export default AddParq