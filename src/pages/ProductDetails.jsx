import { React, Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import { getProductById } from '../services/api';
import './ProductDetails.css';

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
    const { handleAddToCart, match } = this.props;
    const { title, thumbnail, price } = product;
    const { params: { id } } = match;
    return (
      <>
        <div className="card__products">
          <p data-testid="product-detail-name">
            {' '}
            { title }
            {' '}
          </p>
          <img
            src={ thumbnail }
            alt={ title }
            data-testid="product-detail-image"
          />
          <p data-testid="product-detail-price">{`R$ ${price}`}</p>
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ (event) => handleAddToCart(event, thumbnail, price, title) }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <div>
          <Form idDoProduto={ id } />
        </div>
      </>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default ProductDetails;
