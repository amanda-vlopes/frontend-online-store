import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className="nav__header">
        {/*  <Input /> */}
        <img src={ logo } alt="Logo" />
        <p>shopping Icon</p>
      </header>
    );
  }
}
