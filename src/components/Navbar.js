import React from 'react';
import logo from '../logo.png';
import '../styles/Navbar.css';
import Search from './Search';

const Navbar = ({ onSearch }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Mi Aplicación</h1>
        <a className="list" href="/Marvel"> Marvel</a>
        <a className="list" href="/DC"> DC</a>
        <div className="search-input">
          <Search onSearch={onSearch} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
