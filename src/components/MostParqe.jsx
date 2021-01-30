import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import MostModal from './Modals'
import AppNavbar from '../AppNavbar';

class MostParq extends Component{

    state = {
        datosParps:[],
        isLoading:true
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        })
        fetch("/parqueadero/").then(response => response.json()).then(data=> this.setState({datosParps:data,isLoading:false}))
    }
    async remove(id) {
        await fetch(`/parqueadero/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedParq = [...this.state.datosParps].filter(i => i.id !== id);
          this.setState({datosParps: updatedParq});
        });
    }


    render(){
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }
        console.log(this.state.datosParps)
        const datosPar = this.state.datosParps.map(dato =>{
            return <tr key={dato.id}>
            <td>{dato.puesto}</td>
            <td style={{whiteSpace: 'nowrap'}}>{dato.estado}</td>
            <td>
              <ButtonGroup>
                <Button size="sm" color="primary" tag={Link} to={"/parqueadero/" + dato.id}>Edit</Button>
                <Button size="sm" color="danger" onClick={() => this.remove(dato.id)}>Delete</Button>
              </ButtonGroup>
            </td>
          </tr>
        })
        return(
           <>
           <div>
             <AppNavbar/>
                <Container fluid> 
                <br></br>             
                <h3>Lista de Puestos en el parqueadero USCO</h3>
                <div>
                <MostModal/>
                </div>
                <br></br>
                <div className="row justify-content-center">
                <Table className="col-sm-6" bordered sm>
                    <thead>
                    <tr>
                    <th>Puesto</th>
                    <th>estado</th>
                    <th  width="10%">Acciones</th>
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
export default MostParq;