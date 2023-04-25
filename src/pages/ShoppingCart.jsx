import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

  handleDeleteProduct = ({ target }) => {
    const { savedProducts } = this.state;
    const newSavedProducts = savedProducts.filter(({ id }) => id !== target.id);

    this.setState({
      savedProducts: newSavedProducts,
    });
    localStorage.setItem('cart', JSON.stringify(newSavedProducts));
    window.dispatchEvent(new Event('cartUpdate'));
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
              <button
                onClick={ () => this.updateQuantity(id, 'decrease') }
                data-testid="product-decrease-quantity"
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">{quantity}</p>
              <button
                onClick={ () => this.updateQuantity(id, 'increase') }
                data-testid="product-increase-quantity"
              >
                +
              </button>
              <button
                className="button-cart"
                id={ id }
                onClick={ this.handleDeleteProduct }
                data-testid="remove-product"
              >
                Remover produto
              </button>
              <p>{price}</p>
            </div>
          ))
        )}
        <Link to="/checkout" data-testid="checkout-products">
          <button>Finalizar compra</button>
        </Link>
      </div>
    );
  }
}
