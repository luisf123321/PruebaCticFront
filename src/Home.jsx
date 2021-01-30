import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import MostUsuParq from './components/MostUsuParq'



class Home extends Component {
  render() {
    return (
      <div>        
        <AppNavbar/>
        <MostUsuParq/>     
      </div>
    );
  }
}

export default Home;