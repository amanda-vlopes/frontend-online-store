import React, { Component } from 'react';
import Header from '../components/Header';

export default class ShoppingCart extends Component {
  render() {
    return (
      <div>
        <Header />
        <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
      </div>
    );
  }
}
