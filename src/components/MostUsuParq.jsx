import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from '../AppNavbar';

class MostUsuParq extends Component{

    state = {
        usuparq:[],
        isLoading:true,
        total:'',
        totalOcu:''
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        })
        fetch("/usuparq/datos").then(response => response.json()).then(data=> this.setState({usuparq:data,isLoading:false}))
        fetch("/parqueadero/total").then(response => response.json()).then(data=> this.setState({total:data}))
        fetch("/parqueadero/totalOcup").then(response => response.json()).then(data=> this.setState({totalOcu:data}))
        if(this.state.total==0){
            
        }
    }

    async remove(id) {
        await fetch(`/usuparq/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(() => {
          let updatedUsuparq = [...this.state.usuparq].filter(i => i.id !== id);
          this.setState({usuparq: updatedUsuparq});
        });
      }
      async puestoId(id){
          
        const parqueadero = await (await fetch(`/parqueadero/${id}`)).json();
        console.log(parqueadero)
        return parqueadero          
      }
      async handleSubmit(datosUP,puest) {
        datosUP['estado']='Salida';
        puest['estado']='Libre';
        console.log(puest);
        await fetch('/usuparq/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datosUP),
        });
        await fetch('/parqueadero/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(puest),
          });
      }
      



    render(){
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }
        console.log(this.state.usuparq)
        //<Button size="sm" color="danger" onClick={() => this.remove(dato.id)}>Delete</Button>

        const datosPar = this.state.usuparq.map(dato =>{
            return <tr key={dato.id}>
            <td>{dato.id}</td>
            <td style={{whiteSpace: 'nowrap'}}>{dato.estudiante_cod}</td>
            <td>{dato.fecha}</td>
            <td>{dato.hora}</td>
            <td>{dato.estado}</td>
            <td>
              <ButtonGroup>
                <Button size="sm" color="primary" onClick={() => this.handleSubmit(dato,this.puestoId)}>Salir</Button>
              </ButtonGroup>
            </td>
          </tr>
        })
        return(
           <>
           <div>
              
                <Container fluid> 
                <br></br>             
                <h3>Lista PUESTOS OCUPADOS Prueba CTIC</h3>
                <h3>Puestos Desocupados = {this.state.total}</h3>
                <h3>Puestos Ocupados = {this.state.totalOcu}</h3>
                <div>
                <Button color="success" tag={Link} to="/usuparq/new">Producto Nuevo</Button>
                </div>
                <br></br>
                <div className="row justify-content-center">
                <Table className="col-sm-9" bordered sm>
                    <thead>
                    <tr>
                    <th width="10%">Id</th>
                    <th width="20%">Codigo</th>
                    <th width="20%">Fecha</th>
                    <th width="20%">Hora</th>
                    <th>Estado</th>
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
export default MostUsuParq;