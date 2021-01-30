import React, { Component } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link } from 'react-router-dom';


class AddUsuParq extends Component{

    emptyItem = {
        estudiante_cod: '',
        fecha: new Date(),
        hora:new Date(),
        puesto_id:'',
        estado:'Ingreso',
        puesto:''
      };
    
      state ={
        item: this.emptyItem,
      }
    
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }  
       
      async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const product = await (await fetch(`/parqueadero/totallibre`)).json();
            console.log(product)
            this.setState({item2: product});
        }
        const product = await (await fetch(`/parqueadero/totallibre`)).json();
        console.log(product[0].id)
        //fetch("/parqueadero/totallibre").then(response => response.json()).then(data=> this.setState({parqLibre:data}));
        let item = {...this.state.item};
        item["puesto_id"] = product[0].id;
        item["puesto"] = product[0].puesto;
        this.setState({item});
        //let item2 = {...this.state.item2};
        //item2["estado"] = "ocupado";
        //this.setState({item2});
        console.log(this.state.item);
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
        await fetch('/usuparq/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.item),
        });
        await fetch('/parqueadero/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({'id':this.state.item.puesto_id,'puesto':this.state.item.puesto,'estado':'ocupado'}),
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
                        <Label for="estudiante_cod">Codigo  del Usuario</Label>
                        <Input type="number" name="estudiante_cod" id="estudiante_cod" value={this.state.item.estudiante_cod || ''}
                            onChange={this.handleChange} autoComplete="codigo"/>
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

export default AddUsuParq