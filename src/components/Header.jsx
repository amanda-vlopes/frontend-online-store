import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import cart from '../assets/cart.svg';
import './Header.css';

export default class Header extends Component {
  render() {
    const { nomeProduto, handleChange, handleSearch } = this.props;
    return (
      <header className="nav__header">
        <div>
          <input
            type="text"
            name="nomeProduto"
            id="nomeProduto"
            value={ nomeProduto }
            data-testid="query-input"
            onChange={ handleChange }
          />
          <button
            data-testid="query-button"
            onClick={ handleSearch }
          >
            Pesquisar
          </button>
        </div>
        <img src={ logo } alt="Logo" />
        <Link to="/shoppingcart" data-testid="shopping-cart-button">
          <img src={ cart } alt="" />
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
