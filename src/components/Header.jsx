import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../assets/seachIcon.svg';
import logo from '../assets/logo.svg';
import cartIcon from '../assets/cart.svg';
import './Header.css';

export default class Header extends Component {
  state = {
    cartProductsTotal: 0,
  };

  componentDidMount() {
    this.updateCartTotal();
    window.addEventListener('cartUpdate', this.updateCartTotal);
  }

  componentWillUnmount() {
    window.removeEventListener('cartUpdate', this.updateCartTotal);
  }

  updateCartTotal = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartProductsTotal = cart.reduce((acc, { quantity }) => acc + quantity, 0);
    this.setState({ cartProductsTotal });
  };

  render() {
    const { nomeProduto, handleChange, handleSearch } = this.props;
    const { cartProductsTotal } = this.state;

    return (
      <header className="nav__header">
        <div className="nav__search">
          <input
            type="text"
            name="nomeProduto"
            id="nomeProduto"
            value={ nomeProduto }
            data-testid="query-input"
            onChange={ handleChange }
            placeholder="Digite o que você busca"
          />
          <button
            className="search__button"
            data-testid="query-button"
            onClick={ handleSearch }
          >
            <img src={ searchIcon } alt="search-icon" />
          </button>
        </div>
        <Link to="/">
          <img src={ logo } alt="Logo" className="nav__logo" />
        </Link>
        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <div className="icon-container">
            <img className="cart-icon" src={ cartIcon } alt="cart-icon" />
            <p>{ cartProductsTotal }</p>
          </div>
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  nomeProduto: PropTypes.string.isRequired,
};
