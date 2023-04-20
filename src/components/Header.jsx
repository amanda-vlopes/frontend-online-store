import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header>
        <div>
          <input type="text" name="" id="" />
          <Link to="/carrinho" data-testid="shopping-cart-button">Pesquisar</Link>
        </div>
        <div>
          <h1>FRONT-END Online Store</h1>
        </div>
      </header>
    );
  }
}
