import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FormCheckout from '../components/FormCheckout';

export default class Checkout extends Component {
  state = {
    savedProducts: JSON.parse(localStorage.getItem('cart')) || [],
  };

  render() {
    const { savedProducts } = this.state;
    const { history } = this.props;
    const valorTotal = savedProducts.reduce((acc, curr) => acc + curr.quantity);
    console.log(history);
    return (
      <div>
        <div>
          <p>Revise seus produtos</p>
          {savedProducts.map(({ id, title, img, price, quantity }) => (
            <div key={ id }>
              <img src={ img } alt={ title } />
              <p style={ { width: '200px' } }>
                {title}
              </p>
              <p>{ `Quantidade: ${quantity}` }</p>
              <p>{ price }</p>
            </div>
          ))}
          <p>{ valorTotal }</p>
        </div>
        <FormCheckout history={ history } />
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
