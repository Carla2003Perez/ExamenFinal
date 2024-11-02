import React from 'react';
import logo from '../logo.png';
import '../styles/Navbar.css';


const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Desarrolo Web 2024</h1>
       
      </div>
    </nav>
  );
};

export default Navbar;
