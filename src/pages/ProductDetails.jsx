import { React, Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetails extends Component {
  state = {
    product: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    const product = await getProductById(id);
    this.setState({
      product,
    });
  }

  render() {
    const { product } = this.state;
    return (
      <div className="card__products">
        <p data-testid="product-detail-name">
          {' '}
          { product.title }
          {' '}
        </p>
        <img
          src={ product.thumbnail }
          alt={ product.title }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-price">{`R$ ${product.price}`}</p>
        <button data-testid="shopping-cart-button">Adicionar ao carrinho</button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
