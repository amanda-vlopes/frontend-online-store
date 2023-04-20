import React, { Component } from 'react';
import './ShoppingCart.css';

export default class ShoppingCart extends Component {
  render() {
    const savedProducts = JSON.parse(localStorage.getItem('cart') || []);
    console.log(savedProducts.length);
    return (
      <div>
        { !savedProducts.length ? (
          <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>)
          : (
            savedProducts.map(({ id, title, img, price, quantity }) => (
              <div
                key={ id }
                className="cart-product"
              >
                <img src={ img } alt={ title } />
                <p
                  data-testid="shopping-cart-product-name"
                >
                  {title}
                </p>
                <p
                  data-testid="shopping-cart-product-quantity"
                >
                  {quantity}
                </p>
                <p>{price}</p>
              </div>
            )))}
      </div>
    );
  }
}
