import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { getCategories } from '../services/api';
import './Home.css';

export default class Home extends Component {
  state = {
    categorias: [],
  };

  async componentDidMount() {
    const categorias = await getCategories();
    this.setState({ categorias });
  }

  handleAddToCart = (event, img, price, title) => {
    const { id } = event.target;
    price = price.toLocaleString(
      'pt-BR',
      { style: 'currency', currency: 'BRL' },
    );
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find((item) => item.id === id);
    if (product) {
      product.quantity += 1;
    } else {
      cart.push({ id, title, img, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  render() {
    const { categorias } = this.state;
    const { produtos, nomeProduto, handleCategory } = this.props;
    return (
      <>
        <div className="home-message">
          <h3 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
          <h3>
            {produtos.length > 0
              ? `Produtos relacionados a: ${nomeProduto}`
              : 'Nenhum produto foi encontrado'}
          </h3>
        </div>
        <div className="container">
          <div className="categorias__list">
            { categorias.map(({ name, id }) => (
              <button
                key={ id }
                id={ id }
                className="categoria__btn"
                data-testid="category"
                onClick={ handleCategory }
              >
                {name}

              </button>
            ))}
          </div>
          <div>
            <ul>
              { produtos.map(({ title, price, thumbnail, id }) => (
                <li
                  key={ id }
                  id={ id }
                  data-testid="product"
                  className="card__products"
                >
                  <Link
                    key={ id }
                    to={ `product/${id}` }
                    data-testid="product-detail-link"
                  >
                    <img src={ thumbnail } alt={ title } />
                    <p>{ title }</p>
                    <p>{ price }</p>
                  </Link>
                  <button
                    data-testid="product-add-to-cart"
                    onClick={ (event) => {
                      this.handleAddToCart(event, thumbnail, price, title);
                    } }
                    id={ id }
                  >
                    Adicionar ao carrinho
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

Home.propTypes = {
  handleCategory: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  nomeProduto: PropTypes.string.isRequired,
  produtos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
  })).isRequired,
};
