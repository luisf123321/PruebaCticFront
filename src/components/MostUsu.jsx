import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from '../AppNavbar';

class MostUsu extends Component{

    state = {
        datosP:[],
        isLoading:true
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        })
        fetch("/usuario/").then(response => response.json()).then(data=> this.setState({datosP:data,isLoading:false}))
    }

    async remove(id) {
        await fetch(`/usuario/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedUsu = [...this.state.datosP].filter(i => i.id !== id);
          this.setState({datosP: updatedUsu});
        });
      }



    render(){
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }
        console.log(this.state.datosP)
        const datosPar = this.state.datosP.map(dato =>{
            return <tr key={dato.id}>
            <td>{dato.id}</td>
            <td style={{whiteSpace: 'nowrap'}}>{dato.nombre}</td>
            <td>{dato.apellido}</td>
            <td>{dato.codigo}</td>
            <td>
              <ButtonGroup>
                <Button size="sm" color="primary" tag={Link} to={"/usuario/" + dato.id}>Edit</Button>
                <Button size="sm" color="danger" onClick={() => this.remove(dato.id)}>Delete</Button>
              </ButtonGroup>
            </td>
          </tr>
        })
        return(
           <>
           <div>
              <AppNavbar></AppNavbar>
                <Container fluid> 
                <br></br>             
                <h3>Lista Productos Prueba Tul</h3>
                <div>
                <Button color="success" tag={Link} to="/usuario/new">Producto Nuevo</Button>
                </div>
                <br></br>
                <div className="row justify-content-center">
                <Table className="col-sm-9" bordered sm>
                    <thead>
                    <tr>
                    <th width="10%">Id</th>
                    <th width="20%">Nombre</th>
                    <th width="20%">Apellido</th>
                    <th>Codigo</th>
                    <th width="10%">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {datosPar}
                    </tbody>
                </Table>
                </div>
                </Container>
            </div>
           </> 
        )
    }
}
export default MostUsu;