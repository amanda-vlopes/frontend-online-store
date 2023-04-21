import React, { Component } from 'react';
import './ShoppingCart.css';

export default class ShoppingCart extends Component {
  state = {
    savedProducts: JSON.parse(localStorage.getItem('cart')) || [],
  };

  dispatchCartUpdateEvent = () => {
    const cartUpdateEvent = new Event('cartUpdate');
    window.dispatchEvent(cartUpdateEvent);
  };

  updateQuantity = (id, action) => {
    const DECREMENT = -1;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find((item) => item.id === id);

    if (product.quantity >= 2 || action !== 'decrease') {
      product.quantity += action === 'decrease' ? DECREMENT : 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.setState({ savedProducts: cart });
      this.dispatchCartUpdateEvent();
    }
  };

  render() {
    const { savedProducts } = this.state;

    return (
      <div>
        {!savedProducts.length ? (
          <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
        ) : (
          savedProducts.map(({ id, title, img, price, quantity }) => (
            <div key={ id } className="cart-product">
              <img style={ { borderRadius: '6px' } } src={ img } alt={ title } />
              <p data-testid="shopping-cart-product-name" style={ { width: '200px' } }>
                {title}
              </p>
              <button onClick={ () => this.updateQuantity(id, 'decrease') }>-</button>
              <p data-testid="shopping-cart-product-quantity">{quantity}</p>
              <button onClick={ () => this.updateQuantity(id, 'increase') }>+</button>
              <p>{price}</p>
            </div>
          ))
        )}
      </div>
    );
  }
}
